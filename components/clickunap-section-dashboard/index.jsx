import { useState } from "react";

import ClickunapBox from "@/components/clickunap-box";

import ClickunapDashboardOverviewList from "@/components/clickunap-dashboard-overview-list";

import ClickunapDashboardManagersList from "@/components/clickunap-dashboard-managers-list";
import ClickunapDashboardManagersDialog from "@/components/clickunap-dashboard-managers-dialog";

import ClickunapDashboardOfficesList from "@/components/clickunap-dashboard-offices-list";
import ClickunapDashboardOfficesDialog from "@/components/clickunap-dashboard-offices-dialog";

import useManagers from "@/hooks/useManagers";
import useOffices from "@/hooks/useOffices";

import clsx from "clsx";



export default function ClickunapDashboardSection({ 
  adminName, 
 }) {


  const [ managersDialogType, setManagersDialogType ] = useState("view");
  const [ managersDialogCurrentId, setManagersDialogCurrentId ] = useState(null);
  const [ isManagersDialogOpened, setManagersDialogOpened ] = useState(false);

  const [ officesDialogType, setOfficesDialogType ] = useState("view");
  const [ officesDialogCurrentId, setOfficesDialogCurrentId ] = useState(null);
  const [ isOfficesDialogOpened, setOfficesDialogOpened ] = useState(false);

  
  const { data: managersData, total: managersTotal } = useManagers();
  const { data: officesData, total: officesTotal } = useOffices();












  return (
    <div className="ClickunapDashboardSection flex flex-col size-full px-4 py-6 lg:px-0 relative overflow-x-hidden">
      
      <h2 className="text-2xl lg:pl-7 lg:text-3xl lg:font-light lg:mb-4 lg:mt-2">Hello <span>{adminName}</span>🎖</h2>
      
      {/* Overview - Box */}
      <ClickunapBox title="Overview" searchHidden addHidden moreHidden>
        <ClickunapDashboardOverviewList managerCount={managersTotal} officeCount={officesTotal} postCount={69} appCount={19} resourceCount={10}/>
      </ClickunapBox>

      {/* Managers - Box */}
      <ClickunapBox title="Managers" moreHidden 
        onSearchButtonClick={() => openManagersDialog("search")}
        onAddButtonClick={() => openManagersDialog("add")}>

        <ClickunapDashboardManagersList 
          data={managersData} 
          onItemClick={(managerId) => openManagersDialog("view", managerId)} 
        />

      </ClickunapBox>



      {/* Offices - Box */}
      <ClickunapBox title="Offices" moreHidden
        onSearchButtonClick={() => openOfficesDialog("search")}
        onAddButtonClick={() => openOfficesDialog("add")}> 
        
        <ClickunapDashboardOfficesList
          data={officesData}
          onItemClick={(officeId) => openOfficesDialog("view", officeId)}
        />
      </ClickunapBox>
        

      {/* Posts - Box */}
      <ClickunapBox title="Posts" moreHidden> </ClickunapBox>


      {/* Apps - Box */}
      <ClickunapBox title="Apps" moreHidden> </ClickunapBox>


      {/* Resources - Box */}
      <ClickunapBox title="Resources" moreHidden> </ClickunapBox>

      

      {/* Dialogs */}
      <div className="fixed inset-0 size-full !z-100 pointer-events-none">
        
        {/* Managers Dialog */}
        <ClickunapDashboardManagersDialog 
          type={managersDialogType} 
          opened={isManagersDialogOpened}
          locked={true}
          onCloseButtonClick={() => setManagersDialogOpened(false)}
          currentId={managersDialogCurrentId}
          data={managersData}
          onEditButtonClick={(managerId) => openManagersDialog("edit", managerId)}
          onDeleteButtonClick={(managerId) => openManagersDialog("delete", managerId)}
        />


        {/* Offices Dialog */}
        <ClickunapDashboardOfficesDialog 
          type={officesDialogType} 
          opened={isOfficesDialogOpened}
          locked={true}
          onCloseButtonClick={() => setOfficesDialogOpened(false)}
          currentId={officesDialogCurrentId}
          data={officesData}
          onEditButtonClick={(officeId) => openOfficesDialog("edit", officeId)}
          onDeleteButtonClick={(officeId) => openOfficesDialog("delete", officeId)}
        />

      </div>

    </div>
  );


  function openManagersDialog(type, currentId = -1) {
    setManagersDialogType(type);
    setManagersDialogOpened(true);

    if (currentId !== -1) {
      setManagersDialogCurrentId(currentId);
    }

  }



  function openOfficesDialog(type, currentId = -1) {
    setOfficesDialogType(type);
    setOfficesDialogOpened(true);

    if (currentId !== -1) {
      setOfficesDialogCurrentId(currentId);
    }

  }

}
