import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Snackbar from '@mui/material/Snackbar';

import ClickunapIcon from '@/components/clickunap-icon';
import clsx from 'clsx'




const ClickunapDialog = ({ 
  title = '',
  subtitle = '',
  loadingColor = 'primary',
  loading = false,
  returnButtonHidden = true,
  name, 
  closeIcon,
  opened, 
  locked,
  backdropHidden, 
  className, 
  contentClassName,
  style, 
  onCloseButtonClick,
  onReturnButtonClick,
  children, 
  onClose, // callback fired when the dialog is closed
  onOpen, // callback fired when the dialog is opened
  // onClick 
}, ref) => {

  
  const [ isClosed, setIsClosed ] = useState(true);
  const [ snackbarType, setSackbarType ] = useState('success');
  const [ snackbarMessage, setSnackbarMessage ] = useState('');
  const [ snackbarHideDuration, setSnackbarHideDuration ] = useState(6000);
  const [ isSnackbarOpened, setSnackbarOpened ] = useState(false);

  

  const dialogRef = useRef(null);
  const snackbarRef = useRef(null);





  
  useImperativeHandle(ref, () => ({
    element: dialogRef.current,
    snackbarEl: snackbarRef.current,

    showSnackbar: ({ type, message }) => {
      setSackbarType(type);
      setSnackbarMessage(message);
      setSnackbarOpened(true);
    },

  }));







  

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
    <div ref={dialogRef}
      className={clsx(['ClickunapDialog', name, className], 
        "fixed inset-0 z-50 size-full p-6 flex flex-col items-center justify-end overflow-hidden transition-all",
        {"!pointer-events-none": isClosed && !opened}
      )}
      data-opened={opened}
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
        ["w-full min-h-50 h-auto lg:w-fit lg:h-auto lg:min-w-lg lg:min-h-50 mx-auto translate-y-full transition-all duration-500"],
        {"!translate-y-0": opened},
        {"!opacity-0 duration-900": !opened},
        {"!pointer-events-auto": opened},
        contentClassName,
      )}>
      
      {loading && <LinearProgress color={loadingColor} className="absolute top-0 left-0 w-[120%] h-2 lg:h-4 z-10 m-0" />}

      {(title.length > 0) && (
        <AppBar position="static" className="h-25 !text-on-background !shadow-none" style={{ background: "none" }}>
          <Toolbar>
            {!returnButtonHidden && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="return"
                sx={{ mr: 2 }}
                onClick={onReturnButtonClick}
              >
                <ClickunapIcon name="arrow_back" />
              </IconButton>
            )}

            <div className="flex flex-col w-full h-auto">
              <h6 className="Title text-lg font-bold">{title}</h6>
              {/* (subtitle.length > 0) && <p className="Subtitle text-xs opacity-50">{subtitle}</p>*/}
              <p className="Subtitle text-xs opacity-50">{subtitle}</p>
            </div>

          </Toolbar>
        </AppBar>
      )}

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

    {/* Snackbar */}
    <Snackbar
      ref={snackbarRef}
      open={isSnackbarOpened}
      autoHideDuration={snackbarHideDuration}
      message={snackbarMessage}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={() => setSnackbarOpened(false)}
    />

  </div>)
}



export default forwardRef(ClickunapDialog);
