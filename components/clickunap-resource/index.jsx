import Link from "next/link";
import clsx from 'clsx';

import ClickunapIcon from "../clickunap-icon";









export default function ClickunapResource({ icon, name, color, iconColor, link }) {
  return (
    <Link href={link} className="ClickunapResource flex px-2 py-2 items-center space-x-2">

      {/* Icon */}
      <ClickunapIcon 
        name={icon} 
        color={iconColor ?? 'white'}
        size={'38px'}
        backgroundColor={color}
        className={clsx('!w-14 !h-14 rounded-full group-hover/resource:!bg-red')} // {`!w-8 !h-8 bg-[${color}]`}
        light={true}
      />

      {/* Name */}
      <span className="truncate hover:text-green-500">{name}</span>

    </Link>
  );
}