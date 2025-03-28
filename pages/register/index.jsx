/* React */
import { useEffect } from 'react';

/* Import your clickunap components here */
import { Button } from '@mui/material';
import ClickunapAuthRegister from '@/components/clickunap-auth-register'
import ClickunapAuthAside from '@/components/clickunap-auth-aside'

import useRedirect from '@/hooks/useRedirect';


export default function RegisterPage() {
  

  const redirect = useRedirect();
  redirect.from('register');



  return (
    <main className="LoginPage flex w-full h-full overflow-auto p-6 bg-neutral-100">

      {/* CONTAINER */}
      <div className="Container flex flex-col justify-center items-center p-6 grow h-fit">

        {/* Clickunap - Auth - Register */}
        <ClickunapAuthRegister />


        <Button variant='text' className="text-black !lowercase !m-4" onClick={() => redirect.to('/manager')}>
          Retourner a l'accueil 
        </Button>


      </div>

      {/* Clickunap - Auth - Aside */}
      <ClickunapAuthAside />

    </main>
  );
}

