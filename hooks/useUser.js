"use client";

import { useContext } from 'react';
import { UserContext } from '@/providers/UserProvider';




// TODO: Create a `getUser` function
// example: export const getUser = async () => {}
export const getUserData = async (userToken, delay = 0) => {
  // create an initial user data as `intialUserData`
  const initialUserData = {
    userId: 0,
    firstname: 'Catherine',
    lastname: 'Tranchand',
    email: 'catherine.tranchand@laplateforme.io',
    avatarId: 'farmer',
    isAdmin: true,
    isManager: false,
  };


  return new Promise(async (resolve, reject) => {
    // delay the request if needed 
    await new Promise(resolve => setTimeout(resolve, delay));
    

    // Do nothing / reject if there's no `userToken`
    if (!userToken) {
      reject("Please provide a user token");
    }
    

    // Try to fetch the current user's data from the server...
    try {
      const userRsponse = await fetch('https://clickunap-api.vercel.app/auth/me', {
        method: 'POST',
        headers: {
          'Content-Type': 'applicjation/json',
          'Authorization': `Bearer ${userToken}`
        }
      });

      //  get the response data
      const responseData = await userRsponse.json();
      
      // create the user data
      const userData = {
        userId: responseData?.user_id,
        firstname: responseData?.first_name,
        lastname: responseData?.last_name,
        email: responseData?.email,
        isAdmin: responseData?.is_admin,
        isManager: responseData?.is_manager,
      };


      // resolve the data
      resolve({...initialUserData, ...userData});

    } catch (error) {
      reject(error);
    }


  })
};

export default function useUser() {
  return useContext(UserContext);
}


