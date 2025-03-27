import Image from "next/image";
import Link from "next/link";
import useApps from "@/hooks/useApps";
import ClickunapAvatar from "../clickunap-avatar";
import useUser from "@/hooks/useUser";



export default function ClickunapSideBar({ page = "home", managerLinkHidden }) {

  const { openLink } = useApps();

  const { firstname, lastname, avatarId, isUserConnected, isUserManager } = useUser();




  return (
    <div className="ClickunapSideBar hidden lg:flex w-80 h-full flex-col justify-between items-center bg-secondary text-black overflow-auto">
      
      {/* NavLinks */}
      <nav className="flex flex-col w-full h-full py-4 px-0 list-none">
        {/* Home Link */}
        <li>
          <Link className="NavLink" href="/" data-active={(page === "home") ? "true": "false"}>
            <span className="NavIcon material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1"}}>home</span>
            <span className="NavName">Accueil</span>
          </Link>
        </li>

        {/* Services Link */}
        <li>
          <Link href="/territories" className="NavLink" data-active={(page === "territories") ? "true": "false"}>
            <span className="NavIcon material-symbols-outlined">corporate_fare</span>
            <span className="NavName">Annuaire établissement</span>
          </Link>
        </li>

        {/* Numbers Link */}
       {/*<li>
          <Link href="/numbers" className="NavLink">
            <span className="NavIcon material-symbols-outlined">call</span>
            <span className="NavName">Contacts siège</span>
          </Link>
  </li>*/}


        {/* Badgeuse */}
        <li 
          className="NavLink cursor-pointer" 
          onClick={() => openLink("https://saas-unapei-ap.octime.net/module/webbadgeuse100/badgeuse.asp?INI=unapei-ap")}>
        
          <span className="NavIcon material-symbols-outlined">check_circle</span>
          <span className="NavName">Badgeuse</span>
      </li>

        {/* Login Link */}
        {isUserConnected === false && (
          <li>
            <Link href="/login" className="NavLink">
              <span className="NavIcon material-symbols-outlined">manage_accounts</span>
              <span className="NavName">Mon espace</span>
            </Link>
          </li>
        )}
        
        {/* Manager/Dashboard Link */}
        {managerLinkHidden === false && isUserManager && (
          <li>
            <Link href="/dashboard" className="NavLink">
              <span className="NavIcon material-symbols-outlined">dashboard</span>
              <span className="NavName">Dashboard</span>
            </Link>
          </li>
        )}

      </nav>
      
      {isUserConnected && (
        <Link href="/profile" className="max-w-full px-2 relative">
          <div className="flex px-3 items-center justify-center bg-[#d6bed7] hover:bg-[#ffffff] rounded-3xl">
            {/* Clickunap - Avatar */}
            <ClickunapAvatar id={avatarId} className="!size-10"/>

            {/* Fullname */}
            <span className="truncate text-base">{firstname + ' ' + lastname}</span>
          </div>
        </Link>
      )}


      {/* Logo Unapei */}
      <Image
        src="/unapei.svg"
        width={270}
        height={40}
        alt="Logo Unapei"
      />

    </div>
  );
}
