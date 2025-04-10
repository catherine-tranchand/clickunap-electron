"use client";

import { createContext, useState, useEffect } from 'react';
import { getUserData } from "@/hooks/useData";
import useStorage from "@/hooks/useStorage";

// create a user context as `UserContext`
const UserContext = createContext(null);



/*
 * User Provider
 */
export default function UserProvider({ children, initUserToken }) {
  
  
  const [ userId, setUserId ] = useState(0);
  const [ userToken, setUserToken ] = useState(initUserToken);
  const [ firstname, setFirstname ] = useState('');
  const [ lastname, setLastname ] = useState('');
  const [ email, setEmail ] = useState('');
  // const [ avatarId, setAvatarId ] = useState('farmer'); // 'florist', 'farmer', 'chicken', 'gentlemen', 'hipster', 'mechanic', etc...

  const [ isUserConnected, setUserConnected ] = useState(false);
  const [ isUserManager, setUserManager ] = useState(true); // by default all users are managers...
  const [ isUserAdmin, setUserAdmin ] = useState(false); // ...but few are managers ;)
  
  //const [ isSidebarOpened, setSidebarOpened ] = useState(true);

  const { sidebarOpened:isSidebarOpened, saveSidebarOpened: setSidebarOpened } = useStorage();

  const { avatarId, saveAvatarId: setAvatarId } = useStorage(); // 'florist', 'farmer', 'chicken', 'gentlemen', 'hipster', 'mechanic', etc...



  
  // const redirect = useRedirect();
  
  
  useEffect(() => {

    // fetch the user data
    fetchUserData();
    

    
    /**
     * Method used to fetch the user data,
     * and update the props accordingly.
     */
    async function fetchUserData() {
      // do nothing if the `initUserToken` is not provided
      if (!initUserToken || !initUserToken.length) {
        return;
      }

      // tell me about this `userToken`
      console.log(`\x1b[32m[fetchUserData]\x1b[0m (1): fetching the user data w/ initUserToken => ${initUserToken}...`);

      
      // Trying to fetch user data...
      try {
        const userData = await getUserData(initUserToken, avatarId);

        // update the props with `userData`
        updateProps(userData);

        // tell me about it in the console
        console.log(`\x1b[33m[fetchUserData]\x1b[0m (2): userData => `, userData);

        // redirect the page accordingly
        // redirect.me();

      } catch (error) {
        console.error(error);
      }
    };




    // use effect to save the `sidebarOpened` in session storage
    /*
    useEffect(() => {
      if (sidebarOpened) {
        saveSidebarOpened(true);
      } else {
        saveSidebarOpened(false);
      }
    }, [ sidebarOpened, saveSidebarOpened ]);
    */


    /**
     * Updates the props with the given `userData` 
     *
     * @params { Object } userData
     */
    function updateProps(userData) {
      setUserId(userData.userId);
      setUserToken(userData.userToken);
      setAvatarId(userData.avatarId);
      setFirstname(userData.firstname);
      setLastname(userData.lastname);
      setEmail(userData.email);
      setUserManager(userData.isUserManager);
      setUserAdmin(userData.isUserAdmin);
      setUserConnected(userData.isUserConnected);
    }



  }, [initUserToken]);


  

  // Resets the user data to the initial state/values
  const reset = () => {
    setUserId(0);
    setUserToken('');
    setFirstname('');
    setLastname('');
    setEmail('');
    setAvatarId('farmer');
    setUserManager(true);
    setUserAdmin(false);
    setUserConnected(false);
    setSidebarOpened(true);
  };

  
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
        isSidebarOpened,
        
        setUserId,
        setUserToken,
        setFirstname,
        setLastname,
        setEmail,
        setAvatarId,

        setUserConnected,
        setUserAdmin,
        setUserManager,
        setSidebarOpened,

        reset,
      }}
    >
      {children}
    </UserContext.Provider>
  )

}


// export the user context
export { UserContext };
