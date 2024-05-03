import { api } from "./api";
import UrlRoute from "./helper/UrlRouter";
import useService from "./useService";
import {
  handleSuccessResponse,
  handleErrorResponse,
} from "./helper/responseHandler";

const apiReady = process.env.API_READY || true;

const VenuesService = () => {
  const { postHandler, putHandler } = useService();
  const { get } = api;

  const fetchVenus = async (changeTab) => {
    try {
      const data = await get(`${changeTab == ""? `${UrlRoute.venues}/get-all-venues` : `${UrlRoute.venues}/by-type/${changeTab}`}`);
      const responseData = handleSuccessResponse(data);
      return { modelList: responseData};
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  const getVenuesByType = async (type) => {
    try {
      const data = await get(`${UrlRoute.venues}/by-type/${type}`);
      return { modelList: handleSuccessResponse(data)};
    } catch (error) {
      handleErrorResponse(error);
    }
  };


  const addVenue = async (data) => {
    try {
      const response = await postHandler(`${UrlRoute.venues}`, data);
      let responseData = handleSuccessResponse(response);
      return responseData;
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  const addRating = async (data) => {
    try {
      const response = await postHandler(`${UrlRoute.ratings}`, data);
      console.log("=============response in service",response)
      return response;
    } catch (error) {
      console.log("error=======err")
      handleErrorResponse(error);
    }
  };

  const editVenue = async (data,id) => {
    if (apiReady) {
      try {
        const response = await putHandler(`${UrlRoute.venues}/${id}`, data);
        let responseData = handleSuccessResponse(response);
        return responseData;
      } catch (error) {
        handleErrorResponse(error);
      }
    }
    return false;
  };


  return {
    fetchVenus,
    getVenuesByType,
    addVenue,
    editVenue,
    addRating,
  };
};

export default VenuesService;
