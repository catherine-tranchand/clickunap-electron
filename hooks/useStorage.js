"use client";

import { useState, useEffect } from 'react';
// import { useSessionStorage } from '@uidotdev/usehooks';






export default function useStorage() {

  // const [ userToken, setUserToken ] = useSessionStorage('userToken', '');
  
  const [ userToken, setUserToken ] = useState('');

  
 

  // use effect to save the `userToken` to local storage
  useEffect(() => {
    
    const userTokenFromStorage = localStorage.getItem('userToken') ?? '';
    
    setUserToken(userTokenFromStorage);

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

  

  
  return {
    userToken, 
    saveUserToken,
  }

}
