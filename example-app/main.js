'use strict';

const electron = require('electron');
const { app, BrowserWindow } = electron;
const mainRemote = require('@electron/remote/main');
mainRemote.initialize();

let demoWin = null;
app.on('ready', () => {
  demoWin = new BrowserWindow({
    width: 1150,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      backgroundThrottling: false
    }
  });
  mainRemote.enable(demoWin.webContents)


  demoWin.webContents.openDevTools();
  demoWin.loadURL(`file:///${__dirname}/send-feedback.html`);
  demoWin.on('closed', () => {
    demoWin = null;
  });
});

app.on('quit', () => {
  app.quit();
});
