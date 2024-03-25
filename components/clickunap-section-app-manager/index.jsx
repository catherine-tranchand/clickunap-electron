import Image from "next/image";
import Link from "next/link";
import useApps from "@/hooks/useApps";
import ClickunapApp from "../clickunap-app";











//const openLinkInNewWindow = (e, url) =>{
//  e.preventDefault();
 // shell.openExernal(url)
 // window.open(url, "__blanc");
//}














export default function ClickunapAppSectionManager({ title }) {


  const { openApp, openLink } = useApps();
  



  return (
    <div className="ClickunapAppSection w-full h-full flex flex-col p-4 justify-start items-center space-y-4">
      {/* Title */}
      <h2 className="AppSectionTitle uppercase font-extrabold opacity-50">
        {title}
      </h2>

      {/* Box */}
      <div className="AppSectionBox grid grid-cols-3 gap-4 lg:gap-6">
        {/* Airmes - App 1 */}
        <ClickunapApp
          color="#C7D8D6"
          logo="/airmes.png"
          name="Airmes"
          onClick={() => openLink("https://www.airmes-application.eu/")}
        />

        {/* Imago DU - App 2 */}
        <ClickunapApp
          color="white"
          logo="/imagodu.png"
          name="Imago DU"
          
          onClick={() => openLink("https://imago.unapei-ap.fr/login")}
        />

        {/* One drive App 3 */}
        <ClickunapApp
          color="white"
          logo="/onedrive.png"
          name="One drive"
         
           onClick={() => openApp("onedrive")}
        />

        {/* Octime - App 4 */}
        <ClickunapApp
          color="white"
          logo="/octime.png"
          name="Octime Manager"
          link="https://saas-unapei-ap.octime.net/wd240awp/wd240awp.exe/connect/wmoctime100?ini=unapei-ap"
          onClick={() => openLink("https://saas-unapei-ap.octime.net/wd240awp/wd240awp.exe/connect/wmoctime100?ini=unapei-ap")}
        />

        {/* DirectActu - App 5 */}
        {/* <ClickunapApp
          color="white"
          logo="/directActu.png"
          name="Direct Actu"
          link="https://padlet.com/unapeialpesprovence/direct-actu-jlwim6wvptipb2xm"
        /> */}

        {/* Power BI App 6*/}
        <ClickunapApp 
        color="#E3A710" 
        logo="/powerbi.svg" 
        name="Power BI" 
        //link="https://app.powerbi.com/"
        onClick={() => openLink("https://app.powerbi.com/")}
         />

        {/* Gessi App 7 */}
        <ClickunapApp
          color="#d24726"
          logo="/gessi.png"
          name="Gessi"
          onClick={() => openApp("gessi")}
        />
        
        {/* Support Nephyla - App 8 */}
        <ClickunapApp 
          color="#fc4236" 
          logo="/nephyla.png" 
          name="Support Nephyla"
          //link="C:\Users\m.robaston\Desktop\AnyDesk.exe" 
          onClick={() => openApp("nephyla")}
          />


        {/* Word - App 9*/}
        <ClickunapApp
          color="white"
          logo="/word-carre.png"
          name="Word"
          //link="C:\Program Files\Microsoft Office\root\Office16\WINWORD.EXE"
          onClick={() => openApp("msword")}
        />

      {/* Microsoft Teams - App 9 */}
      <ClickunapApp
        color="white"
        logo="/mic-teams.svg"
        name="Teams"
       //link="https://www.microsoft.com/fr-fr/microsoft-teams/group-chat-software/"
       // onClick={(e) => openLinkInNewWindow(e, "https://www.microsoft.com/fr-fr/microsoft-teams/group-chat-software/" )}
        onClick={() => openApp("teams")}
       
      />
      


      </div>
    </div>
  );
}



{/* Microsoft Teams - App 9 */}
/*<ClickunapApp
  color="white"
  logo="/mic-teams.svg"
  name="Teams"
  link="https://www.microsoft.com/fr-fr/microsoft-teams/group-chat-software/"
  onClick={(e) => openLinkInNewWindow(e, "https://www.microsoft.com/fr-fr/microsoft-teams/group-chat-software/")}
/> */
