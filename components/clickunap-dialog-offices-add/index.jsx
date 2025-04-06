
import { useEffect, useState, useCallback, useMemo, useRef } from "react";

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import ListItemText from '@mui/material/ListItemText';


import ClickunapDialog from "@/components/clickunap-dialog";
import ClickunapIcon from "@/components/clickunap-icon";

import useTerritories from "@/hooks/useTerritories";


import clsx from "clsx";






export default function ClickunapDialogOfficesAdd({ opened, locked, onCloseButtonClick, onClose, onOpen }) {
  
  const [ isLoading, setLoading ] = useState(false);
  const [ selectedView, setSelectedView ] = useState(null);
  const [ currentTitle, setCurrentTitle ] = useState('');
  const [ currentSubtitle, setCurrentSubtitle ] = useState('');

  const [ newTerritoryId, setNewTerritoryId ] = useState('');
  const [ newTerritoryName, setNewTerritoryName ] = useState('');

  const [ hasNewTerritoryIdError, setHasNewTerritoryIdError ] = useState(false);
  const [ hasNewTerritoryNameError, setHasNewTerritoryNameError ] = useState(false);

  const [ newTerritoryIdErrorMessage, setNewTerritoryIdErrorMessage ] = useState('');
  const [ newTerritoryNameErrorMessage, setNewTerritoryNameErrorMessage ] = useState('');
  
  

  const territories = useTerritories();
  
  
  const dialogRef = useRef(null);

  
  
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

  



  // memoize the territoryId update
  const memoizedTerritoryIdUpdate = useMemo(() => {
    return () => {

      // Do nothing if there's no `newTerritoryId`
      if (!newTerritoryId.length) {
        return;
      }


      // reset the error state
      setHasNewTerritoryIdError(false);
      setNewTerritoryIdErrorMessage('');


      // Now, try to find the territory with the given `territoryId`/nameId
      territories.search({ nameId: newTerritoryId })
      .then(({ found, data, count }) => {
        if (found) {
          setHasNewTerritoryIdError(true);
          setNewTerritoryIdErrorMessage('This territory ID already exists');
        } else {
          setHasNewTerritoryIdError(false);
          setNewTerritoryIdErrorMessage('');
        }

        // tell me about it ;)
        console.log(`\x1b[34m[memoizedTerritoryIdUpdate]\x1b[0m: found => ${found} & count => ${count} & data => `, data);

      })
      .catch((error) => {
        setHasNewTerritoryIdError(true);
        setNewTerritoryIdErrorMessage(error.message);
      });

    }
    
  }, [ newTerritoryId ]);



  // use effect to call the `memoizedTerritoryIdUpdate` function
  useEffect(() => {
    memoizedTerritoryIdUpdate();
  }, [ memoizedTerritoryIdUpdate ]);















    
  /**
   * Method used to create a new territory
   */
  const createTerritory = useCallback(() => {
    return new Promise((resolve, reject) => {
      
     // Do nothing if there's no `newTerritoryId` or `newTerritoryName`
     if (!newTerritoryId.length || !newTerritoryName.length) {
      return reject({message: 'Please provide a territory ID and name'});
    }

    // reset the error state
    setHasNewTerritoryIdError(false);
    setHasNewTerritoryNameError(false);
    setNewTerritoryIdErrorMessage('');
    setNewTerritoryNameErrorMessage('');

    // set the `isLoading` state to `true`
    setLoading(true);

    territories.create({ nameId: newTerritoryId, name: newTerritoryName })
    .then((response) => {
      
      // set the `isLoading` state to `false`
      setLoading(false);

      // if there's no error (i.e. territory has been created successfully)
      // else reject with the error
      (!response.error) ? resolve(response.data[0]) : reject(response.error);
      
    })
    .catch((error) => {
      setHasNewTerritoryIdError(true);
      setHasNewTerritoryNameError(true);
      setNewTerritoryIdErrorMessage(error.message);
      setNewTerritoryNameErrorMessage(error.message);

      console.error(`\x1b[34m[createTerritory]\x1b[0m: error => `, error);

      // set the `isLoading` state to `false`
      setLoading(false);
    });

  });



  }, [ newTerritoryId, newTerritoryName ]);










  

  return (
    <ClickunapDialog 
      ref={dialogRef}
      name="AddOfficeDialog" 
      contentClassName={clsx({"!h-[270px]": selectedView === null, "!h-[380px]": selectedView === "create_territory"})}
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
              disabled={isLoading}
              type="text"
              label="Id"
              value={newTerritoryId}
              placeholder="territory1"
              // InputProps={territoryIdInputProps}
              error={hasNewTerritoryIdError}
              helperText={newTerritoryIdErrorMessage}
              onChange={(event) => setNewTerritoryId(event.target.value)}
              //InputProps={{ startAdornment: <InputAdornment position="start">icon</InputAdornment> }}
            />

            {/* Name - Territory - Input */}
            <TextField
              className="w-full"
              id="name"
              required={true}
              disabled={isLoading}
              type="text"
              label="Name"
              value={newTerritoryName}
              placeholder="Territory 01"
              // InputProps={territoryNameInputProps}
              error={hasNewTerritoryNameError}
              helperText={newTerritoryNameErrorMessage}
              onChange={(event) => setNewTerritoryName(event.target.value)}
              //InputProps={{ startAdornment: <InputAdornment position="start">icon</InputAdornment> }}
            />

            <div className={clsx("ButtonWrapper flex flex-col w-full h-auto px-5 lg:px-10 pt-4 pb-6 justify-center items-center")}>
              <Button
                type="submit"
                variant="contained" 
                color="primary" 
                // onClick={() => createTerritory()}
                disabled={isLoading || hasNewTerritoryIdError || !newTerritoryId.length || !newTerritoryName.length }
                className={clsx("w-full !rounded-full uppercase !text-md lg:!text-lg !py-2 !tracking-wider")}>
                create territory
              </Button>
            </div>

          </Box>


        </div>
      )}





      </ClickunapDialog>

  );








  function handleTerritoryCreateFormSubmit(event) {

    event.preventDefault();

    // create the territory
    createTerritory().then((data) => {
      
      // reset the form
      resetTerritoryForm();
      
      // go back
      goBack();

      // show snackbar
      dialogRef.current.showSnackbar({ type: "success", message: `New territory created: ${data.name}` });

      // tell me about it ;)
      console.log(`\x1b[30m[handleTerritoryCreateFormSubmit]\x1b[0m: data => `, data);
    })


    // tell me about it ;)
    console.log(`\x1b[32m[handleTerritoryCreateFormSubmit]\x1b[0m: event => `, event);


  }



  /**
   * Reset the `territoryId` and `territoryName` values 
   * NOTE: This method also resets the `territoryIdError`, `territoryNameError` values 
   *        and their corresponding messages
   */
  function resetTerritoryForm() {
    setNewTerritoryId("");
    setNewTerritoryName("");

    setHasNewTerritoryIdError(false);
    setHasNewTerritoryNameError(false);

    setNewTerritoryIdErrorMessage("");
    setNewTerritoryNameErrorMessage("");
  }


}
