import Image from "next/image";
import Link from "next/link";

export default function ClickunapApp({ logo, name, color, link, onClick }) {
  return (
    <div className="ClickunapSideBar flex w-24 h-28 lg:w-36 lg:h-40 flex-col transition-all hover:scale-110">
      
      {/* Container */}
      <div className="AppContainer rounded-lg flex grow w-full justify-center items-center cursor-pointer" style={{ backgroundColor: color}} onClick={onClick}>
        {link && <Link 
          href={link}
          className="w-full h-full flex justify-center items-center p-4" target="blank">

          {/* Logo */}
          <Image
            src={logo ?? ''}
            width={270}
            height={40}
            alt="Logo Unapei"
            className="lg:!w-24 lg:!h-24"
          />
        </Link>}


        {!link && <Image
          src={logo ?? ''}
          width={270}
          height={40}
          alt="Logo Unapei"
          className="lg:!w-24 lg:!h-24 p-4 lg:p-0"
        />}

      </div>

      {/* Name */}
      <span className="AppName w-full text-sm lg:text-base text-center px-2 lg:py-1">{name}</span>

      {/* Logo Unapei */}

    </div>
  );
}
