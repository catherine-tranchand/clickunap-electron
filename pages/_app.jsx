import RootLayout from "@/layout";
import "@/styles/globals.css";

// import { createTheme, alpha, getContrastRatio } from '@mui/material/styles';
import UserProvider from "@/providers/UserProvider";



export default function App({ Component, pageProps }) {

  

  return (
    <UserProvider initialData={{avatarId: 'chicken'}}>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </UserProvider>
  )
}

