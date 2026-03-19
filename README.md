# 🌌 Galactic Music Player

A beautiful, space-themed **local music player desktop application** built with Electron and React, featuring a stunning "Deep Space" aesthetic with glassmorphism effects and smooth animations.

## ✨ Features

- **🎵 Core Functionality**
  - Play local music files (MP3, WAV, OGG, FLAC, M4A, AAC)
  - Add individual files or entire folders
  - Play, Pause, Skip Next, Skip Previous controls
  - Shuffle mode for random playback
  - Functional progress bar with seek capability
  - Volume control
  - Track duration display

- **🌠 Space Aesthetic**
  - Animated starfield background
  - Glassmorphism UI with backdrop blur effects
  - Neon cyan/blue glowing buttons
  - Smooth Framer Motion animations
  - Pulsing visualizer effects on active tracks
  - Deep space color palette (midnight blue to black gradient)

- **📱 User Interface**
  - Responsive design that works on desktop
  - Scrollable playlist with visual feedback
  - Active track highlighting with rotating pulse icon
  - Custom-styled progress bar resembling a "warp drive" indicator
  - Hover effects with glowing neon accents
  - File and Folder picker buttons for easy music loading

## 🚀 Tech Stack

- **Electron** - Desktop app framework
- **React** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Animation library for smooth transitions

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/Mugetsu-1/MusicPlayer.git
cd MusicPlayer
```

2. Install dependencies:
```bash
npm install
```

## 🎮 Development

Start the Electron app in development mode:
```bash
npm run electron:dev
```

This will open the application window with hot-reload enabled.

## 🛠️ Build for Production

Build the Electron app for your platform:

**For Windows:**
```bash
npm run electron:build:win
```

**For macOS:**
```bash
npm run electron:build:mac
```

**For Linux:**
```bash
npm run electron:build:linux
```

**For all platforms:**
```bash
npm run electron:build
```

The packaged application will be available in the `release/` directory.

## 🎨 Color Palette

- **Primary**: Neon Cyan (#00d9ff) - For active buttons and highlights
- **Accent**: Deep Purple (#a855f7) - For gradients and secondary elements
- **Accent 2**: Sunset Orange (#fb923c) - For progress bars and hover states
- **Text**: Star White (#f8fafc) - For high readability
- **Background**: Gradient from midnight blue (#0f172a) to black (#000000)

## 🎼 Components

### StarfieldBackground.jsx
Renders an animated canvas with twinkling stars that create the cosmic backdrop.

### PlayerControls.jsx
Contains all playback control buttons (Play/Pause, Skip, Shuffle) with glowing hover effects and volume control.

### ProgressBar.jsx
A custom-styled seek bar that displays current time vs. total duration with a gradient "warp drive" indicator.

### TrackList.jsx
Scrollable list of tracks with the active song highlighted and featuring a pulsing orbit icon.

## 🔊 Adding Music

The application supports loading local music files in two ways:

1. **Add Files**: Click the "Add Files" button to select individual audio files
2. **Add Folder**: Click the "Add Folder" button to load all audio files from a directory

Supported formats: MP3, WAV, OGG, FLAC, M4A, AAC

The player comes with sample tracks from SoundHelix (royalty-free music generator) for demonstration purposes.

## 📝 Usage

1. Launch the application
2. Click "Add Files" or "Add Folder" to load your music
3. Click on any track in the playlist to start playing
4. Use the main play/pause button to control playback
5. Skip forward or backward using the skip buttons
6. Enable shuffle mode for random track playback
7. Adjust volume using the volume slider
8. Click anywhere on the progress bar to seek to a specific time

## 🖥️ Application Architecture

The application consists of three main parts:

- **electron/main.js**: Main process handling window creation and file system operations
- **electron/preload.js**: Preload script for secure IPC communication
- **src/**: React application source code

## 🌐 Web Version (Optional)

You can also run the app as a web application (without local file support):

```bash
npm run dev
```

Then open your browser and navigate to `http://localhost:5173`

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 👨‍💻 Author

Created with ❤️ and ☕ for music lovers and space enthusiasts.

---

**Navigate the cosmos through sound** 🚀🎵
