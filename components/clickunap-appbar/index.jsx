import Image from "next/image";
import Link from "next/link";

export default function ClickunapAppBar() {
  return (
    <div className="ClickunapAppBar w-full h-16 lg:h-32 bg-primary text-white flex justify-between items-center flex-col lg:flex-row  px-3 py-2 lg:py-0 overflow-hidden">
      {/* Clickunap LogoName */}
      <Link href="/">
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
