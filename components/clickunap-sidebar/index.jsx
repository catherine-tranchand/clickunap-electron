import Image from "next/image";
import Link from "next/link";
import useApps from "@/hooks/useApps";


export default function ClickunapSideBar({ managerLinkHidden }) {

  const { openLink } = useApps();



  return (
    <div className="ClickunapSideBar hidden lg:flex w-80 h-full flex-col justify-between items-center bg-secondary text-black overflow-auto">
      
      {/* NavLinks */}
      <nav className="flex flex-col w-full h-full py-4 px-0 list-none">
        {/* Home Link */}
        <li>
          <Link className="NavLink" href="/" data-active="true">
            <span className="NavIcon material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1"}}>home</span>
            <span className="NavName">Accueil</span>
          </Link>
        </li>

        {/* Services Link */}
        <li>
          <Link href="/territories" className="NavLink">
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


        {/* Numbers Link */}
        <li 
          className="NavLink" 
          onClick={() => openLink("https://saas-unapei-ap.octime.net/module/webbadgeuse100/badgeuse.asp?INI=unapei-ap")}>
        
          <span className="NavIcon material-symbols-outlined">check_circle</span>
          <span className="NavName">Badgeuse</span>
      </li>

        {/* Numbers Link */}
        {managerLinkHidden === false && (
          <li>
            <Link href="/login" className="NavLink">
              <span className="NavIcon material-symbols-outlined">manage_accounts</span>
              <span className="NavName">Mon espace</span>
            </Link>
          </li>
        )}
        

      </nav>

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
