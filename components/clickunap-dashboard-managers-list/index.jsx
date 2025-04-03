import { useState, useEffect, useRef, useCallback } from "react";

// import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import ClickunapAvatar from "@/components/clickunap-avatar";
import ClickunapIcon from "@/components/clickunap-icon";
import clsx from "clsx";






export default function ClickunapDashboardManagersList({ data, className, onItemClick }) {
  
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
      
      <ul ref={listRef} onScroll={handleScroll} className={clsx("ClickunapDashboardManagersList relative flex w-full h-auto overflow-scroll py-2 space-x-3 lg:py-6 lg:space-x-6 scroll-smooth", className)}>
        
        {data.map((manager) => (
          <li key={manager.userId} onClick={() => onItemClick && onItemClick(manager.userId)}
            className={clsx(["ManagerItem group relative flex flex-row select-none w-60 min-w-60 max-w-60 lg:w-100 lg:min-w-100 lg:max-w-100 h-auto p-2 rounded-lg cursor-pointer justify-start items-center"],
                            ["bg-white dark:bg-black transition-all lg:hover:-translate-y-4 hover:bg-tertiary-container"])}>

            {/* Avatar */}
            <ClickunapAvatar id={manager.avatarId} size={80} className="!size-12 !min-w-12 lg:!size-20 lg:!min-w-20" />

            <div className={clsx("flex flex-col truncate")}>
              <span className={clsx("Name text-sm lg:text-lg font-bold capitalize")}>{manager.firstname} {manager.lastname}</span>
              <span className={clsx("Email text-xs lg:text-lg opacity-50")}>{manager.email}</span>
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
