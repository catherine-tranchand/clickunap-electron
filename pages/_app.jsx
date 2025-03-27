// React
import { useState, useEffect } from 'react';

// Next
import Image from "next/image";

// js-cookie
// import Cookies from 'js-cookie';

import RootLayout from "@/layout";
import "@/styles/globals.css";

import { createTheme, ThemeProvider, alpha, getContrastRatio } from '@mui/material/styles';
import UserProvider from "@/providers/UserProvider";
import { getUserData } from "@/hooks/useUser";
import useStorage from "@/hooks/useStorage";



const primaryBase = "#745077";
const primaryMain = alpha(primaryBase, 1);


const theme = createTheme({
  palette: {
    // mode: 'dark',
    primary: {
      main: primaryMain,
      light: alpha(primaryBase, 0.5),
      dark: alpha(primaryBase, 0.9),
      contrastText: getContrastRatio(primaryMain, "#fff") > 4.5 ? "#fff" : "#111",
    }
  },
});


export default function App({ Component, pageProps }) {
  
  // Create an initial user data and user token states
  const [ initialUserData, setInitialUserData ] = useState(null);
  

  const { userToken } = useStorage();
   
  

  // use effect to get the user token from cookie
  useEffect(() => {

    // TODO: Get the user token from the cookie
    // const userToken = Cookies.get('userToken')?.value;
    

    // Tell me about this `userToken` from our cookies
    console.log(`Current userToken (from localStorage) => ${userToken}`);

    fetchUserData(userToken, 5000);
  

    /**
     * Method used to fetch user data,
     * and update the `initialUserData` accordingly
     *
     * @params { String } token
     * @params { Number } delay (milliseconds)
     */
    async function fetchUserData(token, delay) {
      // Trying to fetch user data...
      try {
        const userData = await getUserData(token, delay);

        // update the `intialUserData`
        setInitialUserData(userData);

        // tell me about it in the console
        console.log(`userToken => ${userToken} || Initial user data::::`, userData);

      } catch (error) {
        console.error(error);
        // set the `initialUserData` to an empty object
        setInitialUserData({});
      }
    }


  }, [userToken]);


  

  
  /*
  useEffect(() => {
    getUserData(userToken).then((data) => {
      setInitialUserData(data);

      // tell me about it in the console
      console.log(`userToken => ${userToken} || Initial user data::::`, data);
    });

  }, [userToken]);
  */


  return (
    <UserProvider initialData={initialUserData}>
      <ThemeProvider theme={theme}>
        <RootLayout>

        {initialUserData === null && (
          <div className="flex justify-center items-center size-full bg-primary">
            <Image
              className="animate-bounce"
              src="/logo-dark.gif"
              alt="Clickunap logo GIF"
              width={256}
              height={256}
              
            />
          </div>
        )}


        {initialUserData !== null && (
          <Component {...pageProps} />
        )}

        </RootLayout>
      </ThemeProvider>
    </UserProvider>
  )
}

