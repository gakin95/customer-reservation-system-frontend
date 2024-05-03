import Dashboard from "../../assets/icons/dashboard.svg";
import Vehicles from "../../assets/icons/vehicles.svg";
import Reports from "../../assets/icons/reports.svg";
import Profile from "../../assets/icons/profile.svg";
import Warehouse from "../../assets/icons/warehouse.svg";
import ShoppingCart from "../../assets/icons/shoppingCart.svg";
import Finance from "../../assets/icons/wallet.svg";
import { isAuthenticated, isAdminOrSuperAdmin } from "../../helper/utils";


export const SidebarList = () => {

  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: Dashboard,
      isComing: false,
      isPermitted: isAuthenticated(),
    },
    {
      title: "My Bookings",
      path: "/orders",
      icon: ShoppingCart,
      isComing: false,
      isPermitted: isAuthenticated(),
    },
    {
      title: "All Bookings",
      path: "/all-bookings",
      icon: ShoppingCart,
      isComing: false,
      isPermitted: isAdminOrSuperAdmin(),
    },
    {
      title: "Venues",
      path: "/Venues",
      icon: Warehouse,
      isComing: false,
      isPermitted: isAuthenticated(),
    },
    {
      title: "Availability",
      path: "/availability",
      icon: Vehicles,
      isComing: false,
      isPermitted: isAuthenticated(),
    },
    {
      title: "Reports",
      path: "/Reports",
      icon: Reports,
      isComing: false,
      isPermitted: isAdminOrSuperAdmin(),
    },
    {
      title: "Payments",
      path: "/payments",
      icon: Finance,
      isComing: false,
      isPermitted: isAdminOrSuperAdmin(),
    },

    {
      title: "Users",
      path: "/users",
      icon: Profile,
      isComing: false,
      isPermitted: isAdminOrSuperAdmin(),
    },
  ];
  return { menuItems };
};
