# Neon Player

A high-performance, cyberpunk-themed local music player built with Electron, React, and Vite. Features a stunning neon UI with real-time visualizations and smooth animations.

## Features

- **Local Audio Playback** - Support for MP3, WAV, OGG, FLAC, M4A, AAC formats
- **Essential Controls** - Play, pause, skip, shuffle, volume control
- **Interactive UI** - Progress bar with seek, responsive design, glowing animations
- **Persistent Storage** - Automatic track list persistence via localStorage
- **Cross-Platform** - Windows, macOS, and Linux support via Electron

## Tech Stack

- **Electron** - Desktop application framework
- **React 18** - UI framework with hooks
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Lucide React** - Icon library

## Installation

```bash
git clone https://github.com/Mugetsu-1/MusicPlayer.git
cd MusicPlayer
npm install
```

## Development

```bash
npm run electron:dev
```

Starts the Electron app with hot-reload enabled.

## Production Build

```bash
npm run electron:build:win  # Windows
npm run electron:build:mac  # macOS
npm run electron:build:linux # Linux
npm run electron:build       # All platforms
```

Packaged releases are available in the `release/` directory.

## Usage

1. Launch the application
2. Click "Add Files" or "Add Folder" to load music
3. Click any track to play
4. Use control buttons for playback management
5. Adjust volume with the slider
6. Click the progress bar to seek

## Project Structure

```text
src/
├── components/        # React components
├── constants/        # Configuration and constants
├── hooks/            # Custom React hooks
├── utils/            # Utility functions
└── index.css         # Global styles
```

## Architecture

- **StarfieldBackground** - Animated canvas background with particles and grid
- **PlayerControls** - Playback buttons and volume management
- **ProgressBar** - Seek bar with time display
- **TrackList** - Scrollable playlist with active track highlighting

## Colors

- **Primary** - Cyan (#00ffff)
- **Secondary** - Magenta (#ff00ff)
- **Accent** - Pink (#ff0080)
- **Background** - Dark gradient (midnight blue to black)

## License

MIT
