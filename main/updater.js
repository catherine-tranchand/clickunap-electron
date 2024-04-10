const { dialog } = require('electron');
const log = require('electron-log');
const path = require('path');
const { autoUpdater } = require('electron-updater');







const checkForUpdates = (win = null) => {
  /*
  if (!process.env.NODE_ENV === 'production') {
    return; // Skip update checks in development.
  }
  */





  // =================  Logging =====================
  autoUpdater.logger = log;
  autoUpdater.logger.transports.file.level = 'info';
  log.info('Clickunap Updater is starting...');
  // ================================================


  /**
   * Function used to send the given `text` status to the window (i.e. `win`)
   *
   * @param { String } text
   *
   * @returns { void } - nothing ;)
   */
  const sendStatusToWindow = (text) => {
    // do nothing if there's no `win`
    if (!win) return;

    log.info(text);
    win.webContents.send('message', text);
  };
  


  const updateUrl = 'https://github.com/catherine-tranchand/clickunap-electron/releases/latest';

  autoUpdater.setFeedURL(updateUrl);
  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = false;
  
  
  // check for updates every 10 minutes
  const updateInterval = setInterval(() => {
    autoUpdater.checkForUpdates();
    sendStatusToWindow('[updateInterval]: check for updates every 60 seconds');
  }, 1000 * 60); // <- every 60 sconds | 10 minutes = 1000 * 60 * 10
  

  // >> Checking for update
  autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('Checking for update...');
  });
  
  // >> Update available 
  autoUpdater.on('update-available', (info) => {
    sendStatusToWindow('Update available', info);

    dialog.showMessageBox({
      type: 'info',
      title: 'Clickunap Update Available',
      message: `A new version ${info.version} is available. Do you want to update?`,
      buttons: ['Yes', 'No']
    }).then(result => {
      if (result.response === 0) {
        autoUpdater.downloadUpdate();
      }
    });
  });
  
  // >> Update not available
  autoUpdater.on('update-not-available', (info) => {
    sendStatusToWindow('Update not available');
  });
  
  // >> Error
  autoUpdater.on('error', (error) => {
    sendStatusToWindow('Error in auto-updater: ' + error);
  });
  
  // >> Download progress
  autoUpdater.on('download-progress', (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';

    sendStatusToWindow(log_message);
  });
  
  
  // >> Update downloaded
  autoUpdater.on('update-downloaded', (info) => {
    sendStatusToWindow('Update downloaded', info);
    clearInterval(updateInterval);

    dialog.showMessageBox({
      type: 'info',
      title: 'Clickunap Update',
      message: 'A new version has been downloaded. The application will now restart to install it.',
      buttons: ['OK']
    }).then(() => {
      autoUpdater.quitAndInstall();
    });
  });

}

// export the checkForUpdates function
module.exports = { checkForUpdates };
