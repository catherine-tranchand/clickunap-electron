// React
import { useState, useEffect, useMemo, useCallback } from 'react';

// Next
import Image from "next/image";

// js-cookie
// import Cookies from 'js-cookie';

import RootLayout from "@/layout";
import "@/styles/globals.css";

import ClickunapThemeProvider from '@/providers/ClickunapThemeProvider';
import UserProvider from "@/providers/UserProvider";
import useStorage from "@/hooks/useStorage";


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
      <ClickunapThemeProvider>
        <RootLayout>

        {isLoading && (
          <div className="flex justify-center items-center size-full bg-primary">
            <Image
              className="animate-bounce"
              src="/logo-dark.gif"
              alt="Clickunap logo GIF"
              width={256}
              height={256}
              priority 
            />
          </div>
        )}


        {!isLoading && (
          <Component {...pageProps} />
        )}

        </RootLayout>
      </ClickunapThemeProvider>
    </UserProvider>
  )
}

