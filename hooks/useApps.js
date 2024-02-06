// import { useState } from 'react';


const CLICKUNAP_DOWNLOAD_LINK = 'https://github.com/catherine-tranchand/clickunap-electron/releases/download/v0.1.0-alpha/Clickunap-0.1.0-alpha.dmg';




export default function useApps() {
  
  /**
   * Opens a folder
   */
  const openFolder = (path, fallbackUrl = "") => {
    
    if (window.electronAPI) {
      window.electronAPI.send("open-folder", path);

    }else if ( fallbackUrl.length > 0 ) {
      window.open(fallbackUrl);

    }else {
      alert(`Please download the clickunap software on your computer, to open this folder: \n\n ${CLICKUNAP_DOWNLOAD_LINK}`);
    }

  }

  
  /**
   * Opens an app by name
   * 
   * @example - To open the Gessi app/software:
   *   openApp("gessi")
   * 
   * @param { String } appName - currently supported app names are "gessi", "msword", "anydesk"
   */
  const openApp = (appName) => {
    
    if (window.electronAPI) {
      window.electronAPI.send("open-app", appName);

    }else {
      alert(`Please download the clickunap software on your computer, to open this app: \n\n ${CLICKUNAP_DOWNLOAD_LINK}`);
    }

  }


  

  
  return {
    openFolder, 
    openApp,
  }
}
