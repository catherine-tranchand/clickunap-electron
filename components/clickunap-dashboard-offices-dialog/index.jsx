
import { useState, useEffect, useCallback } from "react";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import ClickunapIcon from "@/components/clickunap-icon";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import ClickunapDialog from "@/components/clickunap-dialog";


import clsx from "clsx";






export default function ClickunapDashboardOfficesDialog({ 
  currentId, type, opened, locked, onCloseButtonClick, data: allOffices, onClose, onOpen, 
  onEditButtonClick, onDeleteButtonClick }) {

    
  const [ currentOffice, setCurrentOffice ] = useState({});


  const [hasUpdateError, setHasUpdateError] = useState(false);

  
  

  



  const firstNameInputProps = { input: {
    startAdornment: (
      <InputAdornment position="start">
        <ClickunapIcon name="person" />
      </InputAdornment>
    )},
  };


  const lastNameInputProps = { input: {
    startAdornment: (
      <InputAdornment position="start">
        <ClickunapIcon name="person" />
      </InputAdornment>
    )},
  };


  const roleInputProps = { input: {
    startAdornment: (
      <InputAdornment position="start">
        <ClickunapIcon name="shield_person" />
      </InputAdornment>
    )},
  };

  const emailInputProps = { input: {
    startAdornment: (
      <InputAdornment position="start">
        <ClickunapIcon name="mail" />
      </InputAdornment>
    )},
  };

  



  useEffect(() => {
    
    // get the current office from `allOffices`
    const currentOfficeData = allOffices?.find((office) => office.id === currentId);

    setCurrentOffice(currentOfficeData || {});

    console.log(`OfficesDialog::: currentId => ${currentId} and currentOfficeData => `, currentOfficeData);

  }, [ allOffices, currentId ]);


  

  const getRealDate = useCallback((locale = "fr") => {

    if (currentOffice?.created_at) {
      let date = new Date(currentOffice.created_at);
      return date.toLocaleDateString(locale) + " @ " + date.toLocaleTimeString(locale);
    }

    return "--";

  }, [ currentOffice?.created_at ]);




  return (
    <div className={clsx("DialogWrapper size-full")}>


      {/* View - Dialog */}
      <ClickunapDialog 
        name="ViewOfficeDialog" 
        opened={opened && type === "view"} 
        locked={locked}
        onCloseButtonClick={onCloseButtonClick}
        onClose={onClose}
        onOpen={onOpen}>

        {/* Banner */}
        {/*<Image 
          className="!w-full !h-32"
          src="/office_banner.png"
          width={256}
          height={56}
          alt="Office Banner - Clickunap"
          priority
        />*/}
        
        
        

        {/* Details */}
        <ul className={clsx("flex flex-col w-full px-5 lg:px-10 pt-8 pb-2 lg:pb-4 space-y-1 overflow-y-auto", 
          "lg:space-y-3 text-lg lg:text-xl capitalize cursor-default")}>
          {/* Names */}
          <li className={clsx("flex flex-row space-x-2 justify-between group/item", 
            "lg:opacity-80 lg:dark:opacity-50 hover:opacity-100 transition-opacity")}>
            <span className={clsx("font-bold select-none")}>Names:</span>
            <span className={clsx("opacity-50 group-hover/item:opacity-100 select-all")}>{"IME LES AMANDIERS (SIPFP et section TSA Les Jasmins)"}</span>
          </li>

          {/* CreatedAt */}
          {/*<li className={clsx("flex flex-row space-x-2 justify-between group/item", 
            "lg:opacity-80 lg:dark:opacity-50 hover:opacity-100 transition-opacity")}>
            <span className={clsx("font-bold select-none")}>Created At:</span>
            <span className={clsx("opacity-50 group-hover/item:opacity-100 select-all")}>{getRealDate()}</span>
          </li>
          */}
      
        </ul>
        

        <div className={clsx("ButtonWrapper flex flex-col w-full h-auto px-5 lg:px-10 pt-4 pb-6 justify-center items-center")}>
          {/* Edit Office Button */}
          <Button onClick={() => onEditButtonClick(currentOffice?.userId)} 
            variant="contained" 
            color="primary" 
            className={clsx("w-full !rounded-full uppercase !text-md lg:!text-lg !py-2 !tracking-wider")}>
            Edit 
          </Button>

        </div>



      </ClickunapDialog>


      





















      {/* Edit - Dialog */}
      <ClickunapDialog 
        name="ViewOfficeDialog" 
        opened={opened && type === "edit"} 
        locked={locked}
        onCloseButtonClick={onCloseButtonClick}
        onClose={onClose}
        onOpen={onOpen}>

        {/* TODO: Add office banner herer */}

        <Box 
          component="form"
          sx={{ '& .MuiTextField-root': { my: 1.5, mx: 0, width: '100%' } }}
          className="!p-4 lg:!px-6 !mt-8 flex flex-col w-full"
          onSubmit={handleUpdateFormSubmit}>

          <FormControl fullWidth>
            <InputLabel id="territory-select-label">Territory</InputLabel>
            <Select
              labelId="territory-select-label"
              id="territory-select"
              value={"hq"}
              label="Territory">
              <MenuItem value={"hq"}>{"HeadQuarter"}</MenuItem>
              <MenuItem value={"territory01"}>{"Territory 01"}</MenuItem>
              <MenuItem value={"territory02"}>{"Territory 02"}</MenuItem>
            </Select>
          </FormControl>


          <FormControl fullWidth>
            <InputLabel id="complex-select-label">Complex</InputLabel>
            <Select
              labelId="complex-select-label"
              id="complex-select"
              value={"hq"}
              label="Complex">
              <MenuItem value={"hq"}>{"HeadQuarter"}</MenuItem>
              <MenuItem value={"complex01"}>{"Complex 01"}</MenuItem>
              <MenuItem value={"complex02"}>{"Complex 02"}</MenuItem>
            </Select>
          </FormControl>


        {/* Office Name - Input */}
        <TextField
          className="!w-full"
          id="office_name-1-input"
          required={true}
          type="text"
          label="Office Name 1"
          value={currentOffice?.names}
          placeholder="Office Name 1"
          // slotProps={firstNameInputProps}
          // onChange={(event) => setFirstName(event.target.value)}
          //InputProps={{ startAdornment: <InputAdornment position="start">icon</InputAdornment> }}
        />

          
      </Box>
  

        <div className={clsx("ButtonWrapper flex flex-col w-full h-auto px-5 lg:px-10 pt-4 pb-6 !space-y-3 lg:!space-y-4 justify-center items-center")}>
          {/* Update Office Button */}
          <Button type="submit" 
            variant="contained" 
            color="primary" 
            className={clsx("w-full !rounded-full uppercase !text-md lg:!text-lg !py-2 !tracking-wider")}>
            Update 
          </Button>

          {/* Delete Office Button */}
          <Button onClick={() => onDeleteButtonClick(currentOffice?.officeId)} 
            variant="contained" 
            color="error" 
            className={clsx("w-full !rounded-full uppercase !text-md lg:!text-lg !py-2 !tracking-wider")}>
            Delete 
          </Button>

        </div>

      </ClickunapDialog>


























      {/* Add - Dialog */}
      <ClickunapDialog 
        name="ViewOfficeDialog" 
        opened={opened && type === "add"} 
        locked={locked}
        onCloseButtonClick={onCloseButtonClick}
        onClose={onClose}
        onOpen={onOpen}>

      </ClickunapDialog>





















      {/* Delete - Dialog */}
      <ClickunapDialog 
        name="ViewOfficeDialog" 
        opened={opened && type === "delete"} 
        locked={locked}
        onCloseButtonClick={onCloseButtonClick}
        onClose={onClose}
        onOpen={onOpen}>


      </ClickunapDialog>



























      {/* Search - Dialog */}
      <ClickunapDialog 
        name="SearchOfficeDialog" 
        opened={opened && type === "search"}
        locked={locked}
        onCloseButtonClick={onCloseButtonClick}
        onClose={onClose}
        onOpen={onOpen}>

      </ClickunapDialog>
    

      
    </div>
  );



  async function handleUpdateFormSubmit(event) {
    event.preventDefault();

    
    const formData = new FormData(event.target);

    // tell me about this formData
    console.log(`\x1b[33m[handleUpdateFormSubmit]\x1b[0m formData is => `, formData);

  }





}
