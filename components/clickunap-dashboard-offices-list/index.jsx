import { useState, useEffect, useRef, useCallback } from "react";

// import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

// import ClickunapAvatar from "@/components/clickunap-avatar";
import ClickunapIcon from "@/components/clickunap-icon";
import clsx from "clsx";






export default function ClickunapDashboardOfficesList({ data, className, onItemClick }) {
  
  const [ isScrollLeftBtnHidden, setScrollLeftBtnHidden ] = useState(true);
  const [ isScrollRightBtnHidden, setScrollRightBtnHidden ] = useState(false);
  


  
  const listRef = useRef(null);

  

  
  const handleScroll = useCallback(() => {

    // get the scroll left list element as `listEl`
    const listEl = listRef.current;

    setScrollLeftBtnHidden(listEl.scrollLeft === 0);
    setScrollRightBtnHidden(listEl.scrollLeft + listEl.offsetWidth >= listEl.scrollWidth);

  }, [ listRef ]);



  const handleScrollLeft = useCallback(() => {

    // get the scroll left list element as `listEl`
    const listEl = listRef.current;

    listEl.scrollLeft = listEl.scrollLeft - (listEl.offsetWidth / 2);
  }, [ listRef ]);


  const handleScrollRight = useCallback(() => {

    // get the scroll left list element as `listEl`
    const listEl = listRef.current;

    listEl.scrollLeft = listEl.scrollLeft + (listEl.offsetWidth / 2);
  }, [ listRef ]);



    









  return (
    <div className={clsx("ListWrapper relative flex w-full h-auto")}>
      
      <ul ref={listRef} onScroll={handleScroll} className={clsx("ClickunapDashboardOfficesList relative flex w-full h-auto overflow-scroll py-2 space-x-3 lg:py-6 lg:space-x-6 scroll-smooth", className)}>
        
        {data.map((office) => (
          <li key={office.id} onClick={() => onItemClick && onItemClick(office.id)}
            className={clsx(["OfficeItem group relative flex flex-col select-none min-w-50 max-w-50 min-h-60 min-h-60",
              "lg:min-w-70 lg:max-w-70 lg:min-h-90 lg:max-h-90 h-auto rounded-lg lg:!rounded-2xl cursor-pointer justify-stretch items-center overflow-hidden"],
              ["transition-all lg:hover:-translate-y-4"])}>
              
               
               <div className={clsx(["Office flex flex-col space-y-2 lg:space-y-4 flex-1 w-full h-auto bg-white dark:bg-black hover:bg-primary-container p-4 lg:p-6"])}>
                
                {office.names.length > 0 && (
                  <h3 className={clsx(["Name text-base lg:text-lg font-bold break-keep uppercase text-tertiary"])}>
                    <span>{office.names[0]}</span>
                    {office.names.length > 1 && <span className={clsx(["opacity-75 dark:opacity-50"])}>{`...`}</span>}
                  </h3>
                )}


                <p className={clsx(["Address text-sm lg:text-base font-bold"])}>
                  {office.address.length > 60 ? office.address.substr(0, 57) + '...' : office.address}
                </p>
                

                {office.phonenumbers.length > 0 && (
                  <h4 className={clsx(["Phone text-sm lg:text-base font-mono space-x-4 opacity-75 dark:opacity-50 flex flex-row w-full"])}>
                    <ClickunapIcon name="phone" className="!m-0 !mr-2 !size-4 lg:!size-6" />
                    <span className={clsx(["number truncate flex-1"])}>{office.phonenumbers[0]}</span>
                    {office.phonenumbers.length > 1 && <span className={clsx(["opacity-50 dark:opacity-40"])}>{`  ++`}</span>}
                  </h4>
                )}

                {office.emails.length > 0 && (
                  <h4 className={clsx(["Phone text-sm lg:text-base space-x-4 opacity-75 dark:opacity-50 flex flex-row w-full"])}>
                    <ClickunapIcon name="email" className="!m-0 !mr-2 !size-4 lg:!size-6" />
                    <span className={clsx(["number truncate flex-1"])}>{office.emails[0]}</span>
                    {office.emails.length > 1 && <span className={clsx(["opacity-50 dark:opacity-40"])}>{`  ++`}</span>}
                  </h4>
                )}



               </div>
               
               <div className={clsx(["Complex+Territory relative flex flex-col w-full h-auto bg-primary text-white self-end p-2 lg:p-4"])}>
                <span className={clsx(["Complex text-base truncate"])}>{office.complex.name}</span>
                <span className={clsx(["Territory text-sm font-bold opacity-50 truncate"])}>{office.territory.name}</span>

                <span className={clsx([
                  "Id", 
                  "absolute -top-2 right-4 lg:-top-4 lg:right-4 !min-w-5 !min-h-5 lg:!min-w-10 lg:!min-h-10 lg:opacity-0 select-none",
                  "transiton-all lg:translate-x-100 lg:group-hover:translate-x-0 lg:group-hover:opacity-100 duration-300",
                  "rounded-full bg-black dark:bg-white text-white dark:text-black",
                  "flex align-center items-center justify-center font-bold font-mono pointer-events-none",
                ])}>
                  <span className="px-2 lg:px-4 text-xs lg:text-sm">{office.id}</span>
                </span>

               </div>
          </li>
        ))}

      </ul>

   
      {/* Control - Icon Buttons */}
      <div className={clsx("hidden lg:flex absolute flex-row pointer-events-none !z-50 size-full justify-between items-center")}>
        {/* Scroll Left */}
        <Button  
          onClick={handleScrollLeft} 
          variant="contained"
          startIcon={<ChevronLeftIcon />}
          hidden={isScrollLeftBtnHidden}
          className="pointer-events-auto !size-10 !min-w-10 !rounded-full !p-0 !pl-2 -translate-x-5">

        </Button>
        
        <span></span>
      
        {/* Scroll Right */}
        <Button  
          onClick={handleScrollRight} 
          variant="contained"
          startIcon={<ChevronRightIcon />}
          hidden={isScrollRightBtnHidden}
          className="pointer-events-auto !size-10 !min-w-10 !rounded-full !p-0 !pl-2 translate-x-5">

        </Button>

      </div>

    </div>
  );

}
