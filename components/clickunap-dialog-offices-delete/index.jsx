
import { useState } from "react";


import ClickunapDialog from "@/components/clickunap-dialog";


import clsx from "clsx";






export default function ClickunapDialogOfficesDelete({ opened, locked, onCloseButtonClick, onClose, onOpen, offices }) {


  

    

  return (
    <ClickunapDialog 
      name="DeleteOfficeDialog" 
      opened={opened} 
      locked={locked}
      onCloseButtonClick={onCloseButtonClick}
      onClose={onClose}
      onOpen={onOpen}>
      

      </ClickunapDialog>

  );


}
