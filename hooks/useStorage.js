"use client";

import { useState, useEffect } from 'react';
// import { useSessionStorage } from '@uidotdev/usehooks';






export default function useStorage() {

  // const [ userToken, setUserToken ] = useSessionStorage('userToken', '');
  
  const [ userToken, setUserToken ] = useState('');
  const [ avatarId, setAvatarId ] = useState('farmer');
  
 

  // use effect to save the `userToken` to local storage
  useEffect(() => {
    
    const userTokenFromStorage = localStorage.getItem('userToken') ?? '';
    const avatarIdFromStorage = localStorage.getItem('avatarId') ?? 'farmer';
    
    setUserToken(userTokenFromStorage);
    setAvatarId(avatarIdFromStorage);

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

  

  
  return {
    userToken, 
    avatarId,

    saveUserToken,
    saveAvatarId,
  }

}
