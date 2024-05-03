import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Harmburger from "../../assets/icons/harmburger.svg";
import NotificationBell from "../../assets/icons/notification-bell.svg";
// import Search from "../../assets/icons/search.svg";
import ChevronDown from "../../assets/icons/chevron-down.svg";
import Tags from "../forms/tags";
import Text from "../../components/Typography/Typography";
import tokenService from "../../services/token.service";

import ModalPopup from "../../components/modals/ModalPopup";
import LogoutModal from "./logoutModal";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function Header({ isSideBarOpen, setIsSideBarOpen, ...props }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const history = useHistory();

  const open = Boolean(anchorEl);
  const userData = tokenService.getUser();
  const headerTitle = props?.location?.state;
  const userFirstName = userData?.firstName;
  const firstStringChar = userFirstName?.charAt(0).toUpperCase();

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const handleLogout = () => {
    tokenService.removeUser();
    window.location.pathname = "/";
  };

  const handleOpenLogoutModal = () => {
    setAnchorEl(null);
    setOpenModal(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div
        className="hidden md:flex bg-white justify-between py-3 px-6 shadow-lg fixed z-10"
        style={{
          borderBottom: "1px solid #E8E9EB",
          width: isSideBarOpen ? "85%" : "95%",
        }}
      >
        <img
          onClick={toggleSideBar}
          src={Harmburger}
          alt="harmburger"
          className="cursor-pointer"
        />
        <Text
          format="mt-2"
          color="font-bold font-medium not-italic"
          variant="h2"
        >
          {headerTitle}
        </Text>
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
        <ModalPopup isOpen={openModal}>
          <LogoutModal
            setOpenModal={setOpenModal}
            handleLogout={handleLogout}
          />
        </ModalPopup>
      </div>
    </>
  );
}
