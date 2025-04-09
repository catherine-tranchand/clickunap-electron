
import { useEffect, useState, useCallback, useMemo, useRef } from "react";

import { useTheme } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
// import ListItemText from '@mui/material/ListItemText';


import ClickunapDialog from "@/components/clickunap-dialog";
import ClickunapIcon from "@/components/clickunap-icon";

import useTerritories from "@/hooks/useTerritories";
import useComplexes from "@/hooks/useComplexes";


import clsx from "clsx";






export default function ClickunapDialogOfficesAdd({ opened, locked, onCloseButtonClick, onClose, onOpen, offices }) {
  
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
  const [ hasNewComplexTerritoryError, setHasNewComplexTerritoryError ] = useState(false);
  const [ hasNewComplexDirectorNameError, setHasNewComplexDirectorNameError ] = useState(false);

  const [ newComplexIdErrorMessage, setNewComplexIdErrorMessage ] = useState('');
  const [ newComplexNameErrorMessage, setNewComplexNameErrorMessage ] = useState('');
  const [ newComplexTerritoryErrorMessage, setNewComplexTerritoryErrorMessage ] = useState('');
  const [ newComplexDirectorNameErrorMessage, setNewComplexDirectorNameErrorMessage ] = useState('');
  
 

  
  const [ newOfficeTerritoryId, setNewOfficeTerritoryId ] = useState(0);
  const [ newOfficeTerritoryNameId, setNewOfficeTerritoryNameId ] = useState('');
  const [ newOfficeComplexId, setNewOfficeComplexId ] = useState(0);
  const [ newOfficeComplexNameId, setNewOfficeComplexNameId ] = useState('');
  const [ newOfficeAddress, setNewOfficeAddress ] = useState('');
  const [ newOfficeNames, setNewOfficeNames ] = useState([]);
  const [ newOfficeEmails, setNewOfficeEmails ] = useState([]);
  const [ newOfficePhonenumbers, setNewOfficePhonenumbers ] = useState([]);

  const [ hasNewOfficeTerritoryError, setHasNewOfficeTerritoryError ] = useState(false);
  const [ hasNewOfficeComplexError, setHasNewOfficeComplexError ] = useState(false);
  const [ hasNewOfficeAddressError, setHasNewOfficeAddressError ] = useState(false);
  const [ hasNewOfficeNamesError, setHasNewOfficeNamesError ] = useState(false);
  const [ hasNewOfficeEmailsError, setHasNewOfficeEmailsError ] = useState(false);
  const [ hasNewOfficePhonenumbersError, setHasNewOfficePhonenumbersError ] = useState(false);
   

  const [ newOfficeTerritoryErrorMessage, setNewOfficeTerritoryErrorMessage ] = useState('');
  const [ newOfficeComplexErrorMessage, setNewOfficeComplexErrorMessage ] = useState('');
  const [ newOfficeAddressErrorMessage, setNewOfficeAddressErrorMessage ] = useState('');
  const [ newOfficeNamesErrorMessage, setNewOfficeNamesErrorMessage ] = useState('');
  const [ newOfficeEmailsErrorMessage, setNewOfficeEmailsErrorMessage ] = useState('');
  const [ newOfficePhonenumbersErrorMessage, setNewOfficePhonenumbersErrorMessage ] = useState('');

  
  const [ currentComplexes, setCurrentComplexes ] = useState([]);


  




  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';



  const territories = useTerritories(0, 1000);
  const complexes = useComplexes(0, 1000);
  
  
  const dialogRef = useRef(null);

  const newOfficeTerritoryInputRef = useRef(null);
  const newOfficeComplexInputRef = useRef(null);

  
  
  // create a list items array as `listItems`
  const listItems = [
    {
      id: 'create_office',
      title: 'New Office', 
      subtitle: 'Fill out the form below to create a new office', 
      icon: 'work_update',
      icon2: 'work',
      value: 'Add an Office', 
      onClick: () => setSelectedView('create_office')
    },

    {
      id: 'create_complex', 
      title: 'New Complex', 
      subtitle: 'Fill out the form below to create a new complex', 
      icon: 'add_business',
      icon2: 'business',
      value: 'Create a Complex', 
      onClick: () => setSelectedView('create_complex')
    },

    {
      id: 'create_territory', 
      title: 'New Territory', 
      subtitle: 'Enter an id and name to create a new territory', 
      icon: 'add_location_alt', 
      icon2: 'location_on',
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

  

  
  // memoize the `currentComplexes` update
  const memoizedCurrentComplexesUpdate = useMemo(() => {

    return () => {

      // Do nothing if there's no `newOfficeTerritoryId`
      if (!newOfficeTerritoryId) {
        // set the `currentComplexes` using the first item in `territories.data`
        setCurrentComplexes(complexes.data.filter(({ territoryId}) => territoryId === territories.data[0]?.id));
        return;
      }
      

      // reset the error state of `newOfficeComplex`
      setHasNewOfficeComplexError(false);
      setNewOfficeComplexErrorMessage('');


      // update the `currentComplexes` based on the `newOfficeTerritoryId`
      setCurrentComplexes(complexes.data.filter(({ territoryId }) => territoryId === newOfficeTerritoryId));


    }

  }, [ newOfficeTerritoryId, complexes.data, territories.data ]);



  
  // use effect to call the `memoizedCurrentComplexesUpdate` function
  useEffect(() => {
    memoizedCurrentComplexesUpdate();
  }, [ memoizedCurrentComplexesUpdate ]);


  








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
      territories.search({ nameId: newTerritoryId.trim().toLowerCase() })
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
      complexes.search({ nameId: newComplexId.trim().toLowerCase() })
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








  
  const getDefaultComplexTerritoryId = useCallback(() => {
    return territories.data?.length ? territories.data[0].id : 0;
  }, [ territories.data ]);


  
  const getDefaultComplexTerritoryNameId = useCallback(() => {
    return territories.data?.length ? territories.data[0].nameId : '';
  }, [ territories.data ]);
  



  
  const getDefaultCurrentComplexId = useCallback(() => {
    return currentComplexes.length ? currentComplexes[0].id : 0;
  }, [ currentComplexes ]);


  
  const getDefaultCurrentComplexNameId = useCallback(() => {
    return currentComplexes.length ? currentComplexes[0].nameId : '';
  }, [ currentComplexes ]);

  

  
!!newComplexTerritoryNameId.length ? newComplexTerritoryNameId : getDefaultComplexTerritoryNameId()

  const memoizedInitialOfficeTerritories = useMemo(() => {

    return () => {
      
      setNewOfficeTerritoryId((currentTerritoryId) => {
        return (currentTerritoryId) ? currentTerritoryId : getDefaultTerritoryId();

      });
      

      setNewOfficeTerritoryNameId((currentTerritoryNameId) => {
        return (currentTerritoryNameId) ? currentTerritoryNameId : getDefaultTerritoryNameId();

      });

      
      setNewComplexTerritoryId((currentTerritoryId) => {
        return (currentTerritoryId) ? currentTerritoryId : getDefaultTerritoryId();

      });
      

      setNewComplexTerritoryNameId((currentTerritoryNameId) => {
        return (currentTerritoryNameId) ? currentTerritoryNameId : getDefaultTerritoryNameId();
      });


      function getDefaultTerritoryId() {
        return territories.data?.length ? territories.data[0].id : 0;
      }


      function getDefaultTerritoryNameId() {
        return territories.data?.length ? territories.data[0].nameId : '';
      }


    };

  }, [ territories.data ]);

  


  // use effect to call the `memoizedInitialOfficeTerritories` function
  useEffect(() => {
    memoizedInitialOfficeTerritories();
  }, [ memoizedInitialOfficeTerritories ]);







  const memoizedInitialOfficeComplexes = useMemo(() => {

    return () => {
      
      setNewOfficeComplexId((currentComplexId) => {
        // do nothing if there's already a `currentComplexId`
        return (currentComplexId) ? currentComplexId : getDefaultComplexId();

      });
      

      setNewOfficeComplexNameId((currentComplexNameId) => {
        // do nothing if there's already a `currentComplexNameId`
        return (currentComplexNameId) ? currentComplexNameId : getDefaultComplexNameId();

      });


      function getDefaultComplexId() {
        return currentComplexes?.length ? currentComplexes[0].id : 0;
      }


      function getDefaultComplexNameId() {
        return currentComplexes?.length ? currentComplexes[0].nameId : '';
      }


    };

  }, [ currentComplexes ]);

  


  // use effect to call the `memoizedInitialOfficeComplexes` function
  useEffect(() => {
    memoizedInitialOfficeComplexes();
  }, [ memoizedInitialOfficeComplexes ]);













  
  /**
   * Method used to create a new office
   */
  const createOffice = useCallback(() => {
    return new Promise((resolve, reject) => {

      // tell me about it ;)
      console.log(`\x1b[34m[createOffice]\x1b[0m: \
        newOfficeTerritoryId => ${newOfficeTerritoryId};
        newOfficeTerritoryNameId => ${newOfficeTerritoryNameId};

        newOfficeComplexId => ${newOfficeComplexId};
        newOfficeComplexNameId => ${newOfficeComplexNameId};

        newOfficeAddress => ${newOfficeAddress};
        newOfficeNames => ${newOfficeNames.join(',')};
        newOfficeEmails => ${newOfficeEmails.join(',')};
        newOfficePhonenumbers => ${newOfficePhonenumbers.join(',')};

      `);

      
      // Do nothing if there are no `newOfficeTerritoryId`, `newOfficeComplexId`
      if (!newOfficeTerritoryId || !newOfficeComplexId || !newOfficeAddress.length) {
        return reject({message: 'Please provide at least a territory ID, complex ID, and address'});

      }

      
      // reset the error state
      setHasNewOfficeTerritoryError(false);
      setHasNewOfficeComplexError(false);
      setHasNewOfficeAddressError(false);
      setHasNewOfficeNamesError(false);
      setHasNewOfficeEmailsError(false);
      setHasNewOfficePhonenumbersError(false);

      setNewOfficeTerritoryErrorMessage('');
      setNewOfficeComplexErrorMessage('');
      setNewOfficeAddressErrorMessage('');
      setNewOfficeNamesErrorMessage('');
      setNewOfficeEmailsErrorMessage('');
      setNewOfficePhonenumbersErrorMessage('');

      // set the `isLoading` state to `true` to show the loading indicator
      setLoading(true);


      
      offices.create({
        territoryId: newOfficeTerritoryId,
        complexId: newOfficeComplexId,
        address: newOfficeAddress,
        names: !containsOnlyCommas(newOfficeNames.join(',')) ? newOfficeNames : [],
        emails: !containsOnlyCommas(newOfficeEmails.join(',')) ? newOfficeEmails : [],
        phonenumbers: !containsOnlyCommas(newOfficePhonenumbers.join(',')) ? newOfficePhonenumbers : [],
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {

        setHasNewOfficeTerritoryError(true);
        setHasNewOfficeComplexError(true);
        setHasNewOfficeAddressError(true);
        setHasNewOfficeNamesError(true);
        setHasNewOfficeEmailsError(true);
        setHasNewOfficePhonenumbersError(true);

        setNewOfficeTerritoryErrorMessage(error.message);
        setNewOfficeComplexErrorMessage(error.message);
        setNewOfficeAddressErrorMessage(error.message);
        setNewOfficeNamesErrorMessage(error.message);
        setNewOfficeEmailsErrorMessage(error.message);
        setNewOfficePhonenumbersErrorMessage(error.message);

        reject(error);
      })
      .finally(() => {
        setLoading(false);
      });


    })

  }, [ newOfficeTerritoryId, newOfficeComplexId, newOfficeAddress, newOfficeNames, newOfficeEmails, newOfficePhonenumbers ]);



    
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
    setHasNewComplexTerritoryError(false);
    setHasNewComplexDirectorNameError(false);

    setNewComplexIdErrorMessage('');
    setNewComplexNameErrorMessage('');
    setNewComplexTerritoryErrorMessage('');
    setNewComplexDirectorNameErrorMessage('');

    // set the `isLoading` state to `true`
    setLoading(true);

    complexes.create({ 
      territoryId: newComplexTerritoryId ?? getDefaultTerritoryId(), 
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
      setHasNewComplexTerritoryError(true);
      setHasNewComplexDirectorNameError(true);

      setNewComplexIdErrorMessage(error.message);
      setNewComplexNameErrorMessage(error.message);
      setNewComplexTerritoryErrorMessage(error.message);
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





  
  /**
   * Adds a new office name using the given `index` and `value`
   */
  const addNewOfficeName = useCallback((index, value) => {
    setNewOfficeNames(() => newOfficeNames.map((_, i) => i === index ? value : _));
  }, [ newOfficeNames ]);

  
  /**
   * Removes the office name using the given `index`
   */
  const removeOfficeName = useCallback((index) => {
    setNewOfficeNames(() => newOfficeNames.filter((_, i) => i !== index));
  }, [ newOfficeNames ]);




  
  /**
   * Adds a new office phonenumber using the given `index` and `value`
   */
  const addNewOfficePhonenumber = useCallback((index, value) => {
    setNewOfficePhonenumbers(() => newOfficePhonenumbers.map((_, i) => i === index ? value : _));
  }, [ newOfficePhonenumbers ]);

  
  /**
   * Removes the office phonenumber using the given `index`
   */
  const removeOfficePhonenumber = useCallback((index) => {
    setNewOfficePhonenumbers(() => newOfficePhonenumbers.filter((_, i) => i !== index));
  }, [ newOfficePhonenumbers ]);



  
  /**
   * Adds a new office email using the given `index` and `value`
   */
  const addNewOfficeEmail = useCallback((index, value) => {
    setNewOfficeEmails(() => newOfficeEmails.map((_, i) => i === index ? value : _));
  }, [ newOfficeEmails ]);

  
  /**
   * Removes the office email using the given `index`
   */
  const removeOfficeEmail = useCallback((index) => {
    setNewOfficeEmails(() => newOfficeEmails.filter((_, i) => i !== index));
  }, [ newOfficeEmails ]);




  
  const getAddOfficeBtnDisabled = useCallback(() => {
    

    return (
      isLoading || 
      hasNewOfficeTerritoryError || 
      hasNewOfficeComplexError || 
      newOfficeAddress.length === 0 ||
      newOfficeTerritoryId === 0 ||
      newOfficeComplexId === 0
    );

  }, [
    isLoading, 
    hasNewOfficeTerritoryError, 
    hasNewOfficeComplexError, 
    newOfficeAddress, 
    newOfficeTerritoryId,
    newOfficeComplexId,
  ]);











  
  /**====== Slot Props - Adornments =====**/

  const territoriesInputSlotProps = {
    input: {
      startAdornment: <InputAdornment position="start">
        <ClickunapIcon name={listItems.find((item) => item.id === "create_territory")?.icon2} />
      </InputAdornment>,
    }
  }



  const complexesInputSlotProps = {
    input: {
      startAdornment: <InputAdornment position="start">
        <ClickunapIcon name={listItems.find((item) => item.id === "create_complex")?.icon2} />
      </InputAdornment>,
    }
  }

  

  const getNamesInputSlotProps = (inputIndex) => {
    return { input: {
      endAdornment: <InputAdornment position="end">
        <IconButton 
          title="Remove this name" 
          className="hover:!text-[#ff0000] opacity-50 dark:opacity-30 hover:opacity-100 transition-opacity"
          onClick={ () => removeOfficeName(inputIndex)}>
          
          <ClickunapIcon name="delete" />

        </IconButton>
      </InputAdornment>,
    } };
  }


 

  const getPhonenumbersInputSlotProps = (inputIndex) => {
    return { input: {
      endAdornment: <InputAdornment position="end">
        <IconButton 
          title="Remove this phonenumber" 
          className="hover:!text-[#ff0000] opacity-50 dark:opacity-30 hover:opacity-100 transition-opacity"
          onClick={ () => removeOfficePhonenumber(inputIndex)}>
          
          <ClickunapIcon name="delete" />

        </IconButton>
      </InputAdornment>,
    } };
  }


 

  const getEmailsInputSlotProps = (inputIndex) => {
    return { input: {
      endAdornment: <InputAdornment position="end">
        <IconButton 
          title="Remove this email" 
          className="hover:!text-[#ff0000] opacity-50 dark:opacity-30 hover:opacity-100 transition-opacity"
          onClick={ () => removeOfficeEmail(inputIndex)}>
          
          <ClickunapIcon name="delete" />

        </IconButton>
      </InputAdornment>,
    } };
  }





  /**======== END OF SLOT PROPS ========**/









  

  return (
    <ClickunapDialog 
      ref={dialogRef}
      name="AddOfficeDialog" 
      contentClassName={clsx({
        "!h-[270px]": selectedView === null, 
        "!h-[380px]": selectedView === "create_territory",
        "!h-[510px]": selectedView === "create_complex",
        "!h-[700px]": selectedView === "create_office",
      })}
      opened={opened} 
      locked={locked}
      onCloseButtonClick={onCloseButtonClick}
      onReturnButtonClick={goBack}
      returnButtonHidden={selectedView === null}
      onClose={onClose}
      onOpen={onOpen}
      loading={isLoading}
      loadingColor={isDarkMode ? "secondary" : "tertiary"}
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

      


      {selectedView === "create_office" && (
        <div className="flex flex-col w-full h-auto">
          <Box 
            component="form"
            sx={{ '& .MuiTextField-root': { my: 1.5, mx: 0, width: '100%' } }}
            className="!pt-4 !px-4 lg:!px-6 flex flex-col w-full h-[600px] max-h-[600px] overflow-y-auto"
            onSubmit={handleOfficeCreateFormSubmit}>
            
            {/* Office Territories */}
            <TextField
              ref={newOfficeTerritoryInputRef}
              className="!w-full"
              id="territory_id"
              select
              label="Territory"
              defaultValue={newOfficeTerritoryNameId}
              value={newOfficeTerritoryNameId}
              // defaultValue={getDefaultComplexTerritoryNameId()}
              // value={!!newOfficeTerritoryNameId.length ? newOfficeTerritoryNameId : getDefaultComplexTerritoryNameId()}
              disabled={isLoading}
              required
              onChange={handleNewOfficeTerritoryChange}
              error={hasNewOfficeTerritoryError}
              helperText={newOfficeTerritoryErrorMessage}
              slotProps={territoriesInputSlotProps}>

                {territories.data.map((territory) => (
                  <MenuItem key={territory.nameId} value={territory.nameId} className="capitalize">
                    {territory.name}
                  </MenuItem>
                ))}

              
            </TextField>


            {/* Office Complexes */}
            <TextField
              ref={newOfficeComplexInputRef}
              className="!w-full"
              id="complex_id"
              select
              label="Complex"

              defaultValue={newOfficeComplexNameId}
              value={newOfficeComplexNameId}
              // defaultValue={getDefaultCurrentComplexNameId()}
              // value={!!newOfficeComplexNameId.length ? newOfficeComplexNameId : getDefaultCurrentComplexNameId()}
              disabled={isLoading}
              required
              onChange={handleNewOfficeComplexChange}
              error={hasNewOfficeComplexError}
              helperText={newOfficeComplexErrorMessage}
              slotProps={complexesInputSlotProps}>

                {currentComplexes.map((complexe) => (
                  <MenuItem key={complexe.nameId} value={complexe.nameId} className="capitalize">
                    {complexe.name}
                  </MenuItem>
                ))}
              
            </TextField>

            
            {/* Address - Office - Input */}
            <TextField
              className="!w-full"
              id="address"
              required={true}
              disabled={isLoading}
              type="text"
              label="Address"
              value={newOfficeAddress}
              placeholder={`26, Rue Elzéard Rougier - 13004 Marseille`}
              // InputProps={territoryIdInputProps}
              error={hasNewOfficeAddressError}
              helperText={newOfficeAddressErrorMessage}
              onChange={(event) => setNewOfficeAddress(event.target.value)}
              //InputProps={{ startAdornment: <InputAdornment position="start">icon</InputAdornment> }}
            />



            {/* Names - Office - Inputs */}
            {newOfficeNames.map((name, index) => (
              <TextField
                key={index}
                className={clsx(["!w-full"], 
                  {"before:content-[''] before:block before:absolute before:inset-0 before:border-dashed before:-top-4 before:w-full before:opacity-50 before:dark:opacity-20 before:border-t-1 before:border-primary before:dark:border-white !mt-4": index === 0})}
                id={`name-${index+1}`}
                required={false}
                disabled={isLoading}
                type="text"
                label={`Name ${index+1}`}
                value={name}
                error={hasNewOfficeNamesError}
                helperText={newOfficeNamesErrorMessage}
                slotProps={getNamesInputSlotProps(index)}
                onChange={(event) => addNewOfficeName(index, event.target.value)}
                //InputProps={{ startAdornment: <InputAdornment position="start">icon</InputAdornment> }}
              />
            ))}


            {/* Add another name - Button */}
            <Button
              className="self-start !uppercase !text-sm !text-tertiary !mt-0 !mb-4 lg:!mb-6"
              variant="text" 
              color="primary"
              type="button"
              startIcon={<ClickunapIcon name="add" className="!size-4 !m-0 !p-0" />}
              onClick={() => setNewOfficeNames([...newOfficeNames, ''])}
              disabled={isLoading}>
              Add name {(newOfficeNames.length > 0) && `#${newOfficeNames.length + 1}`}
            </Button>



            {/* Phonenumbers - Office - Inputs */}
            {newOfficePhonenumbers.map((phonenumber, index) => (
              <TextField
                key={index}
                className={clsx(["!w-full"], 
                  {"before:content-[''] before:block before:absolute before:inset-0 before:border-dashed before:-top-4 before:w-full before:opacity-50 before:dark:opacity-20 before:border-t-1 before:border-primary before:dark:border-white !mt-4": index === 0})}
                id={`phonenumber-${index+1}`}
                required={false}
                disabled={isLoading}
                type="text"
                label={`Phone Number ${index+1}`}
                value={phonenumber}
                error={hasNewOfficePhonenumbersError}
                helperText={newOfficePhonenumbersErrorMessage}
                slotProps={getPhonenumbersInputSlotProps(index)}
                onChange={(event) => addNewOfficePhonenumber(index, event.target.value)}
              />
            ))}


            {/* Add another phonenumber - Button */}
            <Button
              className="self-start !uppercase !text-sm !text-tertiary !mt-0 !mb-4 lg:!mb-6"
              variant="text" 
              color="primary"
              type="button"
              startIcon={<ClickunapIcon name="add" className="!size-4 !m-0 !p-0" />}
              onClick={() => setNewOfficePhonenumbers([...newOfficePhonenumbers, ''])}
              disabled={isLoading}>
              Add phonenumber {(newOfficePhonenumbers.length > 0) && `#${newOfficePhonenumbers.length + 1}`}
            </Button>



            {/* Emails - Office - Inputs */}
            {newOfficeEmails.map((email, index) => (
              <TextField
                key={index}
                className={clsx(["!w-full"], 
                  {"before:content-[''] before:block before:absolute before:inset-0 before:border-dashed before:-top-4 before:w-full before:opacity-50 before:dark:opacity-20 before:border-t-1 before:border-primary before:dark:border-white !mt-4": index === 0})}
                id={`email-${index+1}`}
                required={false}
                disabled={isLoading}
                type="email"
                label={`Email ${index+1}`}
                value={email}
                error={hasNewOfficeEmailsError}
                helperText={newOfficeEmailsErrorMessage}
                slotProps={getEmailsInputSlotProps(index)}
                onChange={(event) => addNewOfficeEmail(index, event.target.value)}
              />
            ))}


            {/* Add another email - Button */}
            <Button
              className="self-start !uppercase !text-sm !text-tertiary !mt-0 !mb-4 lg:!mb-6"
              variant="text" 
              color="primary"
              type="button"
              startIcon={<ClickunapIcon name="add" className="!size-4 !m-0 !p-0" />}
              onClick={() => setNewOfficeEmails([...newOfficeEmails, ''])}
              disabled={isLoading}>
              Add email {(newOfficeEmails.length > 0) && `#${newOfficeEmails.length + 1}`}
            </Button>



          
            <span className="flex flex-1"/>

            <div className={clsx(["ButtonWrapper flex flex-col w-full h-auto px-5 lg:px-10 pt-4 pb-6 justify-center items-center"], 
              ["sticky bottom-0 left-0 right-0 z-10 bg-dialog-container !mt-4"])}>
              <Button
                type="submit"
                variant="contained" 
                color="primary" 
                // onClick={() => createTerritory()}
                disabled={getAddOfficeBtnDisabled()}
                className={clsx("w-full !rounded-full uppercase !text-md lg:!text-lg !py-2 !tracking-wider")}>
                add office
              </Button>
            </div>

          </Box>


        </div>
      )}



      {selectedView === "create_complex" && (
        <div className="flex flex-col w-full h-auto">
          <Box 
            component="form"
            sx={{ '& .MuiTextField-root': { my: 1.5, mx: 0, width: '100%' } }}
            className="!p-4 lg:!px-6 flex flex-col w-full"
            onSubmit={handleComplexCreateFormSubmit}>
            

            <TextField
              className="!w-full"
              id="territory_id"
              select
              label="Territory"

              defaultValue={newComplexTerritoryNameId}
              value={newComplexTerritoryNameId}
              // defaultValue={getDefaultComplexTerritoryNameId()}
              // value={!!newComplexTerritoryNameId.length ? newComplexTerritoryNameId : getDefaultComplexTerritoryNameId()}
              disabled={isLoading}
              required
              onChange={handleNewComplexTerritoryChange}
              error={hasNewComplexTerritoryError}
              helperText={newComplexTerritoryErrorMessage}
              slotProps={territoriesInputSlotProps}>

                {territories.data.map((territory) => (
                  <MenuItem key={territory.nameId} value={territory.nameId} className="capitalize">
                    {territory.name}
                  </MenuItem>
                ))}
              
            </TextField>


          
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
   * Handler that is called whenever the new office territory changes
   */
  function handleNewOfficeTerritoryChange(event) {
    // get the selecte element
    const selectEl = event.target;

    // get the current complex territory nameId and Id as `territoryNameId` and `territoryId`
    const territoryId = territories.data.find((territory) => territory.nameId === selectEl.value).id;
    const territoryNameId = selectEl.value;

    // update the `newComplexTerritoryNameId` and `newComplexTerritoryId`
    setNewOfficeTerritoryNameId(territoryNameId);
    setNewOfficeTerritoryId(territoryId);

    
    // tell me about it ;)
    console.log(`\x1b[33m[handleNewOfficeTerritoryChange]\x1b[0m: territoryId => ${territoryId} & territoryNameId => ${territoryNameId}, `, territories.data);
  }

  
  /**
   * Handler that is called whenever the new office complex changes
   */
  function handleNewOfficeComplexChange(event) {
    // get the selecte element
    const selectEl = event.target;

    // get the current office complex nameId and Id as `officeComplexNameId` and `officeComplexId`
    const officeComplexId = currentComplexes.find((officeComplex) => officeComplex.nameId === selectEl.value).id;
    const officeComplexNameId = selectEl.value;

    // update the `newOfficeComplexNameId` and `newOfficeComplexId`
    setNewOfficeComplexNameId(officeComplexNameId);
    setNewOfficeComplexId(officeComplexId);

    // tell me about it ;)
    console.log(`\x1b[33m[handleNewOfficeComplexChange]\x1b[0m: officeComplexId => ${officeComplexId} & officeComplexNameId => ${officeComplexNameId}, `, currentComplexes);
  }


  



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








  function handleOfficeCreateFormSubmit(event) {
    event.preventDefault();

    // create the office
    createOffice().then((data) => {
      
      // reset the form
      resetOfficeForm();
      
      // go back
      goBack();

      // show snackbar
      dialogRef.current.showSnackbar({ type: "success", message: `New office created: ${data.name?.toUpperCase() ?? data.address}` });

      // reload the offices
      offices.reload();

      // tell me about it ;)
      console.log(`\x1b[30m[handleOfficeCreateFormSubmit]\x1b[0m: data => `, data);

    }).catch((error) => {

      // show snackbar
      dialogRef.current.showSnackbar({ type: "error", message: `Failed to create office: ${error.message}` });

      console.log(`\x1b[31m[handleOfficeCreateFormSubmit]\x1b[0m: error => `, error);
    });

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
    }).catch((error) => {

      // show snackbar
      dialogRef.current.showSnackbar({ type: "error", message: `Failed to create complex: ${error.message}` });

      console.log(`\x1b[31m[handleComplexCreateFormSubmit]\x1b[0m: error => `, error);
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
   * Reset the `newOfficeTerritoryId`, `newOfficeTerritoryNameId`, `newOfficeComplexId` and `newOfficeComplexNameId`, etc... values 
   * NOTE: This method also resets the `officeTerritoryError`, `officeComplexError` values 
   *        and their corresponding messages
   */
  function resetOfficeForm() {

    setNewOfficeTerritoryId("");
    setNewOfficeTerritoryNameId("");
    setNewOfficeComplexId("");
    setNewOfficeComplexNameId("");

    setNewOfficeAddress("");

    setNewOfficeNames([]);
    setNewOfficeEmails([]);
    setNewOfficePhonenumbers([]);
    
    
    setHasNewOfficeTerritoryError(false);
    setHasNewOfficeComplexError(false);
    setHasNewOfficeAddressError(false);
    setHasNewOfficeNamesError(false);
    setHasNewOfficeEmailsError(false);
    setHasNewOfficePhonenumbersError(false);

    setNewOfficeTerritoryErrorMessage("");
    setNewOfficeComplexErrorMessage("");
    setNewOfficeAddressErrorMessage("");
    setNewOfficeNamesErrorMessage("");
    setNewOfficeEmailsErrorMessage("");
    setNewOfficePhonenumbersErrorMessage("");


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
    setHasNewComplexTerritoryError(false);
    setHasNewComplexDirectorNameError(false);

    setNewComplexIdErrorMessage("");
    setNewComplexNameErrorMessage("");
    setNewComplexTerritoryErrorMessage("");
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



  function containsOnlyCommas(str) {
    return /^,+$/.test(str);
  }

}
