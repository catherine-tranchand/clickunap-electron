
import { useState } from "react";


import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import ClickunapIcon from "@/components/clickunap-icon";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import ClickunapDialog from "@/components/clickunap-dialog";


import clsx from "clsx";






export default function ClickunapDialogOfficesEdit({ data, opened, currentOffice, locked, onClose, onOpen, onCloseButtonClick, onDeleteButtonClick }) {


  const [hasUpdateError, setHasUpdateError] = useState(false);


  

  const addressInputProps = { input: {
    startAdornment: (
      <InputAdornment position="start">
        <ClickunapIcon name="location" />
      </InputAdornment>
    )},
  };





    

  return (
    <ClickunapDialog 
      name="EditOfficeDialog" 
      opened={opened} 
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
          //slotProps={{ input: { startAdornment: <InputAdornment position="start">icon</InputAdornment> } }}
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
          <Button onClick={() => onDeleteButtonClick(currentOffice?.id)} 
            variant="contained" 
            color="error" 
            className={clsx("w-full !rounded-full uppercase !text-md lg:!text-lg !py-2 !tracking-wider")}>
            Delete 
          </Button>

        </div>


      </ClickunapDialog>

  );


  

  async function handleUpdateFormSubmit(event) {
    event.preventDefault();

    
    const formData = new FormData(event.target);

    // tell me about this formData
    console.log(`\x1b[33m[handleUpdateFormSubmit]\x1b[0m formData is => `, formData);

  }



}
