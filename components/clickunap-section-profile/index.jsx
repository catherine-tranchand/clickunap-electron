"use client";

import Image from "next/image";
import Link from "next/link";
import ClickunapAvatar from "../clickunap-avatar";
import ClickunapIcon from "../clickunap-icon";
import Box from "@mui/material/Box";
import { TextField, Button, FormGroup } from "@mui/material";


import clsx from "clsx";
















export default function ClickunapProfileSection({ 
  username, 
  firstname, 
  lastname,
  email, 
  avatarId,
  isAdmin,
  onAvatarChange,
 }) {

  return (
    <div className="ClickunapProfileSection w-full h-fit flex flex-col p-4 justify-start items-center space-y-4 relative">
      
      {/* Avatar Container */}
      <div className="AvatarContainer flex justify-center items-center relative">
        {/* Avatar */}
        <ClickunapAvatar
          id={avatarId}
          className="!size-32 !bg-[#c5c5c5] m-8"
        />

        <ClickunapIcon 
          className="rounded-full absolute bottom-0 right-0 m-8 transition-all hover:scale-105 cursor-pointer"
          name="edit" 
          backgroundColor="white"
          color="#745077"
          onClick={onAvatarChange}
        />

      </div>

      
    {isAdmin && (
      <div className="text-base text-primary font-bold -mt-8 dark:text-white select-none relative flex items-center w-full justify-center">
        <span className="relative flex size-7 pt-1">
          <span className="Badge animate-ping absolute inline-flex inset-0 top-1 size-full size-7">🎖</span>
          <span className="Badge size-7">🎖</span>
        </span>
        <span className="bg-rose-600 text-white py-1 px-2 rounded-lg">admin</span>
        <p className="opacity-35">{username ?? ""}</p>
      </div>
    )}


      {/* Form / Box */}
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1 },
        }}
        noValidate
        autoComplete="off"
        className="flex flex-col !w-full lg:!w-lg"
      >
        
        <FormGroup className="lg:!flex lg:!flex-row lg:!justify-stretch">

          <TextField
            // error
            id="firstname"
            label="First Name"
            defaultValue={firstname}
            className="flex-1"
          />

          <TextField
            // error
            id="lastname"
            label="Last Name"
            defaultValue={lastname}
            className="flex-1"
          />

        </FormGroup>



        <TextField
          // error
          id="email-input"
          label="Email"
          defaultValue={email}
          disabled
          // helperText="Incorrect entry."
          InputProps={{readOnly: true}}
        />


        {/* Update Button */}
        <Button
          disabled
          variant="contained" 
          color="primary" 
          className={clsx("w-full !rounded-full uppercase !text-md !mt-4 lg:!mt-6 lg:!text-lg !py-2 !tracking-wider")}>
          Update 
        </Button>


        {/* Logout Button */}
        <Link href="/logout">
          <Button
            type="button"
            variant="text" 
            color="primary" 
            className={clsx("w-full !rounded-full uppercase !text-md !mt-3 lg:!mt-6 lg:!text-lg !py-2 !tracking-wider")}>
            logout 
          </Button>
        </Link>

      </Box>
      

    </div>
  );
}
