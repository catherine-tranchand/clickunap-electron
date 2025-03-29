import ClickunapAppBar from '@/components/clickunap-appbar'
import ClickunapNavBar from '@/components/clickunap-navbar';
import ClickunapAppSectionManager from '@/components/clickunap-section-app-manager';
import ClickunapAppSection from '@/components/clickunap-section-app-manager';
import ClickunapResourceSection from '@/components/clickunap-section-resource';

import ClickunapSideBar from '@/components/clickunap-sidebar';

import useRedirect from '@/hooks/useRedirect';



export default function ManagerPage(){
  const redirect = useRedirect();
  redirect.from('manager');



    return (
      <main className="flex flex-col size-full overflow-auto">
            
        {/* Header */}
        <header className="Header w-full h-auto">
          {/* AppBar - Clickunap */}
          <ClickunapAppBar />
        </header>

        {/* Content */}
        <div className="Content flex flex-col lg:flex-row w-full h-full pb-20 lg:pb-0 overflow-auto lg:overflow-hidden">

          {/* SideBar - Clickunap */}
          <ClickunapSideBar page="manager"/>

          {/* Container */}
          <div className="Container flex grow flex-col lg:flex-row overflow-auto px-6 py-8 space-y-10 lg:space-y-0">

            {/* Apps - Section - Clickunap */}
            <ClickunapAppSectionManager 
              title="Le Coin des Applis"
            />


            {/* Resources - Section - Clickunap */}
            <ClickunapResourceSection
              title="Mes Ressources"
            />



          </div>

          {/* NavBar - Clickunap */}
          <ClickunapNavBar page="manager"/>

        </div>
      </main>
    )
}
