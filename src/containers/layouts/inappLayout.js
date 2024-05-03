import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import ModalPopup from "../../components/modals/ModalPopup";
import NotificationBell from "../../assets/icons/notification-bell.svg";
import Tags from "../../components/forms/tags";
import Header from "../../components/Layout/Header";
import Text from "../../components/Typography/Typography";
import SideBar from "../../components/Layout/Sidebar";
import Harmburger from "../../assets/icons/harmburger.svg";
import MobileSidebar from "../../components/Layout/MobileSidebar";
import tokenService from "../../services/token.service";
import ChevronDown from "../../assets/icons/chevron-down.svg";
import LogoutModal from "../../components/Layout/logoutModal";
// import { useHistory } from "react-router-dom";

export default function InappLayout({ children, ...props }) {
  const headerTitle = props?.location?.state;
  const userData = tokenService.getUser();
  const userFirstName = userData?.firstName;
  // const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const firstStringChar = userFirstName?.charAt(0).toUpperCase();

  const toggleSideBar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenLogoutModal = () => {
    setAnchorEl(null);
    setOpenModal(true);
  };

  const handleLogout = () => {
    tokenService.removeUser();
    window.location = "/";
  };

  return (
    <>
      <div className="md:hidden flex items-center">
        {isMobileSidebarOpen && (
          <MobileSidebar
            isMobileSidebarOpen={isMobileSidebarOpen}
            setIsMobileSidebarOpen={setIsMobileSidebarOpen}
          />
        )}
        <div className="w-full bg-white p-4 flex justify-between items-center">
          <div className="">
            <img
              src={Harmburger}
              alt="harmburger"
              className="font-extrabold md:hidden cursor-pointer"
              onClick={toggleSideBar}
            />
            <Text
              format="mt-4"
              color="font-bold font-medium not-italic"
              variant="h4"
            >
              {headerTitle ? headerTitle : "Dashboard"}
            </Text>
          </div>
          <div className="flex items-center">
            <div className="focus:w-36 w-12 font-normal relative">
              <input
                type="text"
                className="text-TITLE text-xs pl-4 w-full focus:w-36 outline-none rounded-3xl p-4"
              />
              {/* <img
            src={Search}
            alt="search"
            className="absolute top-3 left-3 cursor-pointer  w-5 h-5"
          /> */}
            </div>
            <img
              src={NotificationBell}
              alt="NotificationBell"
              className="bg-NEUTRAL-_400 cursor-pointer border-0 rounded-full mx-2 h-8 p-1 w-8"
            />
            <div
              onClick={handleClick}
              className="bg-NEUTRAL-_100 flex justify-between items-center cursor-pointer rounded-full py-2 px-2"
            >
              <Tags text={firstStringChar} size="10" color="bg-NEUTRAL-_600" />
              <Text format="mx-2" variant="sub">
                {userData?.firstName} {userData?.lastName}
              </Text>
              <img src={ChevronDown} alt="search" className="" />
            </div>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 0.5,
                  width: 150,
                },
              }}
            >
              <MenuItem onClick={() => props.history.push("/Account")}>
                Profile
              </MenuItem>
              <MenuItem onClick={handleOpenLogoutModal}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
      <div className="flex relative min-h-screen bg-gray-100">
        <SideBar isSideBarOpen={isSideBarOpen} {...props} />

        <div
          className={`menu-item ${
            isSideBarOpen ? "isSideBarOpen" : "isSideBarClosed"
          }`}
          // style={{
          //   marginLeft: isSideBarOpen ? "15%" : "5%",
          //   width: isSideBarOpen ? "85%" : "100%",
          // }}
        >
          <Header
            {...props}
            isSideBarOpen={isSideBarOpen}
            setIsSideBarOpen={setIsSideBarOpen}
          />
          <CSSTransition
            in={true}
            timeout={350}
            classNames="display"
            unmountOnExit
          >
            <div
              className="bg-BACKGROUND_LIGHT overflow-hidden dashboardTop"
              {...props}
            >
              {children}
            </div>
          </CSSTransition>
        </div>
      </div>
      <ModalPopup isOpen={openModal}>
        <LogoutModal setOpenModal={setOpenModal} handleLogout={handleLogout} />
      </ModalPopup>
    </>
  );
}
