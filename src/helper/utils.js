import { store } from "../store";

const isAuthenticated = () => {
    const token = store.getState().user.details.accessToken;
    return !!token;  // Returns true if there's a token, false otherwise
  };

  const isAdminOrSuperAdmin = () => {
    const userType = store.getState().user.details.UserType;
    return userType !== 'Customer';  // Adjust logic as necessary for your role definitions
  };
  

const isFulfillment = () => {
    return true;
};

const isDelivery = () => {
    return true;
}

export {
    isAuthenticated,
    isFulfillment,
    isDelivery,
    isAdminOrSuperAdmin
}



