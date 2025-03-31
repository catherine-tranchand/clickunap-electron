import { useCallback } from 'react';
import { useRouter } from 'next/router';

import useUser from "@/hooks/useUser";







// Pages
export const pages = [
  {name: 'home', path: '/', isPrivate: false},
  {name: 'login', path: '/login', isPrivate: true},
  {name: 'register', path: '/register', isPrivate: true},
  {name: 'logout', path: '/logout', isPrivate: false},
  {name: 'manager', path: '/manager', isPrivate: true},
  {name: 'dashboard', path: '/dashboard', isPrivate: true},
  {name: 'admin', path: '/admin', isPrivate: true},
  {name: 'profile', path: '/profile', isPrivate: true},
  {name: 'territories', path: '/territories', isPrivate: false},
  {name: 'badges', path: '/badges', isPrivate: false},
];


// Method used to get the page name of the given `path`
export const getPageName = (path = '/') => {
  // split the path 
  // NOTE: this is the same as the path's name
  let splitPath = path.split('?')[0].split('/').pop();

  if (splitPath === '') {
    splitPath = 'home';
  }

  return pages.find(p => p.name === splitPath).name;
};


// Method used to get the path of the given `page`
export const getPagePath = (page = 'home') => {
  return pages.find(p => p.name === page).path;
};

// Method used to check if the given `page` is private
export const isPagePrivate = (page = 'home') => {
  return pages.find(p => p.name === page).isPrivate;
};

// Method used to check if the given `page` is valid
export const isPageValid = (page = 'home') => {
  return pages.find(p => p.name === page);
};




/**
 * A custom hook used to redirect the user based on the given `page`
 */
