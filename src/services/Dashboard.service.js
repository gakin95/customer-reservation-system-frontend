import { useQuery } from "react-query";
import UrlRoute from "./helper/UrlRouter";
import tokenService from "../services/token.service";
import { api } from "./api";

const apiReady = true;

const useDashboardService = () => {
  //   const { mappingModel, defaultDataList, singleData } = WarehouseUsersTwo();
  //   console.log(id);
  const userObj = tokenService.getUser();

  const {
    refetch: refetchDashboardSummary,
    isLoading: isgetDashboardSummaryLoading,
    isFetching: isgetDashboardSummaryFetching,
  } = useQuery({
    queryKey: "getDashboardSummary",
    queryFn: () => api.get(`${UrlRoute.getDashboard}${userObj?.clientId}`),
    enabled: false,
  });

  const getDashboardDetails = async () => {
    if (apiReady) {
      const { data, status, error } = await refetchDashboardSummary();
      // console.log("singleService", data?.data?.content);
      //   ModelMapper(mappingModel).mapList(data?.data?.content),
      return {
        data,
        status,
        error,
      };
    }
    // else {
    //   return {
    //     // data: ModelMapper(mappingModel).mapList(defaultDataList),
    //     // status: true,
    //     // error: false,
    //     data,
    //   };
    // }
  };

  const {
    refetch: refetchFufilmentDashboardSummary,
    isLoading: isgetFufilmentDashboardSummaryLoading,
    isFetching: isgetFufilmentDashboardSummaryFetching,
  } = useQuery({
    queryKey: "getFufilmentDashboardSummary",
    queryFn: () =>
      api.get(
        `/api/v1/fulfillmentdashboard/record?startDate=2021-12-23 04:36:40&endDate=2021-12-23 04:36:40&wareHouseId=1&partnerId=${userObj?.clientId}`
      ),
    enabled: false,
  });

  const getFufilmentDashboardDetails = async () => {
    if (apiReady) {
      const { data, status, error } = await refetchFufilmentDashboardSummary();
      console.log("fufil service", data?.data?.content);
      //   ModelMapper(mappingModel).mapList(data?.data?.content),
      return {
        data,
        status,
        error,
      };
    }
  };

  const {
    refetch: refetchAllDrivers,
    isLoading: isgetAllDriversLoading,
    isFetching: isgetAllDriversFetching,
  } = useQuery({
    queryKey: "getAllDrivers",
    queryFn: () => api.get(`${UrlRoute.getAllActiveDrivers}`),
    enabled: false,
  });

  const getAllDrivers = async () => {
    if (apiReady) {
      const { data, status, error } = await refetchAllDrivers();
      // console.log("singleService", data?.data?.content);
      //   ModelMapper(mappingModel).mapList(data?.data?.content),
      return {
        data,
        status,
        error,
      };
    }
    // else {
    //   return {
    //     // data: ModelMapper(mappingModel).mapList(defaultDataList),
    //     // status: true,
    //     // error: false,
    //     data,
    //   };
    // }
  };

  return {
    getFufilmentDashboardDetails,
    getDashboardDetails,
    getAllDrivers,
    isgetAllDriversLoading,
    isgetDashboardSummaryLoading,
    isgetDashboardSummaryFetching,
    refetchDashboardSummary,
  };
};

export default useDashboardService;
