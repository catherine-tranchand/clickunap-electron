import clsx from 'clsx'
import Image from 'next/image'

export default function ClickunapAvatar({ id, size, className, style }) {
  return (
    <Image 
      className={clsx(['ClickunapAvatar', 'flex justify-center items-center rounded-full p-2 size-6 overflow-hidden object-cover relative', className])}
      style={{style}}
      src={getSvgById(id)}
      width={size ?? 24}
      height={size ?? 24}
      alt="Clickunap avatar"
      priority={true}
    />
  )

  function getSvgById(id) {
    return `avatars/${id}.svg`;
  }

}
