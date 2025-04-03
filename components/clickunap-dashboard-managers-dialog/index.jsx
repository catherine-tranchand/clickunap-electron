
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
import ClickunapAvatar from "@/components/clickunap-avatar";

// import useManagers from "@/hooks/useManagers";

import clsx from "clsx";






export default function ClickunapDashboardManagersDialog({ 
  currentId, type, opened, locked, onCloseButtonClick, data: allManagers, onClose, onOpen, 
  onEditButtonClick, onDeleteButtonClick }) {

    
  const [ currentManager, setCurrentManager ] = useState({});


  const [hasUpdateError, setHasUpdateError] = useState(false);

  
  // const { data:allManagers } = useManagers();
  

  



  const firstNameInputProps = {
    startAdornment: (
      <InputAdornment position="start">
        <ClickunapIcon name="person" />
      </InputAdornment>
    ),
  };


  const lastNameInputProps = {
    startAdornment: (
      <InputAdornment position="start">
        <ClickunapIcon name="person" />
      </InputAdornment>
    ),
  };


  const roleInputProps = {
    startAdornment: (
      <InputAdornment position="start">
        <ClickunapIcon name="shield_person" />
      </InputAdornment>
    ),
  };

  const emailInputProps = {
    startAdornment: (
      <InputAdornment position="start">
        <ClickunapIcon name="mail" />
      </InputAdornment>
    ),
  };

  



  useEffect(() => {
    
    // get the current manager from `allManagers`
    const currentManagerData = allManagers?.find((manager) => manager.userId === currentId);

    setCurrentManager(currentManagerData || {});

    console.log(`ManagersDialog::: currentId => ${currentId} and currentManagerData => `, currentManagerData);

  }, [ allManagers, currentId ]);


  

  const getRealDate = useCallback((locale = "fr") => {

    if (currentManager?.createdAt) {
      let date = new Date(currentManager.createdAt);
      return date.toLocaleDateString(locale) + " @ " + date.toLocaleTimeString(locale);
    }

    return "--";

  }, [ currentManager?.createdAt ]);




  return (
    <div className={clsx("DialogWrapper size-full")}>


      {/* View - Dialog */}
      <ClickunapDialog 
        name="ViewManagerDialog" 
        opened={opened && type === "view"} 
        locked={locked}
        onCloseButtonClick={onCloseButtonClick}
        onClose={onClose}
        onOpen={onOpen}>

        {/* Avatar */}
        <ClickunapAvatar id={currentManager?.avatarId ?? 'farmer'} size={30} className="!size-30 mt-5" />
        
        {/* Name & Email */}
        <div className={clsx("flex flex-col w-full h-auto p-4 justify-center items-center")}>
          <span className={clsx("font-bold text-lg capitalize")}>{currentManager?.firstname} {currentManager?.lastname}</span>
          <span className={clsx("text-sm opacity-50 lowercase")}>{currentManager?.email}</span>
        </div>


        {/* Details */}
        <ul className={clsx("flex flex-col w-full px-5 lg:px-10 pt-8 pb-2 lg:pb-4 space-y-1 overflow-y-auto", 
          "lg:space-y-3 text-lg lg:text-xl capitalize cursor-default")}>
          {/* Firstname */}
          <li className={clsx("flex flex-row space-x-2 justify-between group/item", 
            "lg:opacity-80 lg:dark:opacity-50 hover:opacity-100 transition-opacity")}>
            <span className={clsx("font-bold select-none")}>First Name:</span>
            <span className={clsx("opacity-50 group-hover/item:opacity-100 select-all")}>{currentManager?.firstname}</span>
          </li>

          {/* Lastname */}
          <li className={clsx("flex flex-row space-x-2 justify-between group/item", 
            "lg:opacity-80 lg:dark:opacity-50 hover:opacity-100 transition-opacity")}>
            <span className={clsx("font-bold select-none")}>Last Name:</span>
            <span className={clsx("opacity-50 group-hover/item:opacity-100 select-all")}>{currentManager?.lastname}</span>
          </li>

          {/* Email */}
          <li className={clsx("flex flex-row space-x-2 justify-between group/item", 
            "lg:opacity-80 lg:dark:opacity-50 hover:opacity-100 transition-opacity")}>
            <span className={clsx("font-bold select-none")}>Email:</span>
            <span className={clsx("opacity-50 lowercase group-hover/item:opacity-100 select-all")}>{currentManager?.email}</span>
          </li>


          {/* Role */}
          <li className={clsx("flex flex-row space-x-2 justify-between group/item", 
            "lg:opacity-80 lg:dark:opacity-50 hover:opacity-100 transition-opacity")}>
            <span className={clsx("font-bold select-none")}>Role:</span>
            <span className={clsx("opacity-50 group-hover/item:opacity-100 select-all capitalize")}>{currentManager?.role}🥉</span>
          </li>

          {/* UserId */}
          <li className={clsx("flex flex-row space-x-2 justify-between group/item", 
            "lg:opacity-80 lg:dark:opacity-50 hover:opacity-100 transition-opacity")}>
            <span className={clsx("font-bold select-none")}>User No.:</span>
            <span className={clsx("opacity-50 group-hover/item:opacity-100 select-all")}>{currentManager?.userId}</span>
          </li>

          {/* AvatarId */}
          <li className={clsx("flex flex-row space-x-2 justify-between group/item", 
            "lg:opacity-80 lg:dark:opacity-50 hover:opacity-100 transition-opacity")}>
            <span className={clsx("font-bold select-none")}>Avatar:</span>
            <span className={clsx("opacity-50 group-hover/item:opacity-100 select-all")}>{currentManager?.avatarId}</span>
          </li>


          {/* CreatedAt */}
          <li className={clsx("flex flex-row space-x-2 justify-between group/item", 
            "lg:opacity-80 lg:dark:opacity-50 hover:opacity-100 transition-opacity")}>
            <span className={clsx("font-bold select-none")}>Created At:</span>
            {/* <span className={clsx("opacity-50 group-hover/item:opacity-100 select-all")}>{currentManager?.createdAt ?? "--"}</span> */}
            <span className={clsx("opacity-50 group-hover/item:opacity-100 select-all")}>{getRealDate()}</span>
          </li>
        </ul>
        

        <div className={clsx("ButtonWrapper flex flex-col w-full h-auto px-5 lg:px-10 pt-4 pb-6 justify-center items-center")}>
          {/* Edit Manager Button */}
          <Button onClick={() => onEditButtonClick(currentManager?.userId)} 
            variant="contained" 
            color="primary" 
            className={clsx("w-full !rounded-full uppercase !text-md lg:!text-lg !py-2 !tracking-wider")}>
            Edit 
          </Button>

        </div>



      </ClickunapDialog>


      





















      {/* Edit - Dialog */}
      <ClickunapDialog 
        name="ViewManagerDialog" 
        opened={opened && type === "edit"} 
        locked={locked}
        onCloseButtonClick={onCloseButtonClick}
        onClose={onClose}
        onOpen={onOpen}>

        {/* Avatar */}
        <ClickunapAvatar id={currentManager?.avatarId ?? 'farmer'} size={30} className="!size-30 mt-5" />

        <Box 
          component="form"
          sx={{ '& .MuiTextField-root': { my: 1.5, mx: 0, width: '100%' } }}
          className="!p-4 lg:!px-6 !mt-8 flex flex-col w-full"
          onSubmit={handleUpdateFormSubmit}>

        {/* First Name - Input */}
        <TextField
          className="!w-full"
          id="firstname-input"
          required={true}
          type="text"
          label="First Name"
          value={currentManager?.firstname}
          placeholder="Votre prénom"
          InputProps={firstNameInputProps}
          // onChange={(event) => setFirstName(event.target.value)}
          //InputProps={{ startAdornment: <InputAdornment position="start">icon</InputAdornment> }}
        />

        {/* Last Name - Input */}
        <TextField
          className="w-full"
          id="lastname-input"
          required={true}
          type="text"
          label="Last Name"
          value={currentManager?.lastname}
          placeholder="Votre nom"
          InputProps={lastNameInputProps}
          // onChange={(event) => setLastName(event.target.value)}
          //InputProps={{ startAdornment: <InputAdornment position="start">icon</InputAdornment> }}
        />


        
        <FormControl fullWidth>
          <InputLabel id="role-select-label">Role</InputLabel>
          <Select
            labelId="role-select-label"
            id="role-select"
            value={"manager"}
            label="Role">
            <MenuItem value={"manager"}>Manager</MenuItem>
            <MenuItem value={"admin"}>Admin</MenuItem>
            </Select>
          </FormControl>
          


        {/* Email - Input */}
        <TextField
          className="!w-full"
          id="email-input"
          required={true}
          type="email"
          label="Email"
          value={currentManager?.email}
          placeholder="Votre email"
          autoComplete="email"
          InputProps={emailInputProps}
          // onChange={(event) => setEmail(event.target.value)}
          //InputProps={{ startAdornment: <InputAdornment position="start">icon</InputAdornment> }}
        />

      </Box>
  

        <div className={clsx("ButtonWrapper flex flex-col w-full h-auto px-5 lg:px-10 pt-4 pb-6 !space-y-3 lg:!space-y-4 justify-center items-center")}>
          {/* Update Manager Button */}
          <Button type="submit" 
            variant="contained" 
            color="primary" 
            className={clsx("w-full !rounded-full uppercase !text-md lg:!text-lg !py-2 !tracking-wider")}>
            Update 
          </Button>

          {/* Delete Manager Button */}
          <Button onClick={() => onDeleteButtonClick(currentManager?.userId)} 
            variant="contained" 
            color="error" 
            className={clsx("w-full !rounded-full uppercase !text-md lg:!text-lg !py-2 !tracking-wider")}>
            Delete 
          </Button>

        </div>

      </ClickunapDialog>


























      {/* Add - Dialog */}
      <ClickunapDialog 
        name="ViewManagerDialog" 
        opened={opened && type === "add"} 
        locked={locked}
        onCloseButtonClick={onCloseButtonClick}
        onClose={onClose}
        onOpen={onOpen}>

      </ClickunapDialog>





















      {/* Delete - Dialog */}
      <ClickunapDialog 
        name="ViewManagerDialog" 
        opened={opened && type === "delete"} 
        locked={locked}
        onCloseButtonClick={onCloseButtonClick}
        onClose={onClose}
        onOpen={onOpen}>

          {/* Avatar */}
          <ClickunapAvatar id={currentManager?.avatarId ?? 'farmer'} size={30} className="!size-30 mt-5" />
          
          {/* Name & Email */}
          <div className={clsx("flex flex-col w-full h-auto p-4 justify-center items-center")}>
            <span className={clsx("font-bold text-lg capitalize")}>{currentManager?.firstname} {currentManager?.lastname}</span>
            <span className={clsx("text-sm opacity-50 lowercase")}>{currentManager?.email}</span>
          </div>

        <p className={clsx("w-full h-auto p-4 text-center")}>
          Are you sure you want to delete this manager?
        </p>

        <div className={clsx("ButtonWrapper flex flex-col w-full h-auto px-5 lg:px-10 pt-4 pb-6 justify-center items-center")}>
          {/* Yes Delete Manager Button */}
          <Button
            variant="contained" 
            color="primary" 
            className={clsx("w-full !rounded-full uppercase !text-md lg:!text-lg !py-2 !tracking-wider")}>
            Yes, delete 
          </Button>
          <span className={clsx("w-full h-auto p-2 text-xs font-mono text-center opacity-50")}>This action cannot be undone.</span>

        </div>



      </ClickunapDialog>



























      {/* Search - Dialog */}
      <ClickunapDialog 
        name="SearchManagerDialog" 
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

     
    try{
  
      const response = await fetch ('https://clickunap-api.vercel.app/managers',{
        method: 'UPDATE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)

     });

     if (response.ok) {

      const data= await response.json();
      setHasUpdateError(false);
      console.log('manager updated successfully:', data);

     } else {

      setHasUpdateError(true);
      console.log('Failed to update the manager');

     }

    } catch (error){
      setHasUpdateError(true);
      console.error('Error:', error);
    }

  }
}
