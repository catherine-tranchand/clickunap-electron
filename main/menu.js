const { app, Menu, dialog, shell } = require('electron');
const { checkForUpdates } = require('./updater');



const createMenu = (win = null) => {



  // chec if we are on mac
  const isMac = process.platform === 'darwin';
  const appName = app.getName();

  


  //////////////
  // HANDLERS //
  //////////////

  const handleUpdates = () => { 
    // show dialog
    dialog.showMessageBox({
      type: 'info',
      title: 'Clickunap Update',
      message: 'Checking for updates...',
      buttons: ['Cancel'],
    });

    // check for updates
    checkForUpdates(win);

  }


  const handleContact = () => {
    // show dialog
    dialog.showMessageBox({
      type: 'info',
      title: 'Contact the Team',
      message: 'Catherine Tranchand <catherine-tranchand@laplateforme.io> (Lead Developer)',
      buttons: ['Send Email', 'Cancel'],

    }).then(result => {
      if (result.response === 0) { // <- send email
        shell.openExternal('mailto:catherine-tranchand@laplateforme.io?subject=Clickunap Support')
      }
    })

  };



  // Create the mac's specific app-menu template as `macAppMenuTemplate`
  const macAppMenuTemplate = [
    {
      label: appName,
      submenu: [
        { role: 'about', label: 'About ' + appName },
        { type: 'separator' },
        { label: 'Check For Updates...', click: () => handleUpdates() },
        { type: 'separator' },
        { role: 'quit', label: 'Quit ' + appName, click: () => app.quit() },
      ],
    },
  ];




  // Create the mac's help menu template as `macHelpMenuTemplate`
  const macHelpMenuTemplate = [
    {
      label: 'Help',
      submenu: [
        { label: 'Contact the Team', click: () => handleContact() },
      ],
    },
  ];


  // Create the window's help menu template as `winHelpMenuTemplate`
  const winHelpMenuTemplate = [
    {
      label: 'Help',
      submenu: [
        { role: 'about', label: '&About ' + appName },
        { label: '&Contact the Team', click: () => handleContact() },
        { type: 'separator' },
        { label: 'Check For &Updates...', click: () => handleUpdates() },
        { type: 'separator' },
        { role: 'quit', label: '&Quit ' + appName, click: () => app.quit() },
      ],
    },
  ];



  // Create the menu template as `menuTemplate`
  const menuTemplate = [
    // App Menu (for Mac)
    ...(isMac ? macAppMenuTemplate : []),

    // Window menu
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        { role: 'close' },
      ],
    },

    // Help menu
    ...(isMac ? macHelpMenuTemplate : winHelpMenuTemplate),

  ]




  // build & return the menu template
  return Menu.buildFromTemplate(menuTemplate);

};






// export the `createMenu` function
module.exports = { createMenu };
