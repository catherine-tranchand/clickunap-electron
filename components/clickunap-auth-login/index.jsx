"use client";

import { useState } from "react";
import { useRouter } from "next/router";

import Image from "next/image";
import Link from "next/link";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import ClickunapIcon from "@/components/clickunap-icon";

import useStorage from '@/hooks/useStorage';





export default function ClickunapAuthLogin() {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


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
          {errorMessage}
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


    try {

      const loginUrl = "https://clickunap-api.vercel.app/auth/login"

      const response = await fetch(loginUrl, {
        method: 'POST',
        body: formData
      });
      
      // get the data and error from the JSON response
      const { data, error } = await response.json();
      
      if (error) {
        setHasError(true);
        setErrorMessage(error);
        console.log(`[handleLoginFormSubmit]: error ==>> `, error);
        return;
      }

      
      // setUserToken(data.token);
      const userToken = data.token;
      
      saveUserToken(userToken);

      router.push("/manager");

      console.log(`userToken = ${userToken}`, data);

    } catch (error) {
      setHasError(true);
      setErrorMessage(error);
      console.log(`[handleLoginFormSubmit]: error ==>> `, error);
    }

  }
}
