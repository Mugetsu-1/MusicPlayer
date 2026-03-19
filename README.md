# 🌌 Galactic Music Player

A beautiful, space-themed music player built with React, featuring a stunning "Deep Space" aesthetic with glassmorphism effects and smooth animations.

## ✨ Features

- **🎵 Core Functionality**
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
  - Responsive design that works on desktop and mobile
  - Scrollable playlist with visual feedback
  - Active track highlighting with rotating pulse icon
  - Custom-styled progress bar resembling a "warp drive" indicator
  - Hover effects with glowing neon accents

## 🚀 Tech Stack

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

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

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

## 🔊 Audio Sources

The player uses mock tracks with audio URLs from SoundHelix (royalty-free music generator). You can replace these with your own audio files by updating the `src/data/tracks.js` file.

## 📝 Usage

1. Click on any track in the playlist to start playing
2. Use the main play/pause button to control playback
3. Skip forward or backward using the skip buttons
4. Enable shuffle mode for random track playback
5. Adjust volume using the volume slider
6. Click anywhere on the progress bar to seek to a specific time

## 🛠️ Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 🌟 Preview

To preview the production build locally:

```bash
npm run preview
```

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 👨‍💻 Author

Created with ❤️ and ☕ for music lovers and space enthusiasts.

---

**Navigate the cosmos through sound** 🚀🎵
