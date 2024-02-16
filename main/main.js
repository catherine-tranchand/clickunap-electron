const { app, BrowserWindow, ipcMain } = require("electron");
const serve = require("electron-serve");
const path = require("path");
const os = require("os");
const { exec } = require("child_process");

const appServe = app.isPackaged
  ? serve({
      directory: path.join(__dirname, "../out"),
    })
  : null;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1400,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
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
};

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
    console.log(
      `\x1b[38;5;208m(message)\x1b[0m: message => \x1b[1;37m${message}\x1b[0m`
    );
  });

  ipcMain.on("open-folder", (event, folderPath) => {
    console.log(
      `open-folder command received!!!!!!!! folderPath to open is ${folderPath}`
    );

    const openFolderCommand = process.platform === "win32" ? "start" : "open";

    if (process.platform === "win32") {
      exec(`${openFolderCommand} "" "${path.join(os.homedir(), folderPath)}"`); // 
    } else {
      exec(`${openFolderCommand} "${path.join(os.homedir(), folderPath)}"`); // 
    }
  });

  ipcMain.on("open-app", (event, appName) => {
    console.log(`open-app command received!!!!!!!! app to open is ${appName}`);
    const programFiles = process.platform === "win32" ? process.env.PROGRAMFILES : "";
    const programData = process.platform === "win32" ? process.env.ALLUSERSPROFILE : "";
    
    let appPath = "";
    // "gessi", "msword", "anydesk"

    switch (appName) {
      case "gessi":
        //appPath = `C:\\Users\\m.robaston\\AppData\\Local\\Apps\\Remote Desktop\\msrdcw.exe`;
        appPath = path.join(
          os.homedir(),
          "AppData",
          "Local",
          "Apps",
          "Remote Desktop",
          "msrdcw.exe"
        );
        break;
      case "msword":
        //appPath = `C:\\Program Files\Microsoft Office\root\Office16\WINWORD.EXE`
        // appPath = `C:\\ ProgramData\Microsoft\Windows\Start Menu\Programs
        
        
          appPath = path.join(
          programFiles,
          "Microsoft Office",
          "root",
          "Office16",
          "WINWORD.EXE"
        );
        break;
      
      case "teams":
        //Microsoft  teams : C:\Users\m.robaston\AppData\Local\Microsoft\Teams\current\Teams.exe
        appPath = path.join(
          os.homedir(),
          "AppData",
          "Local",
          "Microsoft",
          "Teams",
          "current",
          "Teams.exe",
        );

        break;


      case "onedrive":
        //OneDrive : C:\Users\m.robaston\OneDrive - UNAPEI ALPES PROVENCE
        // C:\ProgramData\Microsoft\Windows\Start Menu\Programs\OneDrive
        appPath = path.join(
          // os.homedir(),
         // "OneDrive - UNAPEI ALPES PROVENCE"
         programData,
         "Microsoft",
         "Windows",
         "Start Menu",
         "Programs",
         "OneDrive",
      
        );

        break;

      case "nephyla":
      case "anydesk":
        // Nephyla : C:\Program Files (x86)\AnyDesk-8de38dcb.exe
        appPath = path.join(
          "C:", 
          "Program Files (x86)",
          "AnyDesk-8de38dcb.exe",
        );

        break;

    }

    const openAppCommand = process.platform === "win32" ? "start" : "open";

    if (process.platform === "win32") {
      exec(`${openAppCommand} "" "${appPath}"`); // returns eg.: start "" "C:\Program Files..."
    } else {
      exec(`${openAppCommand} "${appPath}"`); // returns eg.: open "..."
    }
   
  });




});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
