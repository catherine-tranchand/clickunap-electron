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




  // const updateUrl = 'https://github.com/catherine-tranchand/clickunap-electron/releases/latest';

  // autoUpdater.setFeedURL(updateUrl);
  // autoUpdater.autoDownload = false;
  // autoUpdater.autoInstallOnAppQuit = false;
  

  
  const showConsoleDialog = (message) => {
    dialog.showMessageBox({
      type: 'info',
      title: 'Console',
      message,
      buttons: ['CLOSE']
    });
  };
  
  

  /**
   * Function used to send the given `message` status to the window (i.e. `win`)
   *
   * @param { text } message
   *
   * @returns { void } - nothing ;)
   */
  const sendStatusToWindow = (message, showDialog = false) => {
    // do nothing if there's no `win`
    if (!win) return;
    
    try {
      log.info(message);
      win.webContents.send('message', message);
        
      if (showDialog) showConsoleDialog(message);

    } catch (error) {
      log.error(error);
    }

  };
  
  
  /**
   * Shows the update downloaded dialog.
   */
  const showUpdateDownloadedDialog = () => {
    dialog.showMessageBox({
      type: 'info',
      title: 'Update Downloaded',
      message: 'The update has been downloaded. The application will now restart to install it.',
      buttons: ['OK']
    }).then(() => {
      autoUpdater.quitAndInstall();
    });
  };



  /**
   * Shows the update available dialog.
   */
  const showUpdateAvaiableDialog = (updateInfo, /* downloadedDialogHidden = false */) => {
    dialog.showMessageBox({
      type: 'info',
      title: 'Update Available',
      message: `A new version ${updateInfo.version} is available. Do you want to update?`,
      buttons: ['Yes', 'No']
    }).then(result => {
      if (result.response === 0) {
        autoUpdater.downloadUpdate();

        // .then(() => {
          // do nothin if downloadedDialogHidden is TRUE
          // if (downloadedDialogHidden) return;

          // if not, show the update downloaded dialog
          // showUpdateDownloadedDialog();

        // }).catch(error => {
          // sendStatusToWindow('Update download failed:', error);
          // dialog.showErrorBox('Update Error 001', 'Failed to download update.');
        // });
      }
    });
  };











   
  try { // <- try to check for updates and notify
    autoUpdater.checkForUpdatesAndNotify();

  } catch (error) {
    sendStatusToWindow('Error checking for updates: ' + error, true);
    dialog.showErrorBox('Update Error 001', 'Failed to check for updates...: ' + error);
  }

  
  // check for updates every 10 minutes
  /*
  const updateInterval = setInterval(() => {
    autoUpdater.checkForUpdates();
    sendStatusToWindow('[updateInterval]: check for updates every 60 seconds');
  }, 1000 * 60); // <- every 60 sconds | 10 minutes = 1000 * 60 * 10
  */
  

  // >> Checking for update
  autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('Checking for update...');
  });
  
  // >> Update available 
  autoUpdater.on('update-available', (info) => {
    sendStatusToWindow('Update available: version => ' + info.version);

    // show the update available dialog
    showUpdateAvaiableDialog(info);
  });
  
  // >> Update not available
  autoUpdater.on('update-not-available', (info) => {
    sendStatusToWindow('Update not available');
  });
  
  // >> Error
  autoUpdater.on('error', (error) => {
    sendStatusToWindow('Error in auto-updater: ' + error, true);
    dialog.showErrorBox('Update Error 002', 'Failed to check for updates: ' + error);
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
    sendStatusToWindow('Update downloaded: url => ' + info.downloadURL, true);
    // clearInterval(updateInterval);
    
    // show the update downloaded dialog
    showUpdateDownloadedDialog(info);

  });

}

// export the checkForUpdates function
module.exports = { checkForUpdates };
