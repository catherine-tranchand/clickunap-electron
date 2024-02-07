import Image from "next/image";
import Link from "next/link";







export default function ClickunapAuthAside() {
  return (
    <div className="ClickunapAuthAside hidden overflow-hidden relative rounded-3xl lg:flex justify-center items-center flex-col w-3/5 h-full bg-primary">

      {/* Clickunap LogoName */}
      <Link href='/' className="relative -top-32">
        <Image
          src="/clickunap.svg"
          width={500}
          height={100}
          alt="Clickunap logo"
          priority={true}
        />
      </Link>
      

      {/* Clickunap People */}
      <Image
        src="/people.png"
        className="absolute w-full !h-[300px] left-0 right-0 bottom-0 object-contain object-bottom"
        style={{top: 'initial'}}
        alt="Clickunap People"
        priority={false}
        fill={true}
      />


    </div>
  );
}
