import RootLayout from "@/layout";
import "@/styles/globals.css";

import { UserContext } from "@/hooks/useUser";



export default function App({ Component, pageProps }) {

  

  return (
    <UserContext.Provider value="love">
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </UserContext.Provider>
  )
}

