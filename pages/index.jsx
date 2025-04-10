'use client';
/* Import your clickunap components here */
import ClickunapAppBar from "@/components/clickunap-appbar";
import ClickunapNavBar from "@/components/clickunap-navbar";
import ClickunapAppSection from "@/components/clickunap-section-app";
import ClickunapSideBar from "@/components/clickunap-sidebar";


// import our hooks
// import useUser from "@/hooks/useUser";
import useRedirect from "@/hooks/useRedirect";






export default function Home() {
  


  const redirect = useRedirect();
  redirect.from('home');







  return (
    <main className="flex flex-col w-full h-full">
      {/* Header */}
      <header className="Header w-full h-auto">
        {/* AppBar - Clickunap */}
        <ClickunapAppBar />
      </header>

      {/* Content */}
      <div className="Content flex flex-col lg:flex-row w-full h-full pb-20 lg:pb-0 overflow-auto lg:overflow-hidden">
        {/* SideBar - Clickunap */}
        <ClickunapSideBar 
          page="home"
          managerLinkHidden={false}
        />

        {/* Container */}
        <div className="Container flex grow flex-col lg:flex-row overflow-auto">
          {/* Apps - Section - Clickunap */}
          <ClickunapAppSection
          // title="Le Coin des Applis"
          />

          {/* Resources - Section - Clickunap */}
        </div>

        {/* NavBar - Clickunap */}
        <ClickunapNavBar 
          managerLinkHidden={false}
        />

      </div>
    </main>
  );
}
