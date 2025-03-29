'use client';

import { useState } from 'react';

/* Import your clickunap components here */
import ClickunapAppBar from "@/components/clickunap-appbar";
import ClickunapNavBar from "@/components/clickunap-navbar";
import ClickunapDashboardSection from "@/components/clickunap-section-dashboard";
import ClickunapSideBar from "@/components/clickunap-sidebar";
// import ClickunapDialog from "@/components/clickunap-dialog";
import ClickunapIcon from '@/components/clickunap-icon';

import useUser from '@/hooks/useUser';
import useRedirect from '@/hooks/useRedirect';

import clsx from "clsx";





export default function Dashboard() {

  const { firstname, lastname, email, avatarId } = useUser();

  
  const redirect = useRedirect();
  redirect.from('dashboard');




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
        <ClickunapSideBar page="dashboard" />

        {/* Container */}
        <div className="Container flex grow flex-col lg:flex-row overflow-auto">
          {/* Dashboard - Section - Clickunap */}
          <ClickunapDashboardSection
            adminName={firstname}
          />
         
        </div>

        {/* NavBar - Clickunap */}
        <ClickunapNavBar page="dashboard" />

      </div>

      {/* TODO: Create Dashboard Dialogs */}

      
    </main>
  );

}
