import IconButton from "@mui/material/IconButton";
import ClickunapIcon from "@/components/clickunap-icon";
import clsx from "clsx";








export default function ClickunapBox({ 
  title, 
  searchHidden, 
  addHidden, 
  moreHidden,

  onSearchButtonClick,
  onAddButtonClick,
  onMoreButtonClick,

  children,
  className,

}) {



  



  return (
    <div className={clsx("ClickunapBox flex flex-col w-full h-auto my-5 lg:px-10", className)}>
      
      {/* Bar */}
      <div className="Bar flex flex-row w-full h-10 justify-between items-center">

        {/* Title Wrapper */}
        <div className="TitleWrapper flex flex-col w-full h-full justify-start items-start">
          <h2 className={clsx("Title text-md lg:text-3xl font-light uppercase lg:font-bold lg:normal-case")}>{title}</h2>
        </div>

        {/* Icons Wrapper */}
        <div className={clsx("IconsWrapper flex flex-row pl-2 py-2 !space-x-2 justify-center items-center")}>
          {/* Search Icon Button */}
          {!searchHidden && (
            <IconButton 
              onClick={onSearchButtonClick} 
              color={"on-background"}
              className="max-sm:size-10 dark:lg:opacity-40 lg:opacity-70 lg:hover:opacity-100 lg:transition-opacity">

              <ClickunapIcon name="search" className="!pointer-events-none" /> 

            </IconButton>
          )}

          {/* Add Icon Button */}
          {!addHidden && (
            <IconButton 
              onClick={onAddButtonClick} 
              color={"on-background"}
              className="max-sm:size-10 dark:lg:opacity-40 lg:opacity-70 lg:hover:opacity-100 lg:transition-opacity">

              <ClickunapIcon name="add" className="!pointer-events-none" /> 

            </IconButton>
          )}

          {/* More Icon Button */}
          {!moreHidden && (
            <IconButton 
              onClick={onMoreButtonClick} 
              color={"on-background"}
              className="max-sm:size-10 dark:lg:opacity-40 lg:opacity-70 lg:hover:opacity-100 lg:transition-opacity">

              <ClickunapIcon name="more_horiz" className="!pointer-events-none" /> 

            </IconButton>
          )}
        </div>

      </div>
      {/* End of Bar */}

      
      {children}

    </div>
  );
}
