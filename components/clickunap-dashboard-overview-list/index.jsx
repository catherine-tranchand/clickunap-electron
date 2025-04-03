import ClickunapIcon from "@/components/clickunap-icon";
import clsx from "clsx";






export default function ClickunapDashboardOverviewList({ 
  managerCount, 
  officeCount, 
  postCount, 
  appCount,
  resourceCount,
  className, 
  onItemClick,

}) {








  return (
    <ul className={clsx("ClickunapDashboardOverviewList flex h-auto overflow-x-auto py-2 -translate-x-4 w-[110%] lg:translate-x-0 lg:w-full space-x-3 lg:py-6 lg:space-x-6", className)}>
      
      {/* Managers - Item */}
      <li onClick={() => onItemClick && onItemClick("managers")}
        className={clsx(["ManagersItem group relative flex flex-col select-none size-30 min-w-30 p-2 rounded-lg justify-center items-center cursor-default"],
                        ["bg-tertiary-container hover:bg-tertiary-500 transition-all"],
                        ["lg:size-50 lg:min-w-50"],
                        ["text-on-background"])}>

        <ClickunapIcon name="group" filled className="absolute top-2 opacity-50 text-on-tertiary-container" />
        <span className={clsx("Number text-4xl lg:text-6xl font-bold")}>{managerCount}</span>
        <span className={clsx("Caption text-sm lg:text-lg absolute bottom-2 opacity-50")}>Managers</span>
      </li>

      {/* Offices - Item */}
      <li onClick={() => onItemClick && onItemClick("offices")}
        className={clsx(["OfficesItem group relative flex flex-col select-none size-30 min-w-30 p-2 rounded-lg justify-center items-center cursor-default"],
                        ["bg-primary-container hover:bg-primary-300 dark:bg-primary-200 hover:dark:bg-primary-900 transition-all"],
                        ["lg:size-50 lg:min-w-50"],
                        ["text-on-background"])}>
        <ClickunapIcon name="work" filled className="absolute top-2 text-on-primary-container" />
        <span className={clsx("Number text-4xl lg:text-6xl font-bold")}>{officeCount}</span>
        <span className={clsx("Caption text-sm lg:text-lg absolute bottom-2 opacity-50")}>Offices</span>
      </li>

      {/* Posts - Item */}
      <li onClick={() => onItemClick && onItemClick("posts")}
        className={clsx(["PostsItem group relative flex flex-col select-none size-30 min-w-30 p-2 rounded-lg justify-center items-center cursor-default"],
                        ["bg-secondary-container hover:bg-secondary dark:bg-secondary-100 hover:dark:bg-secondary-400 transition-all"],
                        ["lg:size-50 lg:min-w-50"],
                        ["text-on-background"])}>

        <ClickunapIcon name="forum" filled className="absolute top-2 opacity-50 text-on-secondary-container" />
        <span className={clsx("Number text-4xl lg:text-6xl font-bold")}>{postCount}</span>
        <span className={clsx("Caption text-sm lg:text-lg absolute bottom-2 opacity-50")}>Posts</span>
      </li>

      {/* Apps - Item */}
      <li onClick={() => onItemClick && onItemClick("apps")}
        className={clsx(["AppsItem group relative flex flex-col select-none size-30 min-w-30 p-2 rounded-lg justify-center items-center cursor-default"],
                        ["bg-katia-container hover:bg-katia transition-all"],
                        ["lg:size-50 lg:min-w-50"],
                        ["text-on-background"])}>

        <ClickunapIcon name="apps" filled className="absolute top-2 opacity-50 text-on-secondary-container" />
        <span className={clsx("Number text-4xl lg:text-6xl font-bold")}>{appCount}</span>
        <span className={clsx("Caption text-sm lg:text-lg absolute bottom-2 opacity-50")}>Apps</span>
      </li>

      {/* Resources - Item */}
      <li onClick={() => onItemClick && onItemClick("resources")}
        className={clsx(["ResourcesItem group relative flex flex-col select-none size-30 min-w-30 p-2 rounded-lg justify-center items-center cursor-default"],
                        ["bg-resource-container hover:bg-resource transition-all"],
                        ["lg:size-50 lg:min-w-50"],
                        ["text-on-background"])}>

        <ClickunapIcon name="attachment" filled className="absolute top-2 opacity-50 text-on-resource-container" />
        <span className={clsx("Number text-4xl lg:text-6xl font-bold")}>{resourceCount}</span>
        <span className={clsx("Caption text-sm lg:text-lg absolute bottom-2 opacity-50")}>Resources</span>
      </li>
    </ul>
  );
}
