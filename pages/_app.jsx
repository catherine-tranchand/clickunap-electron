// React
import { useState, useEffect, useMemo, useCallback } from 'react';

// Next
import Image from "next/image";

// js-cookie
// import Cookies from 'js-cookie';

import RootLayout from "@/layout";
import "@/styles/globals.css";

import { createTheme, ThemeProvider, alpha, getContrastRatio } from '@mui/material/styles';
import UserProvider from "@/providers/UserProvider";
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



// constants
const STARTUP_DELAY = 5000; // 5 seconds














export default function App({ Component, pageProps }) {
  
  const [ isLoading, setLoading ] = useState(true); 
  
  // get the `userToken` from storage
  const { userToken } = useStorage();

  
  
  // use effect to update the `isLoading` bool to `false` after the given `STARTUP_DELAY`
  useEffect(() => {
    setTimeout(() => setLoading(false), STARTUP_DELAY);
  }, []);
  


  



  









  return (
    <UserProvider initUserToken={userToken}>
      <ThemeProvider theme={theme}>
        <RootLayout>

        {isLoading && (
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


        {!isLoading && (
          <Component {...pageProps} />
        )}

        </RootLayout>
      </ThemeProvider>
    </UserProvider>
  )
}

