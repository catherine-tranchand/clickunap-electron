import Image from "next/image";
import Link from "next/link";
import ClickunapAvatar from "@/components/clickunap-avatar";

import useUser from "@/hooks/useUser";
import useRedirect from "@/hooks/useRedirect";



export default function ClickunapAppBar() {

  const { isUserConnected, avatarId } = useUser();
  const redirect = useRedirect();







  return (
    <div className="ClickunapAppBar w-full h-16 lg:h-32 bg-primary text-white flex justify-between items-center flex-col lg:flex-row  px-3 py-2 lg:py-0 overflow-hidden relative">

    {/* Clickunap Avatar */}
    <ClickunapAvatar
      id={avatarId}
      className="!size-14 !bg-primary m-2 !absolute !cursor-pointer left-0 top-0 lg:!hidden"
      onClick={() => redirect.to('/profile')}
      selected={false}
    />

      {/* Clickunap LogoName */}
      <Link href={(isUserConnected) ? "/manager" : "/"}>
        <Image
          src="/newlogo.png"
          className="lg:!w-72 lg:!h-16"
          width={200}
          height={40}
          alt="Clickunap logo"
          priority={true}
          as="image"
        />
      </Link>

      {/* Clickunap People */}
      <Image
        src="/people.png"
        className="hidden lg:block lg:!w-[382px] lg:!h-[110px] place-self-end"
        width={200}
        height={64}
        alt="Clickunap People"
        priority={true}
        as="image"
      />
    </div>
  );
}
