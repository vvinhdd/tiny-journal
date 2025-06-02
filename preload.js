const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI',{ 
    saveJournal: (content) => ipcRenderer.send('save-journal', content),
    onSaveResponse: (callback) => ipcRenderer.on('save-journal-response', (event, args) => callback(args))
});