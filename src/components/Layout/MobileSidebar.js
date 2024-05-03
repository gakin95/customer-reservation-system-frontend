import React from "react";
import close from "../../assets/icons/close.svg";
import { SidebarList } from "./sideBarList";
import { SubMenu } from "./SubMenu";

export default function MobileSidebar({
  isMobileSidebarOpen,
  setIsMobileSidebarOpen,
}) {
  const { menuItems } = SidebarList();
  const closeSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };
  return (
    <>
      <div className="md:hidden bg-BLUE-_400 h-full fixed top-0 z-40">
        <div className="flex items-center justify-between pl-4 mt-4 mb-6">
          <img src={"https://www.logologo.com/logos/flower-logo.jpg"} alt="logo" className="w-8" />
          {isMobileSidebarOpen && (
            <img
              src={close}
              alt="logo"
              className="w-4 mr-4"
              onClick={closeSidebar}
            />
          )}
        </div>
        <div className=" w-full">
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
