import RootLayout from "@/layout";
import "@/styles/globals.css";

import { createTheme, ThemeProvider, alpha, getContrastRatio } from '@mui/material/styles';
import UserProvider from "@/providers/UserProvider";



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



  

  return (
    <UserProvider initialData={{avatarId: 'chicken'}}>
      <ThemeProvider theme={theme}>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </ThemeProvider>
    </UserProvider>
  )
}

