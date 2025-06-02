const { app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const fs = require('fs');

app.disableHardwareAcceleration();

function createWindow(){
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true
        }
    });
    win.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow,getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

ipcMain.on('save-journal', (event, content) => {
    const filePath = path.join(app.getPath('userData'), 'nhatky.txt');

    fs.writeFile(filePath, content, 'utf8', (err) => {
        if (err) {
            event.reply('save-journal-response', { success: false, message: err.message });
        } else {
            event.reply('save-journal-response', { success: true, message: 'Save sucessfully!'});
            console.log("File save at", filePath);
        }
    });
});