"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const node_os_1 = require("node:os");
const node_path_1 = require("node:path");
// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.js    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.DIST_ELECTRON = (0, node_path_1.join)(__dirname, '../');
process.env.DIST = (0, node_path_1.join)(process.env.DIST_ELECTRON, '../dist');
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
    ? (0, node_path_1.join)(process.env.DIST_ELECTRON, '../public')
    : process.env.DIST;
// Disable GPU Acceleration for Windows 7
if ((0, node_os_1.release)().startsWith('6.1'))
    electron_1.app.disableHardwareAcceleration();
// Set application name for Windows 10+ notifications
if (process.platform === 'win32')
    electron_1.app.setAppUserModelId(electron_1.app.getName());
if (!electron_1.app.requestSingleInstanceLock()) {
    electron_1.app.quit();
    process.exit(0);
}
// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
let win = null;
// Here, you can also use other preload
const preload = (0, node_path_1.join)(__dirname, '../preload/index.js');
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = (0, node_path_1.join)(process.env.DIST, 'index.html');
async function createWindow() {
    win = new electron_1.BrowserWindow({
        title: 'Main window',
        icon: (0, node_path_1.join)(process.env.PUBLIC, 'favicon.ico'),
        webPreferences: {
            preload,
            // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
            // Consider using contextBridge.exposeInMainWorld
            // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    if (process.env.VITE_DEV_SERVER_URL) { // electron-vite-vue#298
        win.loadURL(process.env.VITE_DEV_SERVER_URL);
        // Open devTool if the app is not packaged
        win.webContents.openDevTools();
    }
    else {
        win.loadFile(indexHtml);
    }
    // Test actively push message to the Electron-Renderer
    win.webContents.on('did-finish-load', () => {
        win?.webContents.send('main-process-message', new Date().toLocaleString());
    });
    // Make all links open with the browser, not with the application
    win.webContents.setWindowOpenHandler(({ url }) => {
        if (url.startsWith('https:'))
            electron_1.shell.openExternal(url);
        return { action: 'deny' };
    });
}
electron_1.app.whenReady().then(createWindow);
electron_1.app.on('window-all-closed', () => {
    win = null;
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
electron_1.app.on('second-instance', () => {
    if (win) {
        // Focus on the main window if the user tried to open another
        if (win.isMinimized())
            win.restore();
        win.focus();
    }
});
electron_1.app.on('activate', () => {
    const allWindows = electron_1.BrowserWindow.getAllWindows();
    if (allWindows.length) {
        allWindows[0].focus();
    }
    else {
        createWindow();
    }
});
// New window example arg: new windows url
electron_1.ipcMain.handle('open-win', (_, arg) => {
    const childWindow = new electron_1.BrowserWindow({
        webPreferences: {
            preload,
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    if (process.env.VITE_DEV_SERVER_URL) {
        childWindow.loadURL(`${url}#${arg}`);
    }
    else {
        childWindow.loadFile(indexHtml, { hash: arg });
    }
});
