"use client";

import { createContext, useContext, useState } from 'react';



export const UserContext = createContext(null);



export default function useUser() {

  
  const [ username, setUsername ] = useState('c.tranchand');
  const [ firstname, setFirstname ] = useState('Catherine');
  const [ lastname, setLastname ] = useState('Tranchand');
  const [ email, setEmail ] = useState('catherine.tranchand@laplateforme.io');
  const [ avatarId, setAvatarId ] = useState('farmer');

  const [ isUserConnected, setIsUserConnected ] = useState(false);

 
  
  
  return {
    username,
    firstname,
    lastname, 
    email,
    avatarId,
    isUserConnected,

    setUsername,
    setEmail,
    setIsUserConnected,
  }

}
