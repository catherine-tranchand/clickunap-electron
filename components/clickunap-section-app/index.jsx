"use client";

import Image from "next/image";
import Link from "next/link";

import ClickunapApp from "../clickunap-app";

import useApps from "@/hooks/useApps";

export default function ClickunapAppSection({ title }) {
  const { openApp, openLink } = useApps();

  return (
    <div className="ClickunapAppSection w-full h-fit flex flex-col p-4 justify-start items-center space-y-4">
      {/* Title */}

      <h2 className="AppSectionTitle uppercase font-extrabold opacity-50">
        {title}
      </h2>

      {/* Box */}

      <div className="AppSectionBox grid grid-cols-4 gap-4 lg:gap-6">
          {/* Outlook - App 6 */}
      <ClickunapApp
          color="#c8e4eb"
          logo="/outlook.png"
          name="Mail"
          onClick={() => openApp("outlook")}
        />

          {/* Microsoft Teams - App 6 */}
          <ClickunapApp
          color="white"
          logo="/mic-teams.svg"
          name="Teams"
          // link="https://www.microsoft.com/fr-fr/microsoft-teams/group-chat-software/"
          onClick={() => openApp("teams")}
        />

          {/* Airmes - App 1 */}
          <ClickunapApp
          color="#C7D8D6"
          logo="/sharepoint.png"
          name="Sharepoint"
          //link="https://www.airmes-application.eu/"
          onClick={() => openLink("https://www.airmes-application.eu/")}

        />

           {/* Support Nephyla - App 7 */}
       <ClickunapApp 
          color="#fc4236" 
          logo="/nephyla.png" 
          name="Support Nephyla"
          //link="C:\Users\m.robaston\Desktop\AnyDesk.exe" 
          onClick={() => openApp("nephyla")}
          />

               {/* Gessi = App 6 */}
        <ClickunapApp
          color="#d24726"
          logo="/gessi.png"
          name="Gessi"
          onClick={() => openApp("gessi")}
        /> 
       
        {/* Airmes - App 1 */}
        <ClickunapApp
          color="#C7D8D6"
          logo="/airmes.png"
          name="Airmes"
          //link="https://www.airmes-application.eu/"
          onClick={() => openLink("https://www.airmes-application.eu/")}
        />

        {/* Imago DU - App 2 */}
        <ClickunapApp
          color="white"
          logo="/imagodu.png"
          name="Imago DU"
          //link="https://imago.unapei-ap.fr/login"
          onClick={() => openLink("https://imago.unapei-ap.fr/login")}
        />

        {/* Ageval App 3 */}
        <ClickunapApp
          color="white"
          logo="/ageval.jpeg"
          name="Ageval"
         // link="https://unapei-ap.ageval.fr/"
          onClick={() => openLink("https://unapei-ap.ageval.fr/")}
        />

        {/* Octime - App 4 */}
        <ClickunapApp
          color="white"
          logo="/octime.png"
          name="Mon Octime"
         // link="https://saas-unapei-ap.octime.net/wd240awp/wd240awp.exe/connect/weoctime100?ini=unapei-ap"
          onClick={() => openLink("https://saas-unapei-ap.octime.net/wd240awp/wd240awp.exe/connect/weoctime100?ini=unapei-ap")}
        />

        {/* DirectActu - App 5 */}
        <ClickunapApp
          color="white"
          logo="/directActu.png"
          name="Direct Actu"
         //link="https://padlet.com/unapeialpesprovence/direct-actu-jlwim6wvptipb2xm"
          onClick={() => openLink("https://padlet.com/unapeialpesprovence/direct-actu-jlwim6wvptipb2xm")}
        />

      

   

      
          {/* Excel - App 1 */}
          <ClickunapApp
          color="#C7D8D6"
          logo="/excel.png"
          name="Excel"
          //link="https://www.airmes-application.eu/"
          onClick={() => openApp("excel")}
        />

        {/* Word - App 8*/}
        <ClickunapApp
          color="white"
          logo="/word-carre.png"
          name="Word"
          onClick={() => openApp("msword")}
        /> 

        

     
      </div>
    </div>
  );
}
