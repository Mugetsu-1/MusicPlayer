const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  openFiles: () => ipcRenderer.invoke('dialog:openFiles'),
  openFolder: () => ipcRenderer.invoke('dialog:openFolder'),
  getFileUrl: (filePath) => ipcRenderer.invoke('file:getUrl', filePath),
  isElectron: true,
});
