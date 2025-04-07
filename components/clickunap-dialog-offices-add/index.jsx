
import { useEffect, useState, useCallback, useMemo, useRef } from "react";

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
// import ListItemText from '@mui/material/ListItemText';


import ClickunapDialog from "@/components/clickunap-dialog";
import ClickunapIcon from "@/components/clickunap-icon";

import useTerritories from "@/hooks/useTerritories";
import useComplexes from "@/hooks/useComplexes";


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


  const [ newComplexId, setNewComplexId ] = useState('');
  const [ newComplexName, setNewComplexName ] = useState('');
  const [ newComplexTerritoryId, setNewComplexTerritoryId ] = useState(0);
  const [ newComplexTerritoryNameId, setNewComplexTerritoryNameId ] = useState('');
  const [ newComplexDirectorName, setNewComplexDirectorName ] = useState('');

  const [ hasNewComplexIdError, setHasNewComplexIdError ] = useState(false);
  const [ hasNewComplexNameError, setHasNewComplexNameError ] = useState(false);
  const [ hasNewComplexTerritoryIdError, setHasNewComplexTerritoryIdError ] = useState(false);
  const [ hasNewComplexDirectorNameError, setHasNewComplexDirectorNameError ] = useState(false);

  const [ newComplexIdErrorMessage, setNewComplexIdErrorMessage ] = useState('');
  const [ newComplexNameErrorMessage, setNewComplexNameErrorMessage ] = useState('');
  const [ newComplexTerritoryIdErrorMessage, setNewComplexTerritoryIdErrorMessage ] = useState('');
  const [ newComplexDirectorNameErrorMessage, setNewComplexDirectorNameErrorMessage ] = useState('');
  
  

  const territories = useTerritories(0, 1000);
  const complexes = useComplexes(0, 1000);
  
  
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










  // memoize the complexId update
  const memoizedComplexIdUpdate = useMemo(() => {
    return () => {

      // Do nothing if there's no `newComplexId`
      if (!newComplexId.length) {
        return;
      }


      // reset the error state
      setHasNewComplexIdError(false);
      setNewComplexIdErrorMessage('');


      // Now, try to find the complex with the given `complexId`/nameId
      complexes.search({ nameId: newComplexId })
      .then(({ found, data, count }) => {
        if (found) {
          setHasNewComplexIdError(true);
          setNewComplexIdErrorMessage('This complex ID already exists');
        } else {
          setHasNewComplexIdError(false);
          setNewComplexIdErrorMessage('');
        }

        // tell me about it ;)
        console.log(`\x1b[34m[memoizedComplexIdUpdate]\x1b[0m: found => ${found} & count => ${count} & data => `, data);

      })
      .catch((error) => {
        setHasNewComplexIdError(true);
        setNewComplexIdErrorMessage(error.message);
      });

    }
    
  }, [ newComplexId ]);



  // use effect to call the `memoizedComplexIdUpdate` function
  useEffect(() => {
    memoizedComplexIdUpdate();
  }, [ memoizedComplexIdUpdate ]);












    
  /**
   * Method used to create a newcomplex 
   */
  const createComplex = useCallback(() => {
    return new Promise((resolve, reject) => {
      
     // Do nothing if there's no `territoryId`, `newComplexId` or `newComplexName`
     if (!newComplexTerritoryId || !newComplexId.length || !newComplexName.length) {
      return reject({message: 'Please provide a territory ID, complex ID and name (at least)'});
    }

    // reset the error state
    setHasNewComplexIdError(false);
    setHasNewComplexNameError(false);
    setHasNewComplexTerritoryIdError(false);
    setHasNewComplexDirectorNameError(false);

    setNewComplexIdErrorMessage('');
    setNewComplexNameErrorMessage('');
    setNewComplexTerritoryIdErrorMessage('');
    setNewComplexDirectorNameErrorMessage('');

    // set the `isLoading` state to `true`
    setLoading(true);

    complexes.create({ 
      territoryId: newComplexTerritoryId, 
      nameId: newComplexId, 
      name: newComplexName,
      directorName: newComplexDirectorName,
    })
    .then((response) => {
      
      // set the `isLoading` state to `false`
      setLoading(false);

      // if there's no error (i.e. complex has been created successfully)
      // else reject with the error
      (!response.error) ? resolve(response.data) : reject(response.error);
      
    })
    .catch((error) => {
      setHasNewComplexIdError(true);
      setHasNewComplexNameError(true);
      setHasNewComplexTerritoryIdError(true);
      setHasNewComplexDirectorNameError(true);

      setNewComplexIdErrorMessage(error.message);
      setNewComplexNameErrorMessage(error.message);
      setNewComplexTerritoryIdErrorMessage(error.message);
      setNewComplexDirectorNameErrorMessage(error.message);

      console.error(`\x1b[34m[createComplex]\x1b[0m: error => `, error);

      // set the `isLoading` state to `false`
      setLoading(false);
    });

  });



  }, [ newComplexTerritoryId, newComplexId, newComplexName, newComplexDirectorName ]);













    
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
      (!response.error) ? resolve(response.data) : reject(response.error);
      
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
      contentClassName={clsx({
        "!h-[270px]": selectedView === null, 
        "!h-[380px]": selectedView === "create_territory",
        "!h-[510px]": selectedView === "create_complex"
      })}
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



      {selectedView === "create_complex" && (
        <div className="flex flex-col w-full h-auto">
          <Box 
            component="form"
            sx={{ '& .MuiTextField-root': { my: 1.5, mx: 0, width: '100%' } }}
            className="!p-4 lg:!px-6 flex flex-col w-full"
            onSubmit={handleComplexCreateFormSubmit}>

            <FormControl fullWidth required>
              <InputLabel id="territory_label">Territory</InputLabel>
              <Select
                labelId="territory_label"
                id="territory_id"
                value={newComplexTerritoryNameId}
                disabled={isLoading}
                label="Territory"
                placeholder="Select a territory" 
                onChange={handleNewComplexTerritoryChange}>

                {territories.data.map((territory) => (
                  <MenuItem key={territory.nameId} value={territory.nameId} className="capitalize">{territory.name}</MenuItem>
                ))}

              </Select>
            </FormControl>

          
            {/* Id - Complex - Input */}
            <TextField
              className="!w-full !lowercase"
              id="name_id"
              required={true}
              disabled={isLoading}
              type="text"
              label="Id"
              value={newComplexId}
              placeholder={`complex${complexes.total + 1}`}
              // InputProps={territoryIdInputProps}
              error={hasNewComplexIdError}
              helperText={newComplexIdErrorMessage}
              onChange={(event) => setNewComplexId(event.target.value)}
              //InputProps={{ startAdornment: <InputAdornment position="start">icon</InputAdornment> }}
            />

            {/*  Name - Complex - Input */}
            <TextField
              className="w-full"
              id="name"
              required={true}
              disabled={isLoading}
              type="text"
              label="Name"
              value={newComplexName}
              placeholder={`Complex 0${complexes.total + 1}`}
              // InputProps={territoryNameInputProps}
              error={hasNewComplexNameError}
              helperText={newComplexNameErrorMessage}
              onChange={(event) => setNewComplexName(event.target.value)}
              //InputProps={{ startAdornment: <InputAdornment position="start">icon</InputAdornment> }}
            />
          

            {/* DirectorName - Complex - Input */}
            <TextField
              className="w-full"
              id="director_name"
              required={true}
              disabled={isLoading}
              type="text"
              label="Director Name"
              value={newComplexDirectorName}
              placeholder={`Jean-Yves LEFRANC`}
              // InputProps={territoryNameInputProps}
              error={hasNewComplexDirectorNameError}
              helperText={newComplexDirectorNameErrorMessage}
              onChange={(event) => setNewComplexDirectorName(event.target.value)}
              //InputProps={{ startAdornment: <InputAdornment position="start">icon</InputAdornment> }}
            />

            <div className={clsx("ButtonWrapper flex flex-col w-full h-auto px-5 lg:px-10 pt-4 pb-6 justify-center items-center")}>
              <Button
                type="submit"
                variant="contained" 
                color="primary" 
                // onClick={() => createTerritory()}
                disabled={isLoading || !newComplexTerritoryNameId.length || hasNewComplexIdError || !newComplexId.length || !newComplexName.length || !newComplexDirectorName.length }
                className={clsx("w-full !rounded-full uppercase !text-md lg:!text-lg !py-2 !tracking-wider")}>
                create complex
              </Button>
            </div>

          </Box>


        </div>
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
              className="!w-full !lowercase"
              id="name_id"
              required={true}
              disabled={isLoading}
              type="text"
              label="Id"
              value={newTerritoryId}
              placeholder={`territory${territories.total + 1}`}
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
              placeholder={`Territory 0${territories.total + 1}`}
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


  




  /**
   * Handler that is called whenever the new complex territory changes
   */
  function handleNewComplexTerritoryChange(event) {
    // get the selecte element
    const selectEl = event.target;

    // get the current complex territory nameId and Id as `territoryNameId` and `territoryId`
    const territoryId = territories.data.find((territory) => territory.nameId === selectEl.value).id;
    const territoryNameId = selectEl.value;

    // update the `newComplexTerritoryNameId` and `newComplexTerritoryId`
    setNewComplexTerritoryNameId(territoryNameId);
    setNewComplexTerritoryId(territoryId);

    
    // tell me about it ;)
    console.log(`\x1b[33m[handleNewComplexTerritoryChange]\x1b[0m: territoryId => ${territoryId} & territoryNameId => ${territoryNameId}, `, territories.data);
  }










  function handleComplexCreateFormSubmit(event) {

    event.preventDefault();

    // create thecomplex 
    createComplex().then((data) => {
      
      // reset the form
      resetComplexForm();
      
      // go back
      goBack();

      // show snackbar
      dialogRef.current.showSnackbar({ type: "success", message: `New complex created: ${data.name.toUpperCase()}` });

      // reload the complexes
      complexes.reload();

      // tell me about it ;)
      console.log(`\x1b[30m[handleComplexCreateFormSubmit]\x1b[0m: data => `, data);
    })


    // tell me about it ;)
    console.log(`\x1b[32m[handleComplexCreateFormSubmit]\x1b[0m: event => `, event);


  }




  function handleTerritoryCreateFormSubmit(event) {

    event.preventDefault();

    // create the territory
    createTerritory().then((data) => {
      
      // reset the form
      resetTerritoryForm();
      
      // go back
      goBack();

      // show snackbar
      dialogRef.current.showSnackbar({ type: "success", message: `New territory created: ${data.name.toUpperCase()}` });

      // reload the territories
      territories.reload();

      // tell me about it ;)
      console.log(`\x1b[30m[handleTerritoryCreateFormSubmit]\x1b[0m: data => `, data);
    })


    // tell me about it ;)
    console.log(`\x1b[32m[handleTerritoryCreateFormSubmit]\x1b[0m: event => `, event);


  }

  











  /**
   * Reset the `complexId` and `complexName` values 
   * NOTE: This method also resets the `complexIdError`, `complexNameError` values 
   *        and their corresponding messages
   */
  function resetComplexForm() {
    setNewComplexId("");
    setNewComplexName("");
    setNewComplexTerritoryId("");
    setNewComplexTerritoryNameId("");
    setNewComplexDirectorName("");

    setHasNewComplexIdError(false);
    setHasNewComplexNameError(false);
    setHasNewComplexTerritoryIdError(false);
    setHasNewComplexDirectorNameError(false);

    setNewComplexIdErrorMessage("");
    setNewComplexNameErrorMessage("");
    setNewComplexTerritoryIdErrorMessage("");
    setNewComplexDirectorNameErrorMessage("");


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
