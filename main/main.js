const { app, BrowserWindow, ipcMain, Menu, shell, protocol } = require("electron/main");
// const serve = require("electron-serve");
const path = require("node:path");
const os = require("node:os");
const fs = require("node:fs");
const { exec } = require("child_process");
// import our checkForUpdates() function from `updater.js`
const { checkForUpdates } = require("./updater");
const { createMenu } = require("./menu");




/*
const appServe = app.isPackaged
  ? serve({
      directory: path.join(__dirname, "../out"),
    })
  : null;
*/

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1400,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      // nodeIntegration: true,
      // contextIsolation: true,
      // allowFileAccessFromFiles: true,
    },
  });

  if (app.isPackaged) {
    win.loadURL("https://clickunap-electron.vercel.app");
    /*
    appServe(win)
      .then(() => {
        // win.loadURL("https://clickunap-electron.vercel.app");
        // win.loadFile('index.html');
        // win.loadURL("app://-");
        // win.loadURL(`file://${__dirname}/out/index.html`)
      })
      .catch((err) => {
        console.error(`App Serve Error: `, err);
      });
      */
  } else {
    win.loadURL("http://localhost:3000");

    win.webContents.session.webRequest.onHeadersReceived((details, callback) => {
      callback({
        // cancel: false,
        responseHeaders: {
          ...details.responseHeaders,
          "Content-Security-Policy": [
            "connect-src 'self' https://clickunap-api.vercel.app; style-src 'self' 'unsafe-inline'; default-src 'self';"
          ],
        },
      }); 
    });

    win.webContents.openDevTools();
    win.webContents.on("did-fail-load", ({level, message, lineNumber, sourceId, frame}) => {
      win.webContents.reloadIgnoringCache();
    });

    win.webContents.on("message", ({level, message, lineNumber, sourceId, frame}) => {
      console.log(
        `\x1b[38;5;208m(win.webContents)\x1b[0m: Received message 4rm main process: => \x1b[1;37m${message}\x1b[0m`
      );
    });
  }

  // return the `win`
  return win;
};





