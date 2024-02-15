"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import ClickunapIcon from "@/components/clickunap-icon";

export default function ClickunapAuthLogin() {
  const [hasError, setHasError] = useState(false);

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
          priority={true}
        />
      </Link>

      {/*  Title */}
      <h2 className="text-black">Mon Espace</h2>

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
          required={true}
          type="email"
          autoComplete="email"
          label="Email"
          placeholder="Votre email"
          defaultValue=""
          InputProps={emailInputProps}
          //InputProps={{ startAdornment: <InputAdornment position="start">icon</InputAdornment> }}
        />

        {/* Password - Input */}

        <TextField
          className=""
          id="password-input"
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

  function handleLoginFormSubmit(event) {
    event.preventDefault();
    setHasError(true);
  }
}
