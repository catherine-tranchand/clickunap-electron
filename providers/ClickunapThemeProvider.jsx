"use client";

import { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './theme';



/*
 * Theme Provider
 */
export default function ClickunapThemeProvider({ children }) {
  
  const [ darkMode, setDarkMode ] = useState(false);

  useEffect(() => {

    // Define the matchMedia query
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // Set the initial state
    setDarkMode(mediaQuery.matches);

    // Define the listener function
    const handleChange = (event) => {
      setDarkMode(event.matches);
    };

    // Attach the event listener
    mediaQuery.addEventListener("change", handleChange);

    // Cleanup the event listener on unmount
    return () => mediaQuery.removeEventListener("change", handleChange);

  }, []);


  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );

}; 
