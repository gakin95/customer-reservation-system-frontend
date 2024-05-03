import { api } from "./api";
import UrlRoute from "./helper/UrlRouter";
import useService from "./useService";
import {
  handleSuccessResponse,
  handleErrorResponse,
} from "./helper/responseHandler";


const UsersService = () => {
  const { postHandler, putHandler } = useService();
  const { get } = api;

  const fetchUsers = async (changeTab) => {
    try {
      const data = await get(`${changeTab == ""? `${UrlRoute.users}/all-users` : `${UrlRoute.users}/by-user-type/${changeTab}`}`);
      const responseData = handleSuccessResponse(data);
      return { modelList: responseData};
    } catch (error) {
      handleErrorResponse(error);
    }
  };


  return {
    fetchUsers,
  };
};

export default UsersService;
