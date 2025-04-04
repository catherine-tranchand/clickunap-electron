
import { useState, useEffect } from "react";

import ClickunapDialogOfficesAdd from "@/components/clickunap-dialog-offices-add";
import ClickunapDialogOfficesView from "@/components/clickunap-dialog-offices-view";
import ClickunapDialogOfficesEdit from "@/components/clickunap-dialog-offices-edit";
import ClickunapDialogOfficesDelete from "@/components/clickunap-dialog-offices-delete";
import ClickunapDialogOfficesSearch from "@/components/clickunap-dialog-offices-search";



import clsx from "clsx";






export default function ClickunapDashboardOfficesDialog({ 
  currentId, type, opened, locked, onCloseButtonClick, data: allOffices, onClose, onOpen, 
  onEditButtonClick, onDeleteButtonClick }) {

    
  const [ currentOffice, setCurrentOffice ] = useState({});



  
  

  


  useEffect(() => {
    
    // get the current office from `allOffices`
    const currentOfficeData = allOffices?.find((office) => office.id === currentId);

    setCurrentOffice(currentOfficeData || {});

    console.log(`OfficesDialog::: currentId => ${currentId} and currentOfficeData => `, currentOfficeData);

  }, [ allOffices, currentId ]);


  




  return (
    <div className={clsx("DialogWrapper size-full")}>


      
      {/* Add - Offices - Dialog */}
      <ClickunapDialogOfficesAdd
        opened={opened && type === "add"} 
        locked={locked}
        onClose={onClose}
        onOpen={onOpen}
        onCloseButtonClick={onCloseButtonClick}
      />




      
      {/* View - Offices - Dialog */}
      <ClickunapDialogOfficesView
        data={currentOffice}
        opened={opened && type === "view"} 
        locked={locked}
        onClose={onClose}
        onOpen={onOpen}
        onCloseButtonClick={onCloseButtonClick}
      />




      {/* Edit - Offices - Dialog */}
      <ClickunapDialogOfficesEdit
        data={currentOffice}
        opened={opened && type === "edit"} 
        locked={locked}
        onClose={onClose}
        onOpen={onOpen}
        onCloseButtonClick={onCloseButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
      />




      
      {/* Delete - Offices - Dialog */}
      <ClickunapDialogOfficesDelete
        data={currentOffice}
        opened={opened && type === "delete"} 
        locked={locked}
        onClose={onClose}
        onOpen={onOpen}
        onCloseButtonClick={onCloseButtonClick}
      />




      
      {/* Search - Offices - Dialog */}
      <ClickunapDialogOfficesSearch
        opened={opened && type === "search"} 
        locked={locked}
        onClose={onClose}
        onOpen={onOpen}
        onCloseButtonClick={onCloseButtonClick}
      />






      
    </div>
  );







}
