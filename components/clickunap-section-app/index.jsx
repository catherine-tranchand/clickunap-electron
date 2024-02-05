"use client";

import Image from "next/image";
import Link from "next/link";

import ClickunapApp from "../clickunap-app";

import useApps from "@/hooks/useApps";




export default function ClickunapAppSection({ title }) {


  const { openOneDriveFolder } = useApps();



  return (
    <div className="ClickunapAppSection w-full h-fit flex flex-col p-4 justify-start items-center space-y-4">
      
      {/* Title */}
      <h2 className="AppSectionTitle uppercase font-extrabold opacity-50">{title}</h2>

      {/* Box */}
      <div className="AppSectionBox grid grid-cols-3 gap-4 lg:gap-6">

        {/* Airmes - App 1 */}
        <ClickunapApp
           color="#C7D8D6"
           logo="/airmes.png"
           name="Airmes"
           link="https://airmes-application.eu"
         />

        
      {/* Imago DU - App 2 */}
      <ClickunapApp
         color="white"
         logo="/imagodu.png"
         name="Imago DU"
         link=""
      />

      {/* One drive App 3 */}
      <ClickunapApp
         color="white"
         logo="/onedrive.png"
         name="One drive"
         onClick={openOneDriveFolder} 
       />
        
       {/* Octime - App 4 */}
         <ClickunapApp
           color="white"
           logo="/octime.png"
           name="Octime"
           link="https://www.octime.com/"
                />

        {/* PowerBI - App 1 */}
        <ClickunapApp
          color="#E3A710"
          logo="/powerbi.svg"
          name="Power BI"
          link="https://powerbi.com"
        />

       {/* Microsoft Teams - App 4 */}
       <ClickunapApp
          color="white"
          logo="/mic-teams.svg"
          name="Teams"
          link="https://www.microsoft.com/fr-fr/microsoft-teams/group-chat-software/"
        />

       {/* Ageval - App 3 */}
       <ClickunapApp
          color="#312532"
          logo="/logo.svg"
          name="app one"
          link=""
        />


       {/*  - App 6 */}
       <ClickunapApp
          color="#312532"
          logo="/logo.svg"
          name="app one"
          link="https://fr.padlet.com/"
        />

       {/* App 8 */}
       <ClickunapApp
          color="#312532"
          logo="/logo.svg"
          name="app one"
          link=""
        />


      </div>
    </div>
  );
}
