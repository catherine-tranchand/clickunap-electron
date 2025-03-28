'use client';

import { useState } from 'react';

/* Import your clickunap components here */
import ClickunapAppBar from "@/components/clickunap-appbar";
import ClickunapNavBar from "@/components/clickunap-navbar";
import ClickunapProfileSection from "@/components/clickunap-section-profile";
import ClickunapSideBar from "@/components/clickunap-sidebar";
import ClickunapIcon from '@/components/clickunap-icon';
import ClickunapAvatar from '@/components/clickunap-avatar';

import useUser from '@/hooks/useUser';
import useRedirect from '@/hooks/useRedirect';

import clsx from "clsx";


export const avatarIds = [
 "chicken",
 "woman",
 "farmer",
 "florist",
 "gentleman",
 "hipster",
 "mechanic",
 "musician",
 "musician2",
 "nerd",
 "ninja",
 "photographer",
];




export default function Profile() {

  const { username, firstname, lastname, email, avatarId: currentAvatarId, setAvatarId, isUserAdmin } = useUser();

  const [ isAvatarPickerOpened, setAvatarPickerOpened ] = useState(false);
  
  const redirect = useRedirect();
  redirect.from('profile');




  return (
    <main className="flex flex-col w-full h-full">
      {/* Header */}
      <header className="Header w-full h-auto">
        {/* AppBar - Clickunap */}
        <ClickunapAppBar />
      </header>
      
      {/* Content */}
      <div className="Content flex flex-col lg:flex-row w-full h-full pb-20 lg:pb-0 overflow-auto lg:overflow-hidden">
        {/* SideBar - Clickunap */}
        <ClickunapSideBar 
          page="profile"
          managerLinkHidden={false}
        />

        {/* Container */}
        <div className="Container flex grow flex-col lg:flex-row overflow-auto">
          {/* Apps - Section - Clickunap */}
          <ClickunapProfileSection
            avatarId={currentAvatarId}
            username={username}
            fullname={firstname + ' ' + lastname}
            email={email}
            isAdmin={isUserAdmin}
            onAvatarChange={handleAvatarChange}
          />

          {/* Resources - Section - Clickunap */}
        </div>

        {/* NavBar - Clickunap */}
        <ClickunapNavBar 
          managerLinkHidden={false}
        />

      </div>

      {/* Avatar Picker */}
      {/* TODO: Create a `AvatarPicker` component */}
      {isAvatarPickerOpened && <div className={clsx([ "AvatarPicker", "fixed z-50 size-full p-6 flex flex-col items-center justify-end" ])}>

        <span className="bg-black fixed inset-0 z-10 opacity-20 dark:opacity-80"></span>

        <div className="bg-white dark:bg-[#0b080b] rounded-lg overflow-scroll w-full h-fit lg:w-fit flex flex-col z-20 relative items-center justify-start mx-auto">
          
          {/* Clickunap Icon */}
          <ClickunapIcon 
            className="rounded-full absolute top-0 right-0 m-6 lg:m-8 z-10 transition-all hover:scale-105 cursor-pointer"
            name="close" 
            backgroundColor="white"
            color="black"
            onClick={() => setAvatarPickerOpened(false)}
          />
          
          {/* Avatars Grid */}
          <div className={clsx(["Avatars", "size-fit grid grid-cols-3 gap-2 lg:grid-cols-4 lg:gap-4 lg:px-2 mx-auto my-16"])}>
            
            {avatarIds.map((avatarId) => (
              <ClickunapAvatar
                key={avatarId}
                id={avatarId}
                className="!size-16 transition !bg-[#fcfcfc] hover:!bg-[#c5c5c5] hover:scale-110 cursor-pointer dark:!bg-black m-4 lg:!size-24 lg:m-6"
                onClick={() => selectAvatarHandler(avatarId)}
                selected={avatarId === currentAvatarId}
              />
            ))}
          </div>

        </div>

      </div>}
      
    </main>
  );

  function handleAvatarChange() {
    setAvatarPickerOpened(true);
  }

  function selectAvatarHandler(avatarId) {
    setAvatarId(avatarId);
    setAvatarPickerOpened(false);
  }

}
