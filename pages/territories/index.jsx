import { useState } from "react";

import Link from "next/link";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";

import ClickunapAppBar from "@/components/clickunap-appbar";
import ClickunapNavBar from "@/components/clickunap-navbar";
import ClickunapAppSection from "@/components/clickunap-section-app";
import ClickunapSideBar from "@/components/clickunap-sidebar";

import TerritoriesData from "@/public/data/territories-data.json";

import clsx from "clsx";

export default function TerritoryPage() {
  const [value, setValue] = useState(0);
  const [currentTerritoryKey, setCurrentTerritoryKey] = useState("hq");
  const [currentItem, setCurrentItem] = useState(TerritoriesData.hq.data[0]);

  const handleTabChange = (event, newValue, territoryKey) => {
    setValue(newValue);
    setCurrentTerritoryKey(territoryKey);
  };

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
        <ClickunapSideBar page="territories" managerLinkHidden={false} />

        {/* Container */}
        <div className="Container flex grow flex-col lg:flex-row overflow-auto">
          {/* View */}
          <div className="View size-full flex flex-col">
            {/* Tabs */}
            <Tabs value={value} onChange={handleTabChange} centered>
              {Object.keys(TerritoriesData).map((territoryKey, index) => (
                <Tab
                  key={territoryKey}
                  label={TerritoriesData[territoryKey].name}
                  onClick={(event) =>
                    handleTabChange(event, index, territoryKey)
                  }
                />
              ))}
            </Tabs>

            {/* Contacts Container */}
            <div className="Contacts_Container size-full grow flex flex-row">
              {/* Menu Paper */}
              <Paper sx={{ width: 320, maxWidth: "100%", minWidth: "320px" }}>
                <MenuList className="px-4 py-6 space-y-2">
                  {TerritoriesData[currentTerritoryKey].data.map(
                    (item, index) => (
                      <MenuItem
                        key={index}
                        className={clsx(
                          ["py-3 text-slate-500 hover:text-black"],
                          ["rounded-full w-fit"],
                          {
                            "bg-primary text-primaryLight":
                              currentItem.name === item.name,
                          }
                        )}
                        selected={currentItem.name === item.name}
                        onClick={() => setCurrentItem(item)}
                      >
                        <ListItemText>{item.name}</ListItemText>
                      </MenuItem>
                    )
                  )}
                </MenuList>
              </Paper>

              {/* CurrentItem */}
              <div className="Territory_Item flex flex-col overflow-auto grow px-6 py-4 items-center divide-y space-y-7 divide-slate-300">
                {/* Director */}
                <h2
                  className={clsx(
                    ["text-xl font-bold p-5 text-center mt-5 text-primary"],
                    ["sticky top-0 bg-slate-100/95 rounded-md"],
                    ["mb-4 max-w-2xl w-full z-20"]
                  )}
                >
                  <span className="absolute -top-2 text-sm px-2 py-0.5 bg-primary rounded-full text-white/80">
                    Directeur
                  </span>
                  {currentItem.director}
                </h2>

                {/* Contacts */}
                {/*
                {
                  "names": ["FV LES AMANDIERS", "AJ LES CYPRÈS"],
                  "address": "Quartier des Eyrauds - Chemin du Thuve Route Départementale 4 - 04700 Oraison",
                  "phonenumbers": ["04 92 70 30 00"],
                  "emails": ["fv.amandiers@unapei-ap.fr", "saj.cypres@unapei-ap.fr"]
                },
                */}

                {currentItem.contacts?.map((contact, index) => (
                  <div key={index} className="w-full max-w-2xl">
                    <ul className="Contact_Names my-4">
                      {contact.names.map((contactName, cnIndex) => (
                        <li
                          className={clsx(
                            ["!font-black font-mono tracking-wide"],
                            ["text-2xl select-all text-tertiary"]
                          )}
                          key={cnIndex}
                        >
                          {contactName}
                        </li>
                      ))}
                    </ul>

                    {/* <a href="http://maps.google.com/maps?q=210+Louise+Ave,+Nashville,+TN+37203"> View map</a> */}
                    <h3 className="Contact_Address !opacity-50 text-lg my-4">
                      <Link
                        target="_blank"
                        className="hover:text-tertiary"
                        href={`http://maps.google.com/maps?q=${contact.address.replace(
                          /\s/g,
                          "+"
                        )}`}
                      >
                        {contact.address}
                      </Link>
                    </h3>

                    <ul className="Contact_Phonenumbers">
                      {contact.phonenumbers.map(
                        (contactPhonenumber, cpIndex) => (
                          <li key={cpIndex}>{contactPhonenumber}</li>
                        )
                      )}
                    </ul>

                    <ul className="Contact_Emails">
                      {contact.emails.map((contactEmail, ceIndex) => (
                        <li key={ceIndex} className="font-bold py-1 text-md">
                          <Link
                            className="hover:text-tertiary"
                            href={`mailto:${contactEmail}`}
                          >
                            {contactEmail}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            {/* End of Contacts Container */}
          </div>
          {/* End of View */}
        </div>
        {/* End of Container */}

        {/* NavBar - Clickunap */}
        <ClickunapNavBar managerLinkHidden={false} />
      </div>
    </main>
  );
}
