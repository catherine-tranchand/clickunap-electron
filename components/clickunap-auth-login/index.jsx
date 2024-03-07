"use client";

import { useState } from "react";
import { useRouter } from "next/router";

import Image from "next/image";
import Link from "next/link";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import ClickunapIcon from "@/components/clickunap-icon";

// import { useSessionStorage } from "@uidotdev/usehooks";
import useStorage from '@/hooks/useStorage';





export default function ClickunapAuthLogin() {
  const [hasError, setHasError] = useState(false);
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  // const [ userToken, setUserToken ] = useSessionStorage('userToken', '');


  const router = useRouter();

  const { userToken, saveUserToken } = useStorage();




  const emailInputProps = {
    startAdornment: (
      <InputAdornment position="start">
        <ClickunapIcon name="mail" />
      </InputAdornment>
    ),
  };

  const passwordInputProps = {
    startAdornment: (
      <InputAdornment position="start">
        <ClickunapIcon name="lock" />
      </InputAdornment>
    ),
  };

  return (
    <div className="ClickunapAuthLogin flex flex-col justify-center items-center rounded-xl shadow-md bg-white w-full h-auto max-w-[500px] p-4 lg:space-y-6">
      {/* Clickunap LogoName */}
      <Link href="/">
        <Image
          src="/newlogo-black.png"
          width={224}
          height={48}
          alt="Clickunap logo"
          priority={false}
        />
      </Link>

      {/*  Title */}
      <h2 className="text-black">Mon Espace</h2>

      <p className="truncate w-full h-auto text-xs text-center text-slate-300">{userToken}</p>

      {/* Error message */}
      {hasError && (
        <p className="text-rose-600 text-xs lg:text-sm px-6 text-center py-4 lg:py-0">
          Votre email ou le mot de passe n'est pas correct.
          <br className="hidden lg:block" />
          Saisissez-le à nouveau!
        </p>
      )}

      <form
        noValidate={false}
        className="flex flex-col justify-center w-full h-auto space-y-4 p-4"
        onSubmit={handleLoginFormSubmit}
      >
        {/* Email - Input */}
        <TextField
          className=""
          id="email-input"
          name="email"
          required={true}
          type="email"
          autoComplete="email"
          label="Email"
          placeholder="Votre email"
          defaultValue=""
          InputProps={emailInputProps}
          onChange={(event) => setEmail(event.target.value)}
          //InputProps={{ startAdornment: <InputAdornment position="start">icon</InputAdornment> }}
        />

        {/* Password - Input */}

        <TextField
          className=""
          id="password-input"
          name="password"
          required={true}
          label="Password"
          placeholder="Votre mot de passe"
          defaultValue=""
          type="password"
          autoComplete="current-password"
          InputProps={passwordInputProps}
          onChange={(event) => setPassword(event.target.value)}
        />

        {/* Subbmit - Button */}

        <Button
          type="submit"
          variant="contained"
          className="bg-primaryLight hover:bg-primary w-full rounded-3xl p-2.5 !mt-10"
        >
          login
        </Button>
      </form>
    </div>
  );

  async function handleLoginFormSubmit(event) {
    event.preventDefault();


    const formData = new FormData(event.target);

    const email = formData.get('email');
    const password = formData.get('password');


    try {


      const response = await fetch('https://clickunap-api.vercel.app/auth/login', {
        method: 'POST',
        body: formData
      });
      
      // get the data and error from the JSON response
      const { data, error } = await response.json();
      
      if (error) {
        setHasError(true);
        console.log(`[ handleLoginFormSubmit ]: error ==>> `, error);
        return;
      }

      const userToken = data.token;

      // Save the `userToken` in our local storage
      saveUserToken(userToken);

            
      // Now redirect to the manager page
      router.push('/manager');


    } catch (error) {
      setHasError(true);
      console.log(`[handleLoginFormSubmit]: error ==>> `, error);
    }



    // const res = await fetch("https://")

    console.log(`[handleLoginFormSubmit]: email => ${email} & password => ${password}`);
  }
}
