import clsx from 'clsx'

export default function ClickunapIcon({ name, color, size, backgroundColor, className, light, filled, style, onClick }) {
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
        fontVariationSettings: getFontVariationSettings(light, filled)
      }}>{name}</span> 

  </div>)



  function getFontVariationSettings(light, filled) {
    /* {light ? `${filled ? "'FILL' 1 " : "'FILL' 0 "}"wght" 200` : `${filled ? "'FILL' 1 " : "'FILL' 0 "}"wght" 400`} */
    let result = light ? '"wght" 200' : '"wght" 400';

    if (filled) {
      result += ", 'FILL' 1"
    } else {
      result += ", 'FILL' 0"
    }

    return result;
  }
}
