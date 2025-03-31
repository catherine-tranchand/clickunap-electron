import { useState, useEffect } from "react";
import ClickunapIcon from '@/components/clickunap-icon';
import clsx from 'clsx'


export default function ClickunapDialog({ 
  name, 
  closeIcon,
  opened, 
  locked,
  backdropHidden, 
  className, 
  style, 
  onCloseButtonClick, 
  children, 
  onClose, // callback fired when the dialog is closed
  onOpen, // callback fired when the dialog is opened
  // onClick 
}) {

  
  const [ isClosed, setIsClosed ] = useState(true);


  

  useEffect(() => {
    // do nothing if `opened` is `null`
    if (opened === null) {
      return;
    }

    if (opened) {
      // fire the onOpen event when the dialog is closed (after 700ms)
      setTimeout(() => {
        onOpen && onOpen();
        setIsClosed(false);
      }, 700);
    } else {
      // fire the onClose event when the dialog is closed (after 700ms)
      setTimeout(() => {
        onClose && onClose();
        setIsClosed(true);
      }, 700);
    }
  }, [opened]);





  return (
    <div 
      className={clsx(['ClickunapDialog', name, className], 
        "fixed z-50 size-full p-6 flex flex-col items-center justify-end overflow-hidden",
        {"!pointer-events-none": isClosed && !opened}
      )} 
      style={style}
      //onClick={onClick}
    >

    {/* Backdrop */}
    <div className={clsx("Backdrop",
      "bg-black fixed inset-0 z-10 opacity-20 dark:opacity-80 transition-all duration-700", 
      {"!opacity-0 dark:!opacity-0": !opened},
      {"!pointer-events-auto": locked && opened},
    )}></div>
    
    {/* Content */}
    <div 
      className={clsx("Content", 
        ["bg-white dark:bg-[#0b080b] rounded-lg overflow-scroll flex flex-col z-20 relative items-center justify-start mx-auto"],
        ["w-full min-h-50 h-auto lg:w-fit lg:h-auto lg:min-w-lg lg:min-h-50 mx-auto translate-y-full transition-all duration-700"],
        {"!translate-y-0": opened},
        {"!opacity-0 duration-900": !opened},
        {"!pointer-events-auto": opened},
      )}>
      {children}
 
      {/* Clickunap Icon */}
      <ClickunapIcon 
        className="rounded-full absolute top-0 right-0 m-6 lg:m-8 z-10 transition-all hover:scale-105 cursor-pointer"
        name={closeIcon ?? "close"} 
        backgroundColor="white"
        color="black"
        onClick={onCloseButtonClick}
      />
    </div>

  </div>)
}
