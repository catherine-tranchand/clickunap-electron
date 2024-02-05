import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <div
      className={`RootLayout !fixed inset-0 z-10 w-full h-full ${inter.className}`}
      style={{ position: "fixed !important" }}
    >
      {children}
    </div>
  );
}
