const { dialog } = require('electron');
const log = require('electron-log');
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



  const updateUrl = 'https://github.com/catherine-tranchand/clickunap-electron/releases/latest';

  autoUpdater.setFeedURL(updateUrl);

  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = false;
  
  
  // check for updates every 10 minutes
  const updateInterval = setInterval(() => {
    autoUpdater.checkForUpdates();
  }, 1000 * 60 * 10);
  

  // >> Checking for update
  autoUpdater.on('checking-for-update', () => {
    console.log('Checking for update...');
    log.info('Checking for update...');
  });
  
  // >> Update available 
  autoUpdater.on('update-available', (info) => {
    console.log('Update available', info);
    log.info('Update available', info);

    dialog.showMessageBox({
      type: 'info',
      title: 'Update Available',
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
    console.log('Update not available', info);
    log.info('Update not available', info);
  });
  
  // >> Error
  autoUpdater.on('error', (error) => {
    console.error('Update error:', error);
    log.error('Update error:', error);
  });
  
  // >> Download progress
  autoUpdater.on('download-progress', (progressObj) => {
    console.log('Download progress:', progressObj);
    log.info('Download progress:', progressObj);
  });

  
  // >> Update downloaded
  autoUpdater.on('update-downloaded', (info) => {
    console.log('Update downloaded', info);
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
