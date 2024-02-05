const { app, BrowserWindow, ipcMain } = require("electron");
const serve = require("electron-serve");
const path = require("path");

const appServe = app.isPackaged ? serve({
  directory: path.join(__dirname, "../out")
}) : null;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  if (app.isPackaged) {
    appServe(win).then(() => {
      win.loadURL("app://-");
    });
  } else {
    win.loadURL("http://localhost:3000");
    win.webContents.openDevTools();
    win.webContents.on("did-fail-load", (e, code, desc) => {
      win.webContents.reloadIgnoringCache();
    });
  }
}

app.on("ready", () => {
    createWindow();


 /**
   * Listens to the `message` event
   * NOTE: This logs the message from the renderer process to the console
   *
   * @param { Event } event - the event that was triggered
   * @param { String } message - the message to log
   */
 ipcMain.on("message", (event, message) => {
  // console.log(`\x1b[38;5;208m(message)\x1b[0m: event => `, event);
  console.log(`\x1b[38;5;208m(message)\x1b[0m: message => \x1b[1;37m${message}\x1b[0m`);
});










});

app.on("window-all-closed", () => {
    if(process.platform !== "darwin"){
        app.quit();
    }
});