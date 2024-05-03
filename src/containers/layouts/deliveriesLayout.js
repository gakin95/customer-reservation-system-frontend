import { NavLink } from "react-router-dom";
import InappLayout from "./inappLayout";
import Chip from "@mui/material/Chip";
import DeliveryBtn from "../../components/deliveryBtn";

import Text from "../../components/Typography/Typography";

const profileNavItems = [
  {
    name: "Incoming Request",
    link: "/fulfilment/deliveries",
    number: 268,
  },
  {
    name: "Processing",
    link: "/fulfilment/processing",
    number: 268,
  },
  {
    name: "Shipped",
    link: "/fulfilment/shipped",
    number: 15,
  },
  {
    name: "Returned",
    link: "/fulfilment/returned",
    number: 15,
  },
  {
    name: "Cancelled",
    link: "/fulfilment/cancelled",
    number: 0,
  },
  {
    name: "Expired ",
    link: "/fulfilment/expired",
    number: 0,
  },
];

const DeliveriesLayout = ({ children, ...props }) => {
  const isActive = {
    paddingBottom: "5px",
    borderBottom: "3px solid #3C48FC",
  };
  return (
    <InappLayout {...props}>
      <div className="p-6">
        <div className="flex gap-5">
          <Text color="font-bold font-medium not-italic" variant="h2">
            Deliveries for
          </Text>
          <DeliveryBtn />
        </div>
        <div className="flex border-b my-6">
          {profileNavItems.map((item, index) => {
            return (
              <NavLink
                className="mr-4"
                to={{
                  pathname: item.link,
                  state: item.name,
                }}
                activeStyle={isActive}
                key={index}
              >
                <div className="flex items-center">
                  <Text variant="h4" color="text-NEUTRAL-_900">
                    {item.name}
                  </Text>
                  <Chip
                    sx={{
                      "& .MuiChip-label": { color: "#8A9099" },
                    }}
                    label={item.number}
                    size="small"
                    className="ml-2"
                  />
                </div>
              </NavLink>
            );
          })}
        </div>
        {children}
      </div>
    </InappLayout>
  );
};

export default DeliveriesLayout;
