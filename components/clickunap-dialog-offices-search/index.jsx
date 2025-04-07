
import { useState } from "react";


import ClickunapDialog from "@/components/clickunap-dialog";


import clsx from "clsx";






export default function ClickunapDialogOfficesSearch({ opened, locked, onCloseButtonClick, onClose, onOpen }) {


  

    

  return (
    <ClickunapDialog 
      name="SearchOfficeDialog" 
      opened={opened} 
      locked={locked}
      onCloseButtonClick={onCloseButtonClick}
      onClose={onClose}
      onOpen={onOpen}>
      

      </ClickunapDialog>

  );


}
