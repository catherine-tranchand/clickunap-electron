import ClickunapIcon from "@/components/clickunap-icon";
import clsx from "clsx";






export default function ClickunapDashboardManagersList({ data, className, onItemClick }) {




  return (
    <ul className={clsx("ClickunapDashboardManagersList flex w-full h-auto overflow-scroll py-2 space-x-3 lg:py-6 lg:space-x-6", className)}>
      
      {data.map((manager) => (
        <li key={manager.userId} onClick={() => onItemClick && onItemClick(manager.userId)}
          className={clsx(["ManagerItem group relative flex flex-row no-select size-30 p-2 rounded-lg cursor-pointer"],
                          ["bg-white dark:bg-black transition-all"])}>

          {/* Avatar */}
          <span>Avatar</span>
          <div>
            <span className={clsx("Name text-sm lg:text-lg font-bold")}>{manager.firstname} {manager.lastname}</span>
            <span className={clsx("Email text-sm lg:text-lg opacity-50")}>{manager.email}</span>
          </div>
        </li>
      ))}

    </ul>
  );
}
