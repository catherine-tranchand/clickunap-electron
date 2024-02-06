"use client";

import Image from "next/image";
import Link from "next/link";

import ClickunapApp from "../clickunap-app";

import useApps from "@/hooks/useApps";




export default function ClickunapAppSection({ title }) {


  const { openFolder, openApp } = useApps()




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
          link="https://www.airmes-application.eu/"
        />

        {/* Imago DU - App 2 */}
        <ClickunapApp
          color="white"
          logo="/imagodu.png"
          name="Imago DU"
          link="https://imago.unapei-ap.fr/login"
        />

        {/* One drive App 3 */}
        
        <ClickunapApp
          color="white"
          logo="/onedrive.png"
          name="One drive"
          onClick={() => openFolder("")}
        />

        {/* Octime - App 4 */}
        <ClickunapApp
          color="white"
          logo="/octime.png"
          name="Octime"
          link="https://saas-unapei-ap.octime.net/wd240awp/wd240awp.exe/connect/weoctime100?ini=unapei-ap"
        />

        {/* DirectActu - App 5 */}
        <ClickunapApp
          color="#312532"
          logo="/logo.svg"
          name="Direct Actu"
          link="https://padlet.com/unapeialpesprovence/direct-actu-jlwim6wvptipb2xm"
        />

        {/* Gessi = App 6 */}
        <ClickunapApp 
        color="#d24726" 
        logo="/gessi.png" 
        name="Gessi" 
        onClick={() => openApp("gessi")}
        />

        {/* Support Nephyla - App 7 */}
        <ClickunapApp 
          color="#fc4236" 
          logo="/nephyla.png" 
          name="Support Nephyla"
          onClick={() => openApp("anydesk")}
         />

        {/* Word - App 8*/}
        <ClickunapApp
          color="white"
          logo="/word-carre.png"
          name="Word"
          onClick={() => openApp("msword")}
        />

      {/* Microsoft Teams - App 6 */}
      <ClickunapApp
        color="white"
        logo="/mic-teams.svg"
        name="Teams"
        link="https://www.microsoft.com/fr-fr/microsoft-teams/group-chat-software/"
      />


      </div>
    </div>
  );
}
