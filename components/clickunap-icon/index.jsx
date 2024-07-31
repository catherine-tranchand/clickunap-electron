import clsx from 'clsx'

export default function ClickunapIcon({ name, color, size, backgroundColor, className, light, style, onClick }) {
  return (
    <div 
      className={clsx(['ClickunapIcon', 'flex justify-center items-center p-2 select-none', className])} 
      style={{...style, color, backgroundColor}}
      onClick={onClick}
    >

    <span 
      className="material-symbols-outlined"
      style={{
        fontSize: size ?? '24px', 
        width: size ?? '24px', 
        height: size ?? '24px',
        fontVariationSettings: light ? '"wght" 200' : '"wght" 400'
      }}>{name}</span> 

  </div>)
}
