import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    backgroundColor: '#0f172a',
    icon: path.join(__dirname, '../public/icon.png'),
  });

  // Load the app
  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Handle file selection dialog
ipcMain.handle('dialog:openFiles', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile', 'multiSelections'],
    filters: [
      { name: 'Audio Files', extensions: ['mp3', 'wav', 'ogg', 'flac', 'm4a', 'aac'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  });

  if (!result.canceled && result.filePaths.length > 0) {
    const tracks = result.filePaths.map((filePath, index) => {
      const fileName = path.basename(filePath, path.extname(filePath));
      return {
        id: Date.now() + index,
        title: fileName,
        artist: 'Local File',
        duration: '0:00',
        url: filePath,
        isLocal: true
      };
    });
    return tracks;
  }
  return [];
});

// Handle folder selection dialog
ipcMain.handle('dialog:openFolder', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  });

  if (!result.canceled && result.filePaths.length > 0) {
    const folderPath = result.filePaths[0];
    const tracks = [];

    try {
      const files = fs.readdirSync(folderPath);
      const audioExtensions = ['.mp3', '.wav', '.ogg', '.flac', '.m4a', '.aac'];

      files.forEach((file, index) => {
        const ext = path.extname(file).toLowerCase();
        if (audioExtensions.includes(ext)) {
          const filePath = path.join(folderPath, file);
          const fileName = path.basename(file, ext);
          tracks.push({
            id: Date.now() + index,
            title: fileName,
            artist: 'Local File',
            duration: '0:00',
            url: filePath,
            isLocal: true
          });
        }
      });

      return tracks;
    } catch (error) {
      console.error('Error reading folder:', error);
      return [];
    }
  }
  return [];
});

// Convert file path to URL that can be used by audio element
ipcMain.handle('file:getUrl', async (event, filePath) => {
  return `file://${filePath}`;
});
