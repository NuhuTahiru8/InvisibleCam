const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// File to store counters
const COUNTER_FILE = path.join(__dirname, 'counters.json');

// Initialize counters
let counters = { image: 1, audio: 1 };

// Load counters from file
if (fs.existsSync(COUNTER_FILE)) {
    const data = fs.readFileSync(COUNTER_FILE, 'utf-8');
    counters = JSON.parse(data);
}

// Save counters to file
const saveCounters = () => {
    fs.writeFileSync(COUNTER_FILE, JSON.stringify(counters, null, 2));
};

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname); // Save to the same folder as index.html
    },
    filename: (req, file, cb) => {
        let filename;
        if (file.mimetype.startsWith('image/')) {
            filename = `${counters.image++}.jpg`; // Increment counter for images
        } else if (file.mimetype.startsWith('audio/')) {
            filename = `${counters.audio++}.webm`; // Increment counter for audio
        }
        saveCounters(); // Save updated counters to file
        cb(null, filename);
    }
});

const upload = multer({ storage });

// Serve the static files
app.use(express.static(path.join(__dirname)));

// Routes for handling uploads
app.post('/upload-image', upload.single('image'), (req, res) => {
    console.log(`Image saved: ${req.file.filename}`);
    res.sendStatus(200);
});

app.post('/upload-audio', upload.single('audio'), (req, res) => {
    console.log(`Audio saved: ${req.file.filename}`);
    res.sendStatus(200);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

app.get('/uploaded-media', (req, res) => {
    try {
        const files = fs.readdirSync(__dirname);

        // Filter files by type and create URLs with their type
        const media = files
            .filter(file => file.endsWith('.jpg') || file.endsWith('.webm'))
            .map(file => ({
                url: `/${file}`,
                type: file.endsWith('.jpg') ? 'image' : 'audio'
                
            }));

        res.json(media); // Send the list of media URLs with types as JSON
    } catch (error) {
        console.error('Error fetching media:', error);
        res.status(500).send('Unable to fetch media');
    }
});
