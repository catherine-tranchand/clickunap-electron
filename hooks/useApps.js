// import { useState } from 'react';


const CLICKUNAP_DOWNLOAD_LINK = 'https://github.com/abraham-ukachi/clickunap-nextjs-electron/releases/download/v0.1.0-alpha/Clickunap-0.1.0.dmg';




export default function useApps() {
  
  /**
   * Opens the OneDrive folder
   */
  const openOneDriveFolder = async () => {
    console.log('opening onedrive folder... window.electronAPI => ', window.electronAPI);
    
    if (window.electronAPI) {
      window.electronAPI.send("message", "What the f*ck!!!");
      //window.electronAPI.openUnapeiFolder("clickunap-nextjs-electron");

    }else {
      alert(`Please download the clickunap software on your computer, to open the onedrive folder: \n\n ${CLICKUNAP_DOWNLOAD_LINK}`);
    }

  }
  

  
  return {
    openOneDriveFolder,
  }
}
