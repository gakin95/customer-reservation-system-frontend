import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Tags from "../forms/tags";

const SubMenu = ({ item, index }) => {
  const isActive = {
    backgroundColor: "#0413e7",
    borderLeft: "thick solid #FF7F36",
  };

  const [dropDown, setDropDown] = useState(false);
  const showSubnav = () => {
    if (item.subNav) setDropDown(!dropDown);
  };

  return (
    <div>
      {item.subNav ? (
        <>
          {item.isPermitted ? (
            <div
              className="flex justify-start items-center cursor-pointer py-3 text-WHITE"
              to={item.path}
              onClick={showSubnav}
            >
              <img src={item.icon} alt="icons" className="min-w-8 mx-6" />
              <span className="text-base mr-4">{item.title}</span>
              <div>
                {item.subNav && dropDown
                  ? item.iconOpened
                  : item.subNav
                  ? item.iconClosed
                  : null}
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <>
          {item.isPermitted ? (
            <NavLink
              className="flex justify-start py-3 text-WHITE"
              activeStyle={isActive}
              to={{
                pathname: item.path,
                state: item.title,
              }}
            >
              <img src={item.icon} alt="icons" className="min-w-8 mx-6" />
              <div className="flex items-center">
                <span className="text-base">{item.title}</span>
                <div>
                  {" "}
                  {item.isComing ? (
                    <Tags
                      text="Coming Soon"
                      size="7"
                      weight="700"
                      color="bg-NEUTRAL-_600"
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div>
                {item.subNav && dropDown
                  ? item.iconOpened
                  : item.subNav
                  ? item.iconClosed
                  : null}
              </div>
            </NavLink>
          ) : null}
        </>
      )}

      {dropDown &&
        item.subNav.map((item, index) => {
          return (
            <NavLink
              to={{
                pathname: item.path,
                state: item.title,
              }}
              activeStyle={isActive}
              key={index}
              className="bg-primary h-16 pl-12 flex items-center font-body text-base font-normal text-white"
            >
              <ul className="flex items-center">
                <li className="ml-1">{item.title}</li>
                <div>
                  {" "}
                  {item.isComing ? (
                    <Tags
                      text="Coming Soon"
                      size="7"
                      weight="600"
                      color="bg-NEUTRAL-_600"
                    />
                  ) : (
                    ""
                  )}
                </div>
              </ul>
            </NavLink>
          );
        })}
    </div>
  );
};

export { SubMenu };
