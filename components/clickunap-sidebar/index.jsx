import Image from "next/image";
import Link from "next/link";
import useApps from "@/hooks/useApps";
import ClickunapAvatar from "../clickunap-avatar";
import useUser from "@/hooks/useUser";
// import useStorage from "@/hooks/useStorage";
import Button from "@mui/material/Button";

import clsx from "clsx";




export default function ClickunapSideBar({ page = "home", managerLinkHidden }) {
  const { openLink } = useApps();

  const { firstname, lastname, avatarId, isUserConnected, isUserAdmin, isSidebarOpened, setSidebarOpened } = useUser();

  // const { isSidebarOpened, setSidebarOpened } = useStorage();




  return (
    <div className={clsx("ClickunapSideBar hidden lg:flex h-full flex-col items-center bg-secondary text-black transition-all", 
      {"w-80 min-w-80": isSidebarOpened}, {"w-24 min-w-24": !isSidebarOpened})}>

      
      {/* NavLinks */}
      <nav className="flex flex-col w-full h-full py-4 px-0 list-none overflow-auto">
        {/* Home Link */}
        <li>
          <Link title="Accueil" 
            className={clsx("NavLink", {"flex justify-center": !isSidebarOpened})}
            href={isUserConnected ? "/manager" : "/"} data-active={(["home", "manager"].includes(page)) ? "true": "false"}>
            <span className="NavIcon material-symbols-outlined" style={{ fontVariationSettings: ["home", "manager"].includes(page) ? "'FILL' 1": "'FILL' 0"}}>home</span>
            {isSidebarOpened && <span className="NavName">Accueil</span>}
          </Link>
        </li>


        {/* Manager/Dashboard Link */}
        {isUserConnected && isUserAdmin && (
          <li>
            <Link 
              title="Dashboard" 
              href="/dashboard"
              data-active={(page === "dashboard") ? "true": "false"}
              className={clsx("NavLink", {"flex justify-center": !isSidebarOpened})}>
              <span className="NavIcon material-symbols-outlined" style={{ fontVariationSettings: (page === "dashboard") ? "'FILL' 1": "'FILL' 0"}}>dashboard</span>
              {isSidebarOpened && <span className="NavName">Dashboard</span>}
            </Link>
          </li>
        )}

        {/* Services Link */}
        <li>
          <Link 
            title="Annuaire établissement" 
            href="/territories" 
            className={clsx("NavLink", {"flex justify-center": !isSidebarOpened})}
            data-active={(page === "territories") ? "true": "false"}>

            <span className="NavIcon material-symbols-outlined" style={{ fontVariationSettings: (page === "territories") ? "'FILL' 1": "'FILL' 0"}}>business_center</span>
            {isSidebarOpened && <span className="NavName">Annuaire établissement</span>}

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
          title="Badgeuse"
          className={clsx("NavLink cursor-pointer", {"flex justify-center": !isSidebarOpened})}
          onClick={() => openLink("https://saas-unapei-ap.octime.net/module/webbadgeuse100/badgeuse.asp?INI=unapei-ap")}>
        
          <span className="NavIcon material-symbols-outlined">check_circle</span>
          {isSidebarOpened && <span className="NavName">Badgeuse</span>}
      </li>

        {/* Login Link */}
        {isUserConnected === false && (
          <li>
            <Link 
              href="/login" 
              title="Mon espace"
              className={clsx("NavLink", {"flex justify-center": !isSidebarOpened})}>
              <span className="NavIcon material-symbols-outlined" style={{ fontVariationSettings: (page === "login") ? "'FILL' 1": "'FILL' 0"}}>manage_accounts</span>
              {isSidebarOpened && <span className="NavName">Mon espace</span>}
            </Link>
          </li>
        )}
        
      
        {/* Register Link */}
        {isUserConnected && isUserAdmin && (
          <li>
            <Link 
              href="/register" 
              title="Inscription"
              className={clsx("NavLink", {"flex justify-center": !isSidebarOpened})}>
              <span className="NavIcon material-symbols-outlined" style={{ fontVariationSettings: (page === "register") ? "'FILL' 1": "'FILL' 0"}}>person_add</span>
              {isSidebarOpened && <span className="NavName">Inscription</span>}
            </Link>
          </li>
        )}
      

      </nav>
      
      {isUserConnected && (
        <Link 
          href="/profile" 
          title={firstname + ' ' + lastname}
          className="max-w-full px-2 relative">

          <div className={clsx("flex px-3 items-center justify-center bg-[#d6bed7] hover:bg-[#ffffff] rounded-3xl", {"!bg-white": page === "profile"})}>
            {/* Clickunap - Avatar */}
            <ClickunapAvatar id={avatarId} className="!size-10"/>

            {/* Fullname */}
            {isSidebarOpened && <span className="truncate text-base">{firstname + ' ' + lastname}</span>}
          </div>
        </Link>
      )}


      {/* Logo Unapei */}
      {isSidebarOpened && (<Image
        src="/unapei.svg"
        width={270}
        height={40}
        alt="Logo Unapei"
      />)}

      <Button 
        variant="text" 
        className="w-full h-auto" 
        onClick={() => isSidebarOpened ? setSidebarOpened(false) : setSidebarOpened(true)}>

        <span className="material-symbols-outlined">
          {isSidebarOpened ? "keyboard_double_arrow_left" : "keyboard_double_arrow_right"}
        </span>
      </Button>

    </div>
  );
}
