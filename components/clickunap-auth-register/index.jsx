"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import ClickunapIcon from "@/components/clickunap-icon";

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import useStorage from '@/hooks/useStorage';









export default function ClickunapAuthRegister() {
  const [hasError, setHasError] = useState(false);
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ role, setRole ] = useState('manager');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');

  


  const firstNameInputProps = {
    startAdornment: (
      <InputAdornment position="start">
        <ClickunapIcon name="person" />
      </InputAdornment>
    ),
  };


  const lastNameInputProps = {
    startAdornment: (
      <InputAdornment position="start">
        <ClickunapIcon name="person" />
      </InputAdornment>
    ),
  };


  const roleInputProps = {
    startAdornment: (
      <InputAdornment position="start">
        <ClickunapIcon name="shield_person" />
      </InputAdornment>
    ),
  };

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
    <div className="ClickunapAuthRegister flex flex-col justify-center items-center rounded-xl shadow-md bg-white w-full h-auto max-w-[500px] p-4 lg:space-y-2">
      {/* Clickunap LogoName */}
      <Link href="/manager">
        <Image 
          className="!w-64 !h-14"
          src="/logo-black-sm.png"
          width={256}
          height={56}
          alt="Clickunap logo"
          priority={false}
        />
      </Link>

      {/*  Title */}
      <h2 className="text-black">Inscription à Clickunap</h2>

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
        className="flex flex-col justify-center w-full h-auto space-y-4 p-4 !mt-8"
        onSubmit={handleRegisterFormSubmit}
      >

        {/* First Name - Input */}
        <TextField
          className=""
          id="firstname-input"
          required={true}
          type="text"
          label="First Name"
          value={firstName}
          placeholder="Votre prénom"
          InputProps={firstNameInputProps}
          onChange={(event) => setFirstName(event.target.value)}
          //InputProps={{ startAdornment: <InputAdornment position="start">icon</InputAdornment> }}
        />

        {/* Last Name - Input */}
        <TextField
          className=""
          id="lastname-input"
          required={true}
          type="text"
          label="Last Name"
          value={lastName}
          placeholder="Votre nom"
          InputProps={lastNameInputProps}
          onChange={(event) => setLastName(event.target.value)}
          //InputProps={{ startAdornment: <InputAdornment position="start">icon</InputAdornment> }}
        />


        
        <FormControl fullWidth>
          <InputLabel id="role-select-label">Role</InputLabel>
          <Select
            labelId="role-select-label"
            id="role-select"
            value={role}
            label="Role"
            onChange={(event) => setRole(event.target.value)}
          >
            <MenuItem value={"manager"}>Manager</MenuItem>
            <MenuItem value={"admin"}>Admin</MenuItem>
            </Select>
          </FormControl>
          


        {/* Email - Input */}
        <TextField
          className=""
          id="email-input"
          required={true}
          type="email"
          label="Email"
          value={email}
          placeholder="Votre email"
          autoComplete="email"
          InputProps={emailInputProps}
          onChange={(event) => setEmail(event.target.value)}
          //InputProps={{ startAdornment: <InputAdornment position="start">icon</InputAdornment> }}
        />

        {/* Password - Input */}
        <TextField
          className=""
          id="password-input"
          required={true}
          label="Password"
          value={password}
          placeholder="Votre mot de passe"
          autoComplete="new-password"
          type="password"
          InputProps={passwordInputProps}
          onChange={(event) => setPassword(event.target.value)}
        />


        {/* Confirm Password - Input */}
        <TextField
          className=""
          id="confirm-password-input"
          required={true}
          label="Confirm Password"
          value={confirmPassword}
          placeholder="Confirmez votre mot de passe"
          autoComplete="new-password"
          type="password"
          InputProps={passwordInputProps}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />


        {/* Subbmit - Button */}

        <Button
          type="submit"
          variant="contained"
          className="bg-primaryLight hover:bg-primary w-full rounded-3xl p-2.5 !mt-10"
        >
          Register
        </Button>
      </form>
    </div>
  );

  async function handleRegisterFormSubmit(event) {
    event.preventDefault();

    
   // const formData = new FormData();
    // formData.append('firstName', firstName);
    // formData.append('lastName', lastName);
   // formData.append('firstname', firstName);
 //  formData.append('lastname', lastName);
  //  formData.append('role', role);
  //  formData.append('email', email);
  //  formData.append('username', `test${(new Date()).getSeconds()}@clickunap.com`);
  //  formData.append('password', password);
  //  formData.append('confirmPassword', confirmPassword);


    if (password !== confirmPassword){
      return alert('Passwords do not match!!!');
    }

    const formData = {
      firstname: firstName,
      lastname: lastName,
      role: role,
      email: email,
      username: `test${new Date().getSeconds()}@clickunap.com`,
      password: password,
};
   
 try{
  
  const response = await fetch ('https://clickunap-api.vercel.app/users',{
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(formData)

 });
 if (response.ok) {
  const data= await response.json();
  setHasError(false);
  console.log('user created successfully:', data);
 } else {
  setHasError(true);
  console.log('Failed to create a new user');
 }

} catch (error){
  setHasError(true);
  console.error('Error:', error);
}


    // fetch('https://clickunap-api.vercel.app/users', {
   // fetch('https://clickunap-api.vercel.app/users', {
   //   method: 'POST',
    //  headers: {
     //   'Content-Type': 'application/json',
     //   'Accept': 'application/json',
    //  },
    //  body: formData,
   // })
   // .then(response => {
  //    console.log('response ==>> ', response);
   //   if (response.ok) {
    //    return response.json();
    //  } else {
     //   throw new Error('Failed to create a new user');
   //   }
   // })
 //   .then(({ data }) => {
   //   setHasError(false);
   //   console.log('data is ', data);
  //  })
  //  .catch(error => {    
  //    setHasError(true);
 //     console.error(error)
  //  })


 //   console.log(`[handleRegisterFormSubmit]: email => ${email} & password => ${password}`);
  }
}
