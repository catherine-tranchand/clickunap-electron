"use client";

import Image from "next/image";
import Link from "next/link";
import ClickunapAvatar from "../clickunap-avatar";
import ClickunapIcon from "../clickunap-icon";
import Box from "@mui/material/Box";
import { TextField, Button } from "@mui/material";




export default function ClickunapProfileSection({ 
  username, 
  fullname, 
  email, 
  avatarId,
  onAvatarChange,
 }) {

  return (
    <div className="ClickunapProfileSection w-full h-fit flex flex-col p-4 justify-start items-center space-y-4">
      
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

      <p className="text-base text-primary dark:text-white opacity-35 select-none">{username}</p>


      {/* Form / Box */}
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        className="flex flex-col"
      >
        <TextField
          // error
          id="fullname"
          className="!text-rose-600"
          label="Fullname"
          defaultValue={fullname}
          InputProps={{
            readOnly: true,
          }}
        />

        <TextField
          // error
          id="email-input"
          label="Email"
          defaultValue={email}
          // helperText="Incorrect entry."
          InputProps={{
            readOnly: true,
          }}
        />


        <Button
          type="submit"
          variant="contained"
          className="bg-primaryLight hover:bg-primary w-full rounded-3xl p-2.5 !mt-10"
        >
          logout
        </Button>


      </Box>



    </div>
  );
}
