//"use server";






/**
 * Method used to get/fetch the current user's data with the given `userToken`
 *
 * @params { String } userToken
 * @params { Number } delay (milliseconds)
 */
export const getUserData = async (userToken, initAvatarId, delay = 0) => {
  // create an initial user data as `intialUserData`
  const initialUserData = {
    userId: 0,
    firstname: 'Catherine',
    lastname: 'Tranchand',
    email: 'catherine.tranchand@laplateforme.io',
    avatarId: initAvatarId ?? 'farmer',
    isUserAdmin: null,
    isUserManager: null,
    isUserConnected: false,
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
      const userRsponse = await fetch(`https://clickunap-api.vercel.app/auth/me?token=${userToken}`);

      //  get the response data
      const responseData = await userRsponse.json();
      

      // TODO: Get the stored `avatarId` from local storage

      // create the user data
      const userData = {
        userId: responseData?.user_id,
        firstname: responseData?.first_name,
        lastname: responseData?.last_name,
        email: responseData?.email,
        isUserAdmin: responseData?.is_admin,
        isUserManager: responseData?.is_manager,
        isUserConnected: true,
      };


      // resolve the data
      resolve({...initialUserData, ...userData});

    } catch (error) {
      reject(error);
    }


  })
};
