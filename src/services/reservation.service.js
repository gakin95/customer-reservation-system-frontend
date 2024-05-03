import { api } from "./api";
import UrlRoute from "./helper/UrlRouter";
import useService from "./useService";
import {
  handleSuccessResponse,
  handleErrorResponse,
} from "./helper/responseHandler";

const apiReady = process.env.API_READY || true;

const ReservationService = () => {
  const { postHandler, putHandler, deleteHandler } = useService();
  const { get } = api;

  const createReservation = async (data) => {
    try {
      const response = await postHandler(`${UrlRoute.reservation}`, data);
      return response;
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  const makePayment = async (data) => {
    try {
      const response = await postHandler(`${UrlRoute.payment}`, data);
      return response;
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  const getPayments = async () => {
    try {
      const data = await get(UrlRoute.payment + "/payments");
      const responseData = handleSuccessResponse(data);
    return { modelList: responseData};
  } catch (error) {
    handleErrorResponse(error);
  }
  };

  const fetchAllReservations = async () => {
    try {
        const data = await get(UrlRoute.reservation);
        const responseData = handleSuccessResponse(data);
      return { modelList: responseData};
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  const getReservationsByVenue = async (id) => {
    try {
      const data = await get(`${UrlRoute.reservation}/venue/${id}`);
      return { modelList: handleSuccessResponse(data)};
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  const getReservationsByUserID = async (UserID ) => {
    try {
      const data = await get(`${UrlRoute.reservation}/user/${UserID }`);
      return { modelList: handleSuccessResponse(data)};
    } catch (error) {
      console.log("error...================",error)
      handleErrorResponse(error);
    }
  };



  const cancelReservation = async (id) => {
    try {
      const response = await deleteHandler(`${UrlRoute.reservation}/${id}`);
      return response;
    } catch (error) {
      handleErrorResponse(error);
    }
  };


  return {
    createReservation,
    fetchAllReservations,
    getReservationsByVenue,
    getReservationsByUserID,
    cancelReservation,
    makePayment,
    getPayments
  };
};

export default ReservationService;
