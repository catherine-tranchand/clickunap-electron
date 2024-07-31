'use client';

import { useState } from 'react';

/* Import your clickunap components here */
import ClickunapAppBar from "@/components/clickunap-appbar";
import ClickunapNavBar from "@/components/clickunap-navbar";
import ClickunapProfileSection from "@/components/clickunap-section-profile";
import ClickunapSideBar from "@/components/clickunap-sidebar";
import ClickunapIcon from '@/components/clickunap-icon';

import useUser from '@/hooks/useUser';

import clsx from "clsx";


export default function Profile() {

  const { username, firstname, lastname, email, avatarId } = useUser();

  const [ isAvatarPickerOpened, setAvatarPickerOpened ] = useState(false);

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
            avatarId={avatarId}
            username={username}
            fullname={firstname + ' ' + lastname}
            email={email}
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
      {isAvatarPickerOpened && <div className={clsx([ "AvatarPicker", "fixed z-50 size-full p-6" ])}>

        <div className='bg-white rounded-lg overflow-scroll size-full flex'>

        <ClickunapIcon 
          className="rounded-full absolute top-0 right-0 m-8 transition-all hover:scale-105 cursor-pointer"
          name="close" 
          backgroundColor="white"
          color="black"
          onClick={() => setAvatarPickerOpened(false)}
        />

        </div>

      </div>}
      
    </main>
  );

  function handleAvatarChange() {
    setAvatarPickerOpened(true);
  }
}
