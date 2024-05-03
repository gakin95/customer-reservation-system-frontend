import React from "react";
import { SidebarList } from "./sideBarList";

import { SubMenu } from "./SubMenu";

export default function SideBar({ isSideBarOpen }) {
  const { menuItems } = SidebarList();
  return (
    <>
      {/* w-[20%] h-full top-0 left-0 z-10 overflow-auto */}
      {/* hidden md:block */}
      <div
        className="hidden md:block bg-BLUE-_400 min-h-full py-10 whitespace-nowrap fixed test overflow-auto"
        style={{ width: isSideBarOpen ? "15%" : "5%" }}
      >
        <div className="flex justify-start pl-4 w-32">
          <img
            src={"https://www.logologo.com/logos/flower-logo.jpg"}
            alt="logo"
            style={{ width: isSideBarOpen ? "60px" : "40px" }}
          />
        </div>
        <div className="mt-6 w-full">
          <ul>
            {menuItems.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
