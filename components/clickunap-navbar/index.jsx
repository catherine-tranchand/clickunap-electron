import useApps from "@/hooks/useApps";
import Link from "next/link";
import useUser from "@/hooks/useUser";

import clsx from "clsx";




const openLinkInNewWindow = (e, url) => {
  e.preventDefault();

  setTimeout(() => {
    window.open(url, "__blank");
  }, 100);
};

export default function ClickunapNavBar({ page = "home", managerLinkHidden }) {

  const { openLink } = useApps();

  const { isUserConnected, isUserAdmin } = useUser();










  return (
    <nav className="ClickunapNavBar lg:hidden flex absolute bottom-0 w-full h-20 justify-between items-center bg-secondary text-black list-none">
      {/* Home Link */}
      <li>
        <Link 
            className={clsx("NavLink !flex-col")}
            href={isUserConnected ? "/manager" : "/"}
            data-active={(["home", "manager"].includes(page)) ? "true": "false"}
        >
          <span
            className="NavIcon material-symbols-outlined"
            style={{ fontVariationSettings: ["home", "manager"].includes(page) ? "'FILL' 1": "'FILL' 0" }}
          >
            home
          </span>
          <span className="NavName !text-xs truncate !w-12">Accueil</span>
        </Link>
      </li>


    {/* Dashboad Link */}
    {isUserConnected && isUserAdmin && (
      <li>
        <Link 
          href="/dashboard" 
          title="Dashboard"
          data-active={(page === "dashboard") ? "true": "false"}
          className={clsx("NavLink !flex-col")}>
          <span className="NavIcon material-symbols-outlined" style={{ fontVariationSettings: (page === "dashboard") ? "'FILL' 1": "'FILL' 0"}}>dashboard</span>
          <span className="NavName !text-xs truncate !w-12">Dashboard</span>
        </Link>
      </li>
    )}
    

      {/* Territories Link */}
      <li>
        <Link href="/territories" 
              className={clsx("NavLink !flex-col")}
              data-active={(page === "territories") ? "true": "false"}
        >
          <span className="NavIcon material-symbols-outlined" style={{ fontVariationSettings: (page === "territories") ? "'FILL' 1": "'FILL' 0"}}>
            business_center
          </span>
          <span className="NavName !text-xs truncate !w-12">
            Annuaire établissement
          </span>
        </Link>
      </li>

      {/* Contacts Link */}
      {/* 
        <li>
          <Link href="/numbers" className="NavLink !flex-col">
            <span className="NavIcon material-symbols-outlined">call</span>
            <span className="NavName !text-xs truncate !w-12">
              Contacts siège
            </span>
          </Link>
        </li>
      */}
      

      {/* Badge Link */}
      <li 
        className="NavLink !flex-col" 
        onClick={() => openLink("https://saas-unapei-ap.octime.net/module/webbadgeuse100/badgeuse.asp?INI=unapei-ap&SOCIETE=1&SSO=N&NUMINTER=0")}>
        
          <span className="NavIcon material-symbols-outlined">
            check_circle
          </span>
          <span className="NavName !text-xs truncate !w-12">Badgeuse</span>
        
      </li>

      {/* Manager Link */}
      {isUserConnected === false && (
        <li>
          <Link href="/login" className="NavLink !flex-col">
            <span className="NavIcon material-symbols-outlined" style={{ fontVariationSettings: (page === "login") ? "'FILL' 1": "'FILL' 0"}}>
              manage_accounts
            </span>
            <span className="NavName !text-xs truncate !w-12">Mon espace</span>
          </Link>
        </li>
      )}

    {/* Register Link */}
    {/*
    {isUserConnected && isUserAdmin && (
      <li>
        <Link 
          href="/register" 
          title="Inscription"
          className={clsx("NavLink !flex-col")}>
          <span className="NavIcon material-symbols-outlined" style={{ fontVariationSettings: (page === "register") ? "'FILL' 1": "'FILL' 0"}}>person_add</span>
          <span className="NavName !text-xs truncate !w-12">Inscription</span>
        </Link>
      </li>
    )}
    */}

    </nav>
  );
}
