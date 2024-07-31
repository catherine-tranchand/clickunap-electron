"use client";

import { createContext, useState } from 'react';


// create a user context as `UserContext`
const UserContext = createContext(null);



/*
 * User Provider
 */
export default function UserProvider({ children, initialData }) {
  
  
  const [ username, setUsername ] = useState(initialData?.username ?? 'c.tranchand');
  const [ firstname, setFirstname ] = useState(initialData?.firstname ?? 'Catherine');
  const [ lastname, setLastname ] = useState(initialData?.lastname ?? 'Tranchand');
  const [ email, setEmail ] = useState(initialData?.email ?? 'catherine.tranchand@laplateforme.io');
  const [ avatarId, setAvatarId ] = useState(initialData?.avatarId ?? 'farmer');

  const [ isUserConnected, setIsUserConnected ] = useState(initialData?.isUserConnected ?? false);


  
  return (
    <UserContext.Provider
      value={{
        username,
        firstname,
        lastname, 
        email,
        avatarId,

        isUserConnected,

        setUsername,
        setFirstname,
        setLastname,
        setEmail,
        setAvatarId,

        setIsUserConnected,
      }}
    >
      {children}
    </UserContext.Provider>
  )

}


// export the user context
export { UserContext };
