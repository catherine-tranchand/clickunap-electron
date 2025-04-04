
import { useState, useCallback } from "react";

import InputAdornment from "@mui/material/InputAdornment";

import ClickunapDialog from "@/components/clickunap-dialog";


import clsx from "clsx";






export default function ClickunapDialogOfficesView({ data: currentOffice, opened, locked, onCloseButtonClick, onClose, onOpen }) {


  

    

  const getRealDate = useCallback((locale = "fr") => {

    if (currentOffice?.created_at) {
      let date = new Date(currentOffice.created_at);
      return date.toLocaleDateString(locale) + " @ " + date.toLocaleTimeString(locale);
    }

    return "--";

  }, [ currentOffice?.created_at ]);


  









  





  return (
    <ClickunapDialog 
      name="ViewOfficeDialog" 
      opened={opened} 
      locked={locked}
      onCloseButtonClick={onCloseButtonClick}
      onClose={onClose}
      onOpen={onOpen}>
      

      </ClickunapDialog>

  );


}
