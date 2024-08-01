import clsx from 'clsx'
import Image from 'next/image'

export default function ClickunapAvatar({ id, size, className, selected, style, onClick }) {
  return (
    <Image 
      className={clsx(['ClickunapAvatar', 'flex justify-center items-center rounded-full p-2 size-6 overflow-hidden object-cover relative', className],
        {'outline outline-4 outline-offset-2 outline-tertiary': selected}
      )}
      style={{style}}
      src={getSvgById(id)}
      width={size ?? 24}
      height={size ?? 24}
      alt="Clickunap avatar"
      priority={false}
      as="image"
      onClick={onClick}
    />
  )

  function getSvgById(id) {
    return `avatars/${id}.svg`;
  }

}
