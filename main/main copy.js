const { app, BrowserWindow, ipcMain, shell } = require("electron");
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
};


  app.on("ready", () => {
    createWindow();

    ipcMain.on("message", (event, message) => {
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

    ipcMain.on("open-link", (event, url) => {
      console.log(
        `open-link command received!!!!!!!! Url to open is ${url}`
      );

      if (process.platform === "win32") {
        exec("start " + url); // 
      } else {
        exec("open " + url);
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
          //AppPath = C:\Users\..\OneDrive - UNAPEI ALPES PROVENCE\Bureau\Remote Desktop GESSI.Ink;
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
          // appPath = `C:\\ProgramData\Microsoft\Windows\Start Menu\Programs
          
          
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
          
  //C:\Users\m.robaston\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Teams.exe
        // appPath = path.join(
          //  os.homedir(),
          //  "AppData",
          //  "Roaming",
        //   "Microsoft",
        //   "Start Menu",
          //  "Programs",
        //   "Teams.exe",
        // );



          break;
        
        case "outlook":
        // C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Outlook.exe
        //C:\Program Files (x86)\Microsoft Office\root\Office16\OUTLOOK.EXE
        appPath = path.join(
          "C:", 
          "Program Files (x86)",
          "Microsoft Office",
          "root",
          "Office16",
          "OUTLOOK.EXE"
        );

        break;

        


        case "onedrive":
          //OneDrive : C:\Users\m.robaston\OneDrive - UNAPEI ALPES PROVENCE
          // C:\ProgramData\Microsoft\Windows\Start Menu\Programs\OneDrive
          appPath = path.join(
            os.homedir(),
            "OneDrive - UNAPEI ALPES PROVENCE"
          
          //"Microsoft",
          //"Windows",
          //"Start Menu",
          // "Programs",
          // "OneDrive",
        
          );

          break;

        case "nephyla":
        case "anydesk":
          // Nephyla : C:\Program Files (x86)\AnyDesk-8de38dcb.exe
          // C:\Users\Public\Desktop Support_Nephyla.Ink
            appPath = path.join(
            "C:", 
            "Program Files (x86)",
            "AnyDesk-8de38dcb",
            "AnyDesk-8de38dcb.exe",

          );

          break;

      }

      if (process.platform === "win32") {
        exec(`start "" "${appPath}"`); // returns eg.: start "" "C:\Program Files..."
      } else {
        exec(`open "${appPath}"`); // returns eg.: open "..."
      }
    
    });

  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
}
