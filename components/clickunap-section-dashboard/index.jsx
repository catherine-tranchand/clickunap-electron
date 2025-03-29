"use client";




export default function ClickunapDashboardSection({ 
  adminName, 
 }) {

  return (
    <div className="ClickunapDashboardSection flex flex-col size-full px-4 py-6 relative">
      
      <h2 className="text-2xl lg:text-3xl lg:font-light lg:mb-4 lg:mt-2">Hello <span>{adminName}</span>🥇</h2>
      

    </div>
  );
}
