const { autoUpdater } = require('electron-updater');
const { dialog } = require('electron');

function checkForUpdates() {
  if (!process.env.NODE_ENV === 'production') {
    return; // Skip update checks in development
  }

  const updateUrl = 'https://github.com/catherine-tranchand/clickunap-electron/releases/latest';

  autoUpdater.setFeedURL(updateUrl);

  autoUpdater.checkForUpdatesAndNotify().then(updateInfo => {
    if (updateInfo.version) {
      dialog.showMessageBox({
        type: 'info',
        title: 'Update Available',
        message: `A new version ${updateInfo.version} is available. Do you want to update?`,
        buttons: ['Yes', 'No']
      }).then(result => {
        if (result.response === 0) {
          autoUpdater.downloadUpdate().then(() => {
            dialog.showMessageBox({
              type: 'info',
              title: 'Update Downloaded',
              message: 'The update has been downloaded. The application will now restart to install it.',
              buttons: ['OK']
            }).then(() => {
              autoUpdater.quitAndInstall();
            });
          }).catch(error => {
            console.error('Update download failed:', error);
            dialog.showErrorBox('Error', 'Failed to download update.');
          });
        }
      });
    }
  }).catch(error => {
    console.error('Update check failed:', error);
    dialog.showErrorBox('Error', 'Failed to check for updates.');
  });
}

// app.whenReady().then(checkForUpdates);

