import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

/*
export const metadata = {
  title: "Clickunap",
  description: "Apps and resources from Unapei",
};
*/


/* Import your clickunap components here */
// import ClickunapAppBar from "@/components/clickunap-appbar";
// import ClickunapNavBar from "@/components/clickunap-navbar";
// import ClickunapAppSection from "@/components/clickunap-section-app";
// import ClickunapSideBar from "@/components/clickunap-sidebar";




export default function RootLayout({ children }) {
  return (
    <div className={inter.className}>{children}</div>
  );
}

