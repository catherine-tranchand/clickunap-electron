import { useState } from "react";
import ClickunapBox from "@/components/clickunap-box";

import ClickunapDashboardOverviewList from "@/components/clickunap-dashboard-overview-list";
import ClickunapDashboardManagersList from "@/components/clickunap-dashboard-managers-list";
import ClickunapDashboardManagersDialog from "@/components/clickunap-dashboard-managers-dialog";

import useManagers from "@/hooks/useManagers";
import clsx from "clsx";



export default function ClickunapDashboardSection({ 
  adminName, 
 }) {


  const [ managersDialogType, setManagersDialogType ] = useState("view");
  const [ managersDialogCurrentId, setManagersDialogCurrentId ] = useState(null);
  const [ isManagersDialogOpened, setManagersDialogOpened ] = useState(false);


  const { data: managersData, total: managersTotal } = useManagers();












  return (
    <div className="ClickunapDashboardSection flex flex-col size-full px-4 py-6 lg:px-0 relative">
      
      <h2 className="text-2xl lg:pl-7 lg:text-3xl lg:font-light lg:mb-4 lg:mt-2">Hello <span>{adminName}</span>🎖</h2>
      
      {/* Overview - Box */}
      <ClickunapBox title="Overview" searchHidden addHidden moreHidden>
        <ClickunapDashboardOverviewList managerCount={managersTotal} officeCount={420} postCount={69} appCount={19}/>
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
      <ClickunapBox 
        title="Offices" 
        moreHidden 
        searchHidden 
        addHidden >
          

        </ClickunapBox>
        

      {/* Posts - Box */}
      <ClickunapBox 
        title="Posts" 
        moreHidden 
        searchHidden 
        addHidden >
          

        </ClickunapBox>


      {/* Apps - Box */}
      <ClickunapBox 
        title="Apps" 
        moreHidden 
        searchHidden 
        addHidden >
          

        </ClickunapBox>

      

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

}
