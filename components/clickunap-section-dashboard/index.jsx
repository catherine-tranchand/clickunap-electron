import { useState } from "react";
import ClickunapBox from "@/components/clickunap-box";

import ClickunapDashboardOverviewList from "@/components/clickunap-dashboard-overview-list";
import ClickunapDashboardManagersList from "@/components/clickunap-dashboard-managers-list";

import useManagers from "@/hooks/useManagers";
import clsx from "clsx";



export default function ClickunapDashboardSection({ 
  adminName, 
 }) {



  const { data: managersData } = useManagers();











  return (
    <div className="ClickunapDashboardSection flex flex-col size-full px-4 py-6 lg:px-0 relative">
      
      <h2 className="text-2xl lg:pl-7 lg:text-3xl lg:font-light lg:mb-4 lg:mt-2">Hello <span>{adminName}</span>🎖</h2>
      
      {/* Overview - Box */}
      <ClickunapBox title="Overview" searchHidden addHidden moreHidden>
        <ClickunapDashboardOverviewList />
      </ClickunapBox>

      {/* Managers - Box */}
      <ClickunapBox title="Managers" moreHidden>
        <ClickunapDashboardManagersList data={managersData} />
      </ClickunapBox>

    </div>
  );
}
