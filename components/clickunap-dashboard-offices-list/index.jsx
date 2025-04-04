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
          <li key={office.userId} onClick={() => onItemClick && onItemClick(office.userId)}
            className={clsx(["OfficeItem group relative flex flex-col select-none size-50 min-w-50",
              "max-w-50 lg:size-70 lg:min-w-70 lg:max-w-70 h-auto p-2 rounded-lg cursor-pointer justify-start items-center"],
              ["bg-white dark:bg-black transition-all lg:hover:-translate-y-4 hover:bg-tertiary-container"])}>

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
