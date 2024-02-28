"use client";

import { useEffect, useState } from "react";
import { useSessionStorage } from "@uidotdev/usehooks";










export default function AuthorizePage() {

  const [ userToken, setUserToken ] = useSessionStorage('userToken', '');



  
  // Use Effects

  useEffect(() => {
    
    const updateUserToken = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const newUserToken = searchParams.get('user_token');

      // do nothing if there's no new user token
      /*
      if (!newUserToken) {
        return;
      }*/

      setUserToken(newUserToken);

    }

    updateUserToken();

  }, [])

   




  return (
    <p className="break-words">{userToken}</p>
  )
}

