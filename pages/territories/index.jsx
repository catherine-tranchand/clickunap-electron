import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';

import ClickunapAppBar from "@/components/clickunap-appbar";
import ClickunapNavBar from "@/components/clickunap-navbar";
import ClickunapAppSection from "@/components/clickunap-section-app";
import ClickunapSideBar from "@/components/clickunap-sidebar";



import TerritoriesData from "@/public/data/territories-data.json";




export default function TerritoryPage(){

    const [ value, setValue] = useState(0);
    const [ currentTerritoryKey, setCurrentTerritoryKey ] = useState("hq")



    return (
        <main className="TerritoryPage size-full flex flex-col">
        {/* Header */}
        <header className="Header w-full h-auto">
          {/* AppBar - Clickunap */}
          <ClickunapAppBar />
        </header>
  
        {/* Content */}
        <div className="Content flex flex-col lg:flex-row w-full h-full pb-20 lg:pb-0 overflow-auto lg:overflow-hidden">
            {/* SideBar - Clickunap */}
            <ClickunapSideBar 
                managerLinkHidden={false}
            />
    
            {/* Container */}
            <div className="Container flex grow flex-col lg:flex-row overflow-auto">
                
                {/* View */}
                <div className="View size-full flex flex-col">
                    {/* Tabs */} 
                    <Tabs value={value} onChange={handleChange} centered>
                        {Object.keys(TerritoriesData).map((territoryKey, index) => (
                            <Tab key={territoryKey} label={TerritoriesData[territoryKey].name} data-value={index} data-territory-key={territoryKey}/>
                        ))}
                    </Tabs>

                    {/* Contacts Container */} 
                    <div className="Contacts_Container size-full grow flex flex-row ">
                        {/* Menu Paper */} 
                        <Paper sx={{ width: 320, maxWidth: '100%' }}>
                            <MenuList>
                                {TerritoriesData[currentTerritoryKey].data.map((item, index) => (
                                    <MenuItem key={index} selected={false}>
                                        <ListItemText>{item.name}</ListItemText>
                                    </MenuItem>
                                ))}
                            </MenuList>
                        </Paper>

                        {/* Contacts */} 
                        <div className="Territory_Contacts flex flex-col overflow-auto grow">
                            <ul className="">
                                <li className="">
                                    <h3 className="Contact_Name">IME LES OLIVIERS (CHÂTEAU ARNOUX)</h3>
                                    <h4 className="Contact_Address">Route de Saint Jean - BP 38 - 04160 Château Arnoux</h4>
                                    
                                    <ul className="Contact_Phonenumbers">
                                        <li>04 92 64 06 67</li>
                                    </ul>

                                    <ul className="Contact_Emails">
                                        <li>ime.oliviers@unapei-ap.fr</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* End of Contacts Container */} 
                    
                </div>
                {/* End of View */} 
            </div>
            {/* End of Container */}

  
          {/* NavBar - Clickunap */}
          <ClickunapNavBar 
            managerLinkHidden={false}
          />
  
        </div>
      </main>


    );


    function handleChange(event){
        // get the value of the clicked tab
        const newValue = Number(event.target.dataset.value);
        const newTerritoryKey = event.target.dataset.territoryKey;

        setValue(newValue);
        setCurrentTerritoryKey(newTerritoryKey);

    }

    
}