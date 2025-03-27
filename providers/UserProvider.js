"use client";

import { createContext, useState } from 'react';


// create a user context as `UserContext`
const UserContext = createContext(null);



/*
 * User Provider
 */
export default function UserProvider({ children, initialData }) {
  
  
  const [ userId, setUserId ] = useState(initialData?.username ?? 0);
  const [ userToken, setUserToken ] = useState(initialData?.userToken ?? null);
  const [ firstname, setFirstname ] = useState(initialData?.firstname ?? 'Catherine');
  const [ lastname, setLastname ] = useState(initialData?.lastname ?? 'Tranchand');
  const [ email, setEmail ] = useState(initialData?.email ?? 'catherine.tranchand@laplateforme.io');
  const [ avatarId, setAvatarId ] = useState(initialData?.avatarId ?? 'farmer'); // 'florist', 'farmer', 'chicken', 'gentlemen', 'hipster', 'mechanic', etc...

  const [ isUserConnected, setUserConnected ] = useState(initialData?.isUserConnected ?? false);
  const [ isUserAdmin, setUserAdmin ] = useState(initialData?.isUserAdmin ?? true); // by default all users are admins...
  const [ isUserManager, setUserManager ] = useState(initialData?.isUserManager ?? false); // ...but few are managers ;)



  
  return (
    <UserContext.Provider
      value={{
        userId,
        userToken,
        firstname,
        lastname, 
        email,
        avatarId,

        isUserConnected,
        isUserAdmin,
        isUserManager,
        
        setUserId,
        setUserToken,
        setFirstname,
        setLastname,
        setEmail,
        setAvatarId,

        setUserConnected,
        setUserAdmin,
        setUserManager,
      }}
    >
      {children}
    </UserContext.Provider>
  )

}


// export the user context
export { UserContext };
