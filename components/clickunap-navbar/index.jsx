import Link from "next/link";

const openLinkInNewWindow = (e, url) => {
  e.preventDefault();

  setTimeout(() => {
    window.open(url, "__blank");
  }, 100);
};

export default function ClickunapNavBar({ managerLinkHidden }) {
  return (
    <nav className="ClickunapNavBar lg:hidden flex absolute bottom-0 w-full h-20 justify-between items-center bg-secondary text-black list-none">
      {/* Home Link */}
      <li>
        <Link className="NavLink !flex-col" href="/" data-active="true">
          <span
            className="NavIcon material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            home
          </span>
          <span className="NavName !text-xs truncate !w-12">Accueil</span>
        </Link>
      </li>

      {/* Services Link */}
      <li>
        <Link href="/territories" className="NavLink !flex-col">
          <span className="NavIcon material-symbols-outlined">
            corporate_fare
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
      <li>
        <Link
          href="https://saas-unapei-ap.octime.net/module/webbadgeuse100/badgeuse.asp?INI=unapei-ap&SOCIETE=1&SSO=N&NUMINTER=0"
          target="_blank"
          className="NavLink !flex-col"
        >
          <span className="NavIcon material-symbols-outlined">
            check_circle
          </span>
          <span className="NavName !text-xs truncate !w-12">Badgeuse</span>
        </Link>
      </li>

      {/* Manager Link */}
      {managerLinkHidden === false && (
        <li>
          <Link href="/login" className="NavLink !flex-col">
            <span className="NavIcon material-symbols-outlined">
              manage_accounts
            </span>
            <span className="NavName !text-xs truncate !w-12">Mon espace</span>
          </Link>
        </li>
      )}
    </nav>
  );
}
