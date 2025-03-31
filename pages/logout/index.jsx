'use client';

import { useEffect } from "react";

import useRedirect from '@/hooks/useRedirect';
import useStorage from '@/hooks/useStorage';
import useUser from '@/hooks/useUser';




export default function Logout() {
  
  const storage = useStorage();
  const redirect = useRedirect();
  const user = useUser();

  
  useEffect(() => {
    // reset the local storage...
    storage.reset().then(() => {
      // ...reset the user data
      user.reset();
      // redirect the user to the home page
      redirect.to('/');
    });

  }, []);



  return <p>⏳Logging out, please wait 😕...</p>;


}
