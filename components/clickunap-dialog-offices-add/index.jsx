
import { useEffect, useState, useCallback } from "react";

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import ListItemText from '@mui/material/ListItemText';


import ClickunapDialog from "@/components/clickunap-dialog";
import ClickunapIcon from "@/components/clickunap-icon";


import clsx from "clsx";






export default function ClickunapDialogOfficesAdd({ opened, locked, onCloseButtonClick, onClose, onOpen }) {
  
  const [ isLoading, setLoading ] = useState(false);
  const [ selectedView, setSelectedView ] = useState(null);
  const [ currentTitle, setCurrentTitle ] = useState('');
  const [ currentSubtitle, setCurrentSubtitle ] = useState('');

  const [ newTerritoryId, setNewTerritoryId ] = useState('');
  const [ newTerritoryName, setNewTerritoryName ] = useState('');
  

  

  
  
  // create a list items array as `listItems`
  const listItems = [
    {
      id: 'add_office',
      title: 'New Office', 
      subtitle: 'Fill out the form below to create a new office', 
      icon: 'work_update', 
      value: 'Add an Office', 
      onClick: () => setSelectedView('add_office')
    },

    {
      id: 'create_complex', 
      title: 'New Complex', 
      subtitle: 'Fill out the form below to create a new complex', 
      icon: 'add_business',
      value: 'Create a Complex', 
      onClick: () => setSelectedView('create_complex')
    },

    {
      id: 'create_territory', 
      title: 'New Territory', 
      subtitle: 'Enter an id and name to create a new territory', 
      icon: 'add_location_alt', 
      value: 'Create a Territory',
      onClick: () => setSelectedView('create_territory')
    },

  ];


  const goBack = () => {
    setSelectedView(null);
  };



  useEffect(() => {

    // get the current title from `listItems`
    setCurrentTitle(listItems.find(({ id }) => id === selectedView)?.title);
    setCurrentSubtitle(listItems.find(({ id }) => id === selectedView)?.subtitle);

  }, [ selectedView, listItems ]);


  

  return (
    <ClickunapDialog 
      name="AddOfficeDialog" 
      opened={opened} 
      locked={locked}
      onCloseButtonClick={onCloseButtonClick}
      onReturnButtonClick={goBack}
      returnButtonHidden={selectedView === null}
      onClose={onClose}
      onOpen={onOpen}
      loading={isLoading}
      loadingColor="tertiary"
      title={currentTitle}
      subtitle={currentSubtitle}>
      
      
      {selectedView === null && (
        <List 
          sx={{ width: '100%', mt: 10}}
          component="nav">

          {listItems.map(({id, icon, value, onClick}) => (
            <ListItemButton key={id} title={value} onClick={onClick}>
              <ListItemIcon><ClickunapIcon name={icon} /></ListItemIcon>

              <span className="flex flex-1 text-base lg:text-lg">{value}</span>

              <ClickunapIcon name="chevron_right" className="ml-4 opacity-50" />

            </ListItemButton>
          ))}

        </List>
      )}


      {selectedView === "create_territory" && (
        <div className="flex flex-col w-full h-auto">
          <Box 
            component="form"
            sx={{ '& .MuiTextField-root': { my: 1.5, mx: 0, width: '100%' } }}
            className="!p-4 lg:!px-6 flex flex-col w-full"
            onSubmit={handleTerritoryCreateFormSubmit}>

            {/* Id - Territory - Input */}
            <TextField
              className="!w-full"
              id="name_id"
              required={true}
              type="text"
              label="Id"
              value={newTerritoryId}
              placeholder="territory1"
              // InputProps={territoryIdInputProps}
              onChange={(event) => setNewTerritoryId(event.target.value)}
              //InputProps={{ startAdornment: <InputAdornment position="start">icon</InputAdornment> }}
            />

            {/* Name - Territory - Input */}
            <TextField
              className="w-full"
              id="name"
              required={true}
              type="text"
              label="Name"
              value={newTerritoryName}
              placeholder="Territory 01"
              // InputProps={territoryNameInputProps}
              onChange={(event) => setNewTerritoryName(event.target.value)}
              //InputProps={{ startAdornment: <InputAdornment position="start">icon</InputAdornment> }}
            />

          </Box>


          <div className={clsx("ButtonWrapper flex flex-col w-full h-auto px-5 lg:px-10 pt-4 pb-6 justify-center items-center")}>
            <Button
              variant="contained" 
              color="primary" 
              onClick={() => setLoading(true)}
              className={clsx("w-full !rounded-full uppercase !text-md lg:!text-lg !py-2 !tracking-wider")}>
              create territory
            </Button>
          </div>

        </div>
      )}


      </ClickunapDialog>

  );



  async function handleTerritoryCreateFormSubmit(event) {

    event.preventDefault();

    // create form data 
    const formData = new FormData(event.currentTarget);

    // tell me about it ;)
    console.log(`\x1b[30m[handleTerritoryCreateFormSubmit]\x1b[0m: formData => `, formData);

    // territory.create({id: newTerritoryId, name: newTerritoryName});

  }


}
