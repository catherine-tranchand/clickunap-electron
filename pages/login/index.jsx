/* Import your clickunap components here */
import { Button } from '@mui/material';
import Link from 'next/link';
import ClickunapAuthLogin from '@/components/clickunap-auth-login';
import ClickunapAuthAside from '@/components/clickunap-auth-aside';

import useRedirect from '@/hooks/useRedirect';



export default function LoginPage() {
  
  const redirect = useRedirect();
  redirect.from('login');


  return (
    <main className="LoginPage flex w-full h-full overflow-auto p-6 bg-neutral-100">

      {/* CONTAINER */}
      <div className="Container flex flex-col justify-center items-center p-6 grow h-full">

        {/* Clickunap - Auth - Login */}
        <ClickunapAuthLogin />

        <Link href="/manager">
          <Button variant='text' className="text-black !lowercase !m-4">
            Voir la page manager
          </Button>
  </Link> 

      </div>

      {/* Clickunap - Auth - Aside */}
      <ClickunapAuthAside />

    </main>
  );
}