const useRedirect = () => {
  
  const router = useRouter();
  const { isUserConnected, isUserAdmin, isUserManager } = useUser();






  /**
   * Method used to redirect the user to the given `path`
   *
   * Usage:
   *
   * 1- const redirect = useRedirect();
   * 2- redirect.to('home');
   *
   *
   * @param { String } path - the path to redirect to
   */
  const to = useCallback((path = '/', reload = false) => {
    // get the page from the given `path`
    const page = getPageName(path);


    switch (page) {
      case 'home':
        // IDEA-HOME 1: if the user is already connected, redirect him/her to the manager page,
        //              otherwise, redirect him/her to the home page/path
        (isUserConnected) ? router.push('/manager') : router.push(path);
        break;
      case 'login':
        // IDEA-LOGIN 1: if the user is already connected and he/she is an admin,
        //       redirect him/her to the dashboard page
        if (isUserConnected && isUserAdmin) {
          router.push('/dashboard');
          return;
        }

        // IDEA-LOGIN 2: if the user is already connected and he/she is a manager,
        //       redirect him/her to the manager page
        if (isUserConnected && isUserManager) {
          router.push('/manager');
          return;
        }

        // IDEA-LOGIN 3: if the user is already connected, redirect him/her to the home page...
        //               .. otherwise, redirect him/her to the login page/path
        (isUserConnected) ? router.push('/') : router.push(path);
        
        break;

      case 'register':

        // IDEA-REGISTER 1: if the user is already connected and he/she is an admin,
        //                  redirect him/her to the given path cuz "ONLY ADMINS CAN REGISTER"!!!
        if (isUserConnected && isUserAdmin) {
          router.push(path);
          return;
        }

        // IDEA-REGISTER 2: if the user is already connected but he/she is a manager, redirect him/her to the manager page..
        //                   .. otherwise, redirect him/her to the home
        (isUserConnected && isUserManager) ? router.push('/manager') : router.push('/');

        break;

      case 'manager':

        // IDEA-MANAGER 1: if the user is already connected and he/she is an admin or manager, redirect him/her to the given path..
        //                 .. otherwise, redirect him/her to the home
        (isUserConnected && (isUserAdmin || isUserManager)) ? router.push(path) : router.push('/');
      
        break;

      case 'dashboard':
      case 'admin':
        
        // IDEA-DASHBOARD 1: if the user is already connected and he/she is a manager,
        //                    redirect him/her to the manager page
        if (isUserConnected && isUserManager) {
          router.push('/manager');
          return;
        }
          
        // IDEA-DASHBOARD 2: if the user is already connected and he/she is an admin, redirect him/her to the given path..
        //                    .. otherwise, redirect him/her to the home
        (isUserConnected && isUserAdmin) ? router.push(path) : router.push('/');

        break;

      case 'profile':
        // IDEA-PROFILE: if the user is already connected, redirect him/her to the given path..
        //                 .. otherwise, redirect him/her to the home
        (isUserConnected) ? router.push(path) : router.push('/');
        break;

      default:
        router.push(path); // <- by default, redirect to the given path
        break;

    }


    reload && router.reload();



  }, [ isUserConnected, isUserAdmin, isUserManager ]);



  

  /**
   * Redirects the user from the given `page`
   * NOTE: This method checks if the given `page` needs to be redirected,
   * and does it automatically.
   *
   * @param { String } page
   */
  const from = useCallback((page) => {
    // do nothing if there's no page 
    if ([undefined, null].includes(page)) {
      return;
    }
    

    switch(page) {
      case 'home':
        // IDEA-HOME: if the user is already connected, redirect him/her to the manager page
        if (isUserConnected) {
          router.push('/manager');
          return;
        }
        break;
      case 'login':
        // IDEA-LOGIN 1: if the user is already connected and he/she is an admin,
        //       redirect him/her to the dashboard page
        if (isUserConnected && isUserAdmin) {
          router.push('/dashboard');
          return;
        }

        // IDEA-LOGIN 2: if the user is already connected and he/she is a manager,
        //       redirect him/her to the manager page
        if (isUserConnected && isUserManager) {
          router.push('/manager');
          return;
        }

        
        // IDEA-LOGIN 3: if the user is already connected, redirect him/her to the home page
        if (isUserConnected) {
          router.push('/');
          return;
        }

        break;
      case 'register':
        // IDEA-REGISTER 1: if the user is already connected but he/she is a manager, 
        //                  redirect him/her to the manager page..
        if (isUserConnected && isUserManager) {
          router.push('/manager');
          return;
        }

        // IDEA-REGISTER 2: if the user is neither connected nor an admin, 
        //                  redirect he/she to the home page, 
        if (!isUserConnected && !isUserAdmin) {
          router.push('/');
          return;
        }

        break;
      case 'logout':
        break;
      case 'manager':

        // IDEA-MANAGER 1: if the user is not connected, 
        //                 redirect him/her to the home page
        if (!isUserConnected) {
          router.push('/');
          return;
        }

        break;
      case 'dashboard':
      case 'admin':
        // IDEA-DASHBOARD 1: if the user is already connected and he/she is a manager,
        //                    redirect him/her to the manager page
        if (isUserConnected && isUserManager) {
          router.push('/manager');
          return;
        }
          
        // IDEA-DASHBOARD 2: if the user is not connected or not an admin, 
        //                   redirect him/her to the home page
        if (!isUserConnected || !isUserAdmin) {
          router.push('/');
          return;
        }

        break;
      case 'profile':
        // IDEA-PROFILE: if the user is not connected, redirect him/her to the home page
        if (!isUserConnected) {
          router.push('/');
          return;
        }

        break;
      case 'territories':
        break;
      case 'badges':
        break;
      default:
        break;
    }

  }, [ isUserConnected, isUserAdmin, isUserManager ]);


  
  
  /**
   * Automatically redirects the user to the correct page
   */
  const me = useCallback(() => {

    // get the current path as `currentPath`
    const currentPath = getPathName(router.pathname);
    // redirect from this `currentPath`
    from(currentPath);
    
  }, [ from ]);



  return {
    to,
    from,
    me,

    pages,

    isUserConnected,
    isUserAdmin,
    isUserManager,

    router,
  };
  
};


// export the `useRedirect` hook as default
export default useRedirect;





/**
 * Method used to get/fetch the current user's data with the given `userToken`
 *
 * @param { String } userToken
 * @param { Number } delay (milliseconds)
 */
export const getUserData = async (userToken, delay = 0) => {
  // create an initial user data as `intialUserData`
  const initialUserData = {
    userId: 0,
    firstname: 'Catherine',
    lastname: 'Tranchand',
    email: 'catherine.tranchand@laplateforme.io',
    avatarId: 'farmer',
    isUserAdmin: false,
    isUserManager: true,
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