app.whenReady().then(() => {
  
  /*
  protocol.registerFileProtocol("app", (request, callback) => {
    const url = request.url.replace("app://", "");
    callback({ path: path.join(__dirname, url) });
  });
  */

  

  // create the window
  const win = createWindow();

  // create the main menu
  const mainMenu = createMenu(win);

  // set the main menu of our app
  Menu.setApplicationMenu(mainMenu);

  // if the app is packaged...
  if (app.isPackaged) {
    // ...check for updates here ;)
    checkForUpdates(win);
  }

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
    const programFiles =
      process.platform === "win32" ? process.env.PROGRAMFILES : "";
    const programData =
      process.platform === "win32" ? process.env.ALLUSERSPROFILE : "";

    let appPath = "";
    let fallbackList = [];
    let fallbackUsed = false;
    // "gessi", "msword", "anydesk"
   
   

    switch (appName) {
      
     case "gessi":

      const gessiPotentialPaths = [
        path.join(os.homedir(), "AppData", "Local", "Apps", "Remote Desktop", "msrdcw.exe"),
        path.join("C:", "Program Files", "Remote Desktop", "msrdcw.exe"),
        path.join("C:", "Program Files (x86)", "Anydesk-8de38dcb.exe"),
        
      ];

      // Find the first valid path

      for (const p of gessiPotentialPaths){
        if (fs.existsSync(p)) {
          appPath = p;
          break;
        }
      }
        //appPath = `C:\\Users\\m.robaston\\App Data\\Local\\Apps\\Remote Desktop\\msrdcw.exe`;
        
        //appPath = path.join(
          //os.homedir(),
          //"AppData",
          //"Local",
          //"Apps",
          //"Remote Desktop",
          //"msrdcw.exe"
        
        break;
      case "msword":
        //appPath = `C:\\Program Files\Microsoft Office\root\Office16\WINWORD.EXE`
        // appPath = `C:\\ProgramData\Microsoft\Windows\Start Menu\Programs
        
       const mswordPotentialPaths = [
         path.join("C:", "Program Files", "Microsoft Office", "root", "Office16", "WINWORD.EXE"),
         path.join("C:", "Program Files (x86)", "Microsoft Office", "root", "Office16", "WINWORD.EXE"),
         path.join("C:", "ProgramData", "Microsoft", "Windows", "Start Menu", "Programs", "Word.lnk"),

      ];

      for (const p of mswordPotentialPaths) {
        if (fs.existsSync(p)) {
          appPath = p;
          break;
        }
      }

       
        break;

      case "teams":

      const teamsPotentialPaths = [
       
      
       path.join("C:", "ProgramData", "Microsoft", "Windows", "Start Menu", "Programs", "Teams.lnk"),

        path.join(os.homedir(),"AppData","Local", "Microsoft", "Teams", "current", "Teams.exe"),

        path.join(os.homedir(), "AppData", "Roaming", "Microsoft", "Windows", "Start Menu", "Programs", "Teams.lnk")

     ];

     for (const p of teamsPotentialPaths) {
       if (fs.existsSync(p)) {
         appPath = p;
         break;
       }
     }

      
       break;
     
          //Microsoft  teams : C:\Users\m.robaston\AppData\Local\Microsoft\Teams\current\Teams.exe
         //  appPath = path.join(os.homedir(),"AppData","Local", "Microsoft", "Teams", "current", "Teams.exe",
      
         
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
       const outlookPotentialPaths = [
         
        path.join("C:", "Program Files (x86)", "Microsoft Office", "root", "Office16", "OUTLOOK.EXE"),
        path.join("C:", "Program Files", "Microsoft Office", "root", "Office16", "OUTLOOK.EXE"),
        path.join("C:", "ProgramData", "Microsoft", "Windows", "Start Menu", "Programs", "Outlook.lnk"),
        
        ];
         
        for (const p of outlookPotentialPaths){
          if (fs.existsSync(p)){
            appPath = p;
            break;
          }
        }

      

        break;

      case "excel":


        // C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Outlook.exe
        //C:\Program Files (x86)\Microsoft Office\root\Office16\OUTLOOK.EXE
       const excelPotentialPaths = [
       path.join("C:", "Program Files (x86)", "Microsoft Office", "root", "Office16", "EXCEL.EXE"),
       path.join("C:", "Program Files", "Microsoft Office", "root", "Office16", "EXCEL.EXE"),
       path.join("C:", "ProgramData", "Microsoft", "Windows", "Start Menu", "Programs", "Excel.lnk"),
 
       ];

       for (const p of excelPotentialPaths){
        if(fs.existsSync(p)){
          appPath = p;
          break;
        }
       }
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
        // C:\Users\Public\Desktop Support_Nephyla.lnk
        const nephylaPotentialPaths = [

        path.join("C:", "Program Files (x86)", "AnyDesk-8de38dcb", "AnyDesk-8de38dcb.exe"),
        path.join("C:", "Program Files (x86)", "AnyDeskMSI", "AnyDeskMSI.exe"),
        path.join("C:", "Program Files (x86)", "Anydesk", "AnyDesk-8de38dcb.exe"),

        ];
        
        for (const p of nephylaPotentialPaths){
          if (fs.existsSync(p)){
            appPath = p;
            break;
          }
        }


      break;
      break;

      case "sharepoint":
        //C:\Users\m.robaston\UNAPEI ALPES PROVENCE\$chemin accès
        const sharepointPotentialPaths = [
          path.join(os.homedir(), "UNAPEI ALPES PROVENCE", "Datas_SIEGE - Données Siège"),
          path.join(os.homedir(), "UNAPEI ALPES PROVENCE", "DATAS_CPX_MONTOLIVET - Partage"),
          path.join(os.homedir(), "UNAPEI ALPES PROVENCE", "DATAS_CPX_04NORD - Partage"),
        ]; 

        for (const p of sharepointPotentialPaths){
          if (fs.existsSync(p)){
            appPath = p;
            break;
          }
        }
        


        break;
    }


    if (fs.existsSync(appPath) === false) {

      for (const fallbackPath of fallbackList) {
        
        if(fs.existsSync(fallbackPath) && (fallbackUsed === false)) {
          appPath = fallbackPath;
          fallbackUsed = true;
        }
        
      }
    }


    if (process.platform === "win32") {
      exec(`start "" "${appPath}"`); // returns eg.: start "" "C:\Program Files..."
    } else {
      exec(`open "${appPath}"`); // returns eg.: open "..."
    }
  });

  ipcMain.on("open-link", (event, url) => {
    console.log(`open-link command received!!!!!!!! Url to open is ${url}`);

    shell.openExternal(url);

    // if (process.platform === "win32") {
    //   exec("start " + url);
    // } else {
    //   exec("open " + url);
    // }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
