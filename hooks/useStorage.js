"use client";

import { useState, useEffect } from 'react';
// import { useSessionStorage } from '@uidotdev/usehooks';






export default function useStorage() {

  // const [ userToken, setUserToken ] = useSessionStorage('userToken', '');
  
  const [ userToken, setUserToken ] = useState('');
  const [ avatarId, setAvatarId ] = useState('farmer');
  const [ sidebarOpened, setSidebarOpened ] = useState(false);
  
 

  // use effect to save the `userToken` to local storage
  useEffect(() => {
    
    const userTokenFromStorage = localStorage.getItem('userToken') ?? '';
    const avatarIdFromStorage = localStorage.getItem('avatarId') ?? 'farmer';
    const sidebarOpenedFromStorage = localStorage.getItem('sidebarOpened') ?? true;
    
    setUserToken(userTokenFromStorage);
    setAvatarId(avatarIdFromStorage);
    setSidebarOpened(sidebarOpenedFromStorage);

  }, [ ]);


  /**
   * Saves the user token in session storage
   */
  const saveUserToken = (userToken) => {

    // save the given `userToken` to storage
    localStorage.setItem('userToken', userToken);

    // update the `userToken`
    setUserToken(userToken);
    
  }


  /**
   * Saves the avatar id in session storage
   *
   * @param { String } avatarId
   */
  const saveAvatarId = (avatarId) => {

    // save the given `avatarId` to storage
    localStorage.setItem('avatarId', avatarId);

    // update the `avatarId`
    setAvatarId(avatarId);

  }


  /**
   * Saves the sidebar state in session storage
   *
   * @param { Boolean } sidebarOpened
   */
  const saveSidebarOpened = (sidebarOpened) => {
    // save the given `sidebarOpened` to storage
    localStorage.setItem('sidebarOpened', sidebarOpened);
    // update the `sidebarOpened`
    setSidebarOpened(sidebarOpened);
  }


  
  /**
   * Resets the storage to its initial state
   */
  const reset = async () => {
    return new Promise((resolve) => {
      localStorage.clear();
      // resolve after 100 milliseconds
      setTimeout(() => resolve(true), 100);
    })
  }

  

  
  return {
    userToken, 
    avatarId,
    sidebarOpened,

    saveUserToken,
    saveAvatarId,
    saveSidebarOpened,

    reset,
  }

}
