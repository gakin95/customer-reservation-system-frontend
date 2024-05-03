import { api } from "./api";
import UrlRoute from "./helper/UrlRouter";
import useService from "./useService";
import {
  handleSuccessResponse,
  handleErrorResponse,
} from "./helper/responseHandler";


const AvailabiltyService = () => {
  const { postHandler, putHandler } = useService();
  const { get } = api;

  const fetchAllAvailbility = async (changeTab) => {
    try {
        const data = await get(`${changeTab == ""? UrlRoute.availabilty: `${UrlRoute.availabilty}/status/${changeTab}`}`);
        const responseData = handleSuccessResponse(data);
      return { modelList: responseData};
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  const getAvailbilityByVenue = async (id) => {
    try {
      const data = await get(`${UrlRoute.availabilty}/by-venue/${id}`);
      console.log("-------data",data)
      return { modelList: handleSuccessResponse(data)};
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  const getAvailabilityByStatus = async (status) => {
    try {
      const data = await get(`${UrlRoute.availabilty}/status/${status}`);
      return { modelList: handleSuccessResponse(data)};
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  const getAvailabilityByDateTime = async ({ date, startTime, endTime }) => {
    const url = `${UrlRoute.availabilty}/availability/search?date=${encodeURIComponent(date)}&startTime=${encodeURIComponent(startTime)}&endTime=${encodeURIComponent(endTime)}`;
    try {
      const data = await get(url);
      return { modelList: handleSuccessResponse(data)};
    } catch (error) {
      handleErrorResponse(error);
    }
  };


  const addAvailabilty = async (data) => {
    try {
      const response = await postHandler(`${UrlRoute.availabilty}`, data);
      return response;
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  const editAvailabilty = async (data,id) => {
    try {
      const response = await putHandler(`${UrlRoute.availabilty}/${id}`, data);
      return response;
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  const updateAvailabilityStatus = async (data,id) => {
    try {
      const response = await putHandler(`${UrlRoute.availabilty}/update-status/${id}`, data);
      return response;
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  return {
    fetchAllAvailbility,
    getAvailbilityByVenue,
    addAvailabilty,
    editAvailabilty,
    getAvailabilityByStatus,
    getAvailabilityByDateTime,
    updateAvailabilityStatus
  };
};

export default AvailabiltyService;
