import { useMutation, useQuery } from "react-query";
import { api } from "./unprotected_apis";
import UrlRoute from "./helper/UrlRouter";
import TokenService from "./token.service";
import { errorNotification } from "./helper/toastNotification";
import { authSuccess } from "../store/authSlice";
import { useDispatch } from 'react-redux'
import { ongetPermissionSuccess } from "../store/permissionsSlice";
import useService from "./useService";
// import { optionCSS } from "react-select/dist/declarations/src/components/Option";

const useAuthService = (props) => {
  //console.log("props..",props)
  const putRequest = useMutation(api.put);
  const postRequest = useMutation(api.post);
  const { postHandler } = useService();
  const dispatch = useDispatch()

  const userData = TokenService.getUser();

  const login = async (values, history) => {
    try {
      const response = await postRequest.mutateAsync([
        UrlRoute.loginUrl,
        values,
      ]);
      if (response?.data) {
        TokenService.setUser(response.data);
        dispatch(authSuccess(response.data));
        props.history.push("/dashboard")
      }
    } catch (error) {
      setTimeout(() => {
        postRequest.reset();
      }, 3000);
    }
  };

  const signUp = async (values, history) => {
    const data = {
      email: values.emailAddress,
      firstName: values.firstName,
      lastName: values.lastName,
      username: values.username,
      password: values.password,
      phoneNumber: values.phoneNumber,
      userType: values.userType
    };
    try {
      const responseData= await postRequest.mutateAsync([
        UrlRoute.users + "/signup",
        data,
      ]);
      console.log('responseData.....',responseData)
      if (responseData.status == 'success') {
        history.push({
          pathname: "/",
          state: { data: responseData, password: values.password },
        });
      }
    } catch (error) {
      errorNotification(error?.data?.message);
      setTimeout(() => {
        postRequest.reset();
      }, 3000);
    }
  };
  

  const changePassword = async (values) => {
    try {
      await putRequest.mutateAsync([UrlRoute.changePassword, values]);
      setTimeout(() => {
        putRequest.reset();
      }, 4000);
    } catch (error) {
      setTimeout(() => {
        putRequest.reset();
      }, 4000);
    }
  };

  const {
    refetch: refetchGetAllState,
    data: allStateData,
    isLoading: statesAreLoading,
  } = useQuery({
    queryKey: "getAllState",
    queryFn: () => api.post([UrlRoute.getAllState]),
    enabled: false,
  });

  const {
    refetch: refetchGetAllCountry,
    data: allCountryData,
    isLoading: countryAreLoading,
  } = useQuery({
    queryKey: "getAllCountry",
    queryFn: () => api.post([UrlRoute.getAllCountry]),
    enabled: false,
  });

  const {
    refetch: refetchGetAllPaymentTerms,
    data: allPaymentTermsData,
    isLoading: paymentTermsAreLoading,
    isFetching: paymentTermsAreFetching,
  } = useQuery({
    queryKey: "getAllPaymentTerms",
    queryFn: () =>
      api.get(
        UrlRoute.paymentTerms +
          `/list?isActive=true&partnerId=${userData?.clientId}`
      ),
    enabled: false,
  });

  const {
    refetch: refetchGetAllPartnerBank,
    data: allPartnerBankData,
    isLoading: partnerBankAreLoading,
    isFetching: partnerBankAreFetching,
  } = useQuery({
    queryKey: "getAllPartnerBank",
    queryFn: () =>
      api.get(
        UrlRoute.partnerBank +
          `/list?isActive=true&partnerId=${userData?.clientId}`
      ),
    enabled: false,
  });

  const {
    refetch: refetchGetAllCategory,
    data: allCatgoryData,
    isLoading: categoriesAreLoading,
    isFetching: categoriesAreFetching,
  } = useQuery({
    queryKey: "getAllCategory",
    queryFn: () => api.get(UrlRoute.getAllCategory),
    enabled: false,
  });

  const {
    refetch: refetchGetAllBanks,
    data: allBanksData,
    isLoading: allBankIsLoading,
    isFetching: allBankIsFetching,
  } = useQuery({
    queryKey: "getAllBank",
    queryFn: () => api.post([UrlRoute.getBanks]),
    enabled: false,
  });

  const {
    refetch: refetchGetPartnerAssetsTypeProperty,
    data: assetTypePropertyData,
    isLoading: assetTypeIsLoading,
    isFetching: assetTypeIsFetching,
  } = useQuery({
    queryKey: "getPatrnerAssetTypeProperty",
    queryFn: () =>
      api.get(
        UrlRoute.getPartnerAssetsTypeProperties +
          `&partnerId=${userData.clientId}`
      ),
    enabled: false,
  });

  const {
    refetch: refetchGetAssetsTypeProperty,
    data: assetPropertyData,
    isLoading: assetIsLoading,
    isFetching: assetIsFetching,
  } = useQuery({
    queryKey: "getAssetProperty",
    queryFn: () => api.get(UrlRoute.getAssetsProperties),
    enabled: false,
  });

  const {
    refetch: refetchBusinessData,
    data: allbusinessData,
    isLoading: bussinessDataLoading,
    isFetching: bussinessDataFetching,
  } = useQuery({
    queryKey: "businessAccount",
    queryFn: () => api.get(UrlRoute.getPartnerUser + `/${userData?.clientId}`),
    enabled: false,
  });

  const {
    refetch: refetchAllAssets,
    // isLoading: getAllAssetsLoading,
    // isFetching: getAssetsFetching,
  } = useQuery({
    queryKey: "getAllAssets",
    queryFn: () =>
      api.get(
        `${UrlRoute.getAllAssets}?page=0&pageSize=10&partnerId=${userData?.clientId}`
      ),
    enabled: false,
  });

  const activatePartnerAssetType = async (
    activate,
    itemData,
    setShowSuccessResponse,
    setShowUpdatAssetModal
  ) => {
    const data = {
      active: activate,
      id: itemData.id,
    };
    try {
      const response = await putRequest.mutateAsync([
        UrlRoute.activatePartnerAssetType,
        data,
      ]);
      if (response) {
        refetchAllAssets();
        setShowUpdatAssetModal(false);
        setShowSuccessResponse(true);
        // setOpenSuccessModal(true);
      }
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        putRequest.reset();
      }, 3000);
    }
  };

  const updatePartnerAssetType = async (
    values,
    resetForm,
    setShowUpdateAssetForm
  ) => {
    console.log(values);
    try {
      const response = await putRequest.mutateAsync([
        UrlRoute.updatePartnerAssetType,
        values,
      ]);
      if (response) {
        refetchAllAssets();
        resetForm();
        setTimeout(() => {
          putRequest.reset();
        }, 4000);
      }
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        putRequest.reset();
      }, 3000);
    }
  };

  const register = async (values, state, setOpenSuccessModal) => {
    const warehouseLocation = [];
    const assetsTypes = [];
    const allCatgoryData = [];
    const includesBike = values.values.vehicle.includes("bike");
    const includesTricycle = values.values.vehicle.includes("tricycle");
    const includesvanPickUp = values.values.vehicle.includes("vanPickup");
    const includesSmalTruck = values.values.vehicle.includes("smallTruck");
    const includesLargeTruck = values.values.vehicle.includes("largeTruck");

    if (includesBike) {
      assetsTypes.push({
        isActive: true,
        partnerId: state?.data?.partnerId,
        assetTypeId: 1,
        total:
          values?.values?.bikeNum === undefined ? 1 : values?.values?.bikeNum,
        assetTypeName: "Bike",
        partnerName: state?.data?.name,
      });
    }
    if (includesTricycle) {
      assetsTypes.push({
        isActive: true,
        partnerId: state?.data?.partnerId,
        assetTypeId: 2,
        total:
          values?.values?.rickShawNumber === undefined
            ? 1
            : values?.values?.rickShawNumber,
        assetTypeName: "Tricycle",
        partnerName: state?.data?.name,
      });
    }
    if (includesvanPickUp) {
      assetsTypes.push({
        isActive: true,
        partnerId: state?.data?.partnerId,
        assetTypeId: 3,
        total:
          values?.values?.vanPickup === undefined
            ? 1
            : values?.values?.vanPickup,
        assetTypeName: "Van/Pickup",
        partnerName: state?.data?.name,
      });
    }
    if (includesSmalTruck) {
      assetsTypes.push({
        isActive: true,
        partnerId: state?.data?.partnerId,
        assetTypeId: 4,
        total:
          values?.values?.smallTruck === undefined
            ? 1
            : values?.values?.smallTruck,
        assetTypeName: "Small Truck",
        partnerName: state?.data?.name,
      });
    }
    if (includesLargeTruck) {
      assetsTypes.push({
        isActive: true,
        partnerId: state?.data?.partnerId,
        assetTypeId: 5,
        total:
          values?.values?.largeTruck === undefined
            ? 1
            : values?.values?.largeTruck,
        assetTypeName: "Large Truck",
        partnerName: state?.data?.name,
      });
    }
    values?.values.logisticsType.map((type) => {
      if (type) {
        allCatgoryData.push({
          isActive: true,
          partnerId: state?.data?.partnerId,
          categoryId: Number(type),
        });
      }
    });
    values?.values.wareHouseObj.map((location) => {
      if (location?.location !== "") {
        return warehouseLocation.push({
          isActive: true,
          countryName: values?.values?.country?.name,
          countryId: values?.values?.country?.id,
          partnerId: state?.data?.partnerId,
          stateId: Number(location?.location?.id),
          stateName: location?.location?.stateName,
          wareHouses: location?.count,
        });
      }
    });
    const data = {
      address: values?.values?.businessAddress,
      assets: assetsTypes,
      cac: values?.values?.cacNumber,
      categories: allCatgoryData,
      email: state?.data?.email,
      employeeCount: Number(values?.values?.numberOfWorkers),
      lgaId: values?.values.city,
      locations: warehouseLocation,
      name: state?.data?.name,
      id: state?.data?.partnerId,
      phone: state?.data?.phone,
      registered: values?.values?.businessIsRegistered === "yes" ? true : false,
      webSite: values?.values?.websiteName,
    };
    try {
      const response = await putRequest.mutateAsync([
        UrlRoute.registerPartnerUrl,
        data,
      ]);
      if (response) {
        setOpenSuccessModal(true);
      }
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        putRequest.reset();
      }, 3000);
    }
  };

  const updatePartnerBussiness = async (values) => {
    const updateDetails = {
      address: values?.officeAddress || allbusinessData?.data?.address,
      cac: allbusinessData?.data?.cac,
      email: values?.email || allbusinessData?.data?.email,
      employeeCount: allbusinessData?.data?.employeeCount,
      id: allbusinessData?.data?.id,
      lgaId: values?.lgas || allbusinessData?.data?.lgaId,
      name: allbusinessData?.data?.name,
      phone: values?.phone || allbusinessData?.data?.phone,
      registered: allbusinessData?.data?.registered,
      webSite: values?.webSite || allbusinessData?.data?.webSite,
    };
    try {
      await putRequest.mutateAsync([UrlRoute.getPartnerUser, updateDetails]);
      setTimeout(() => {
        putRequest.reset();
      }, 3000);
    } catch (error) {
      console.log(error?.data?.description);
      setTimeout(() => {
        putRequest.reset();
      }, 3000);
    }
  };

  // BUSINESS EMAIL
  // guzykin@mailinator.com
  const forgotPassword = async (values, history) => {
    try {
      const response = await putRequest.mutateAsync([
        UrlRoute.forgotPasswordUrl,
        values,
      ]);
      console.log(response);
      history.push("/verify-email");
    } catch (error) {
      setTimeout(() => {
        putRequest.reset();
      }, 3000);
    }
  };

  const removePartnerBank = async (partnerBankId, setShowRemoveBankModal) => {
    const data = {
      active: false,
      id: partnerBankId,
    };
    try {
      await putRequest.mutateAsync([
        UrlRoute.partnerBank + "/enabledisable",
        data,
      ]);
      setTimeout(() => {
        putRequest.reset();
      }, 1500);
      setTimeout(() => {
        setShowRemoveBankModal(false);
        refetchGetAllPartnerBank();
      }, 2000);
    } catch (error) {
      setTimeout(() => {
        putRequest.reset();
      }, 3000);
    }
  };

  const removePaymentTerms = async (
    paymentTermDetails,
    setDetelePaymentTermsModal
  ) => {
    const data = {
      active: false,
      id: paymentTermDetails.id,
    };
    try {
      await putRequest.mutateAsync([
        UrlRoute.paymentTerms + "/enabledisable",
        data,
      ]);
      setTimeout(() => {
        putRequest.reset();
      }, 1500);
      setTimeout(() => {
        setDetelePaymentTermsModal(false);
        refetchGetAllPaymentTerms();
      }, 2000);
    } catch (error) {
      setTimeout(() => {
        putRequest.reset();
      }, 3000);
    }
  };

  const editPaymentTerms = async (
    paymentTermDetails,
    setEditPaymentTermsModal
  ) => {
    // const data = {
    //   active: false,
    //   id: paymentTermDetails.id,
    // };
    try {
      await putRequest.mutateAsync([UrlRoute.paymentTerms, paymentTermDetails]);
      setTimeout(() => {
        putRequest.reset();
      }, 1500);
      setTimeout(() => {
        setEditPaymentTermsModal(false);
        refetchGetAllPaymentTerms();
      }, 2000);
    } catch (error) {
      setTimeout(() => {
        putRequest.reset();
      }, 3000);
    }
  };

  const createPaymentTerms = async (
    values,
    resetForm,
    setShowAddPaymentTermsModal
  ) => {
    console.log("....", values);
    try {
      await postRequest.mutateAsync([UrlRoute.paymentTerms, values]);
      setTimeout(() => {
        postRequest.reset();
        resetForm();
      }, 2000);
      setTimeout(() => {
        setShowAddPaymentTermsModal(false);
        refetchGetAllPaymentTerms();
      }, 2500);
    } catch (error) {
      setTimeout(() => {
        postRequest.reset();
      }, 3000);
    }
  };

  const createPartnerAssetType = async (
    values,
    resetForm,
    setShowAddAssetModal
  ) => {
    try {
      await postRequest.mutateAsync([UrlRoute.createPartnerAssetType, values]);
      setTimeout(() => {
        postRequest.reset();
        resetForm();
      }, 1000);
      setTimeout(() => {
        setShowAddAssetModal(false);
        refetchGetAssetsTypeProperty();
        window.location.reload();
      }, 1000);
    } catch (error) {
      errorNotification(error?.data?.description);
      setTimeout(() => {
        postRequest.reset();
        window.location.reload();
      }, 1000);
    }
  };

  // const { refetch: refetchPartnerLocations } = useQuery({
  //   queryKey: "getPartnerLocations",
  //   queryFn: () =>
  //     api.get(
  //       `${UrlRoute.getPartnerLocations}?page=0&pageSize=10&partnerId=${userData?.clientId}`
  //     ),
  //   enabled: false,
  // });

  const createPartnerLocation = async (
    refetchPartnerLocations,
    values,
    resetForm,
    setShowAddLocationModal
  ) => {
    try {
      const response = await postRequest.mutateAsync([
        UrlRoute.createPartnerLocation,
        values,
      ]);
      if (response) {
        refetchPartnerLocations();
      }

      setTimeout(() => {
        postRequest.reset();
        resetForm();
      }, 2000);
      setTimeout(() => {
        setShowAddLocationModal(false);
        window.location.reload();
      }, 2500);
    } catch (error) {
      setTimeout(() => {
        postRequest.reset();
        window.location.reload();
      }, 3000);
    }
  };

  const updatePartnerLocation = async (
    refetchPartnerLocations,
    values,
    resetForm,
    setShowUpdateLocationForm
  ) => {
    console.log("ghgfgfgxfg", values);
    try {
      const response = await putRequest.mutateAsync([
        UrlRoute.updatePartnerLocation,
        values,
      ]);
      if (response) {
        refetchPartnerLocations();
      }
      setTimeout(() => {
        putRequest.reset();
        resetForm();
      }, 2000);
      setTimeout(() => {
        setShowUpdateLocationForm(false);
      }, 2000);
    } catch (error) {
      console.log(error);
      setTimeout(() => {}, 3000);
    }
  };

  const partnerlocationActivator = async (
    activate,
    itemData,
    setActivateLocationModal,
    setShowSuccessResponse
  ) => {
    const data = {
      active: activate,
      id: itemData.id,
    };
    try {
      const response = await putRequest.mutateAsync([
        UrlRoute.activatePartnerLocation,
        data,
      ]);
      if (response) {
        setActivateLocationModal(false);
        setShowSuccessResponse(true);
      }
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        putRequest.reset();
      }, 3000);
    }
  };

  const createPartnerBank = async (values, resetForm, setShowAddBankModal) => {
    try {
      await postRequest.mutateAsync([UrlRoute.partnerBank, values]);
      setTimeout(() => {
        postRequest.reset();
        resetForm();
      }, 2000);
      setTimeout(() => {
        setShowAddBankModal(false);
        refetchGetAllPartnerBank();
      }, 2500);
    } catch (error) {
      setTimeout(() => {
        postRequest.reset();
      }, 3000);
    }
  };

  const forgetPasswordActivateOtp = async (values, history) => {
    try {
      const { data } = await putRequest.mutateAsync([
        UrlRoute.forgotPasswordActivateOtp,
        values,
      ]);
      history.push({
        pathname: "/new-password",
        state: data,
      });
    } catch (error) {
      setTimeout(() => {
        putRequest.reset();
      }, 3000);
    }
  };

  return {
    login,
    signUp,
    register,
    forgotPassword,
    allStateData,
    refetchGetAllState,
    refetchGetAllCountry,
    allCountryData,
    countryAreLoading,
    statesAreLoading,
    changePassword,
    refetchBusinessData,
    updatePartnerBussiness,
    forgetPasswordActivateOtp,
    refetchGetPartnerAssetsTypeProperty,
    createPartnerAssetType,
    refetchGetAssetsTypeProperty,
    refetchGetAllCategory,
    createPaymentTerms,
    refetchGetAllBanks,
    removePartnerBank,
    createPartnerBank,
    refetchGetAllPaymentTerms,
    refetchGetAllPartnerBank,
    removePaymentTerms,
    editPaymentTerms,
    allPartnerBankData,
    partnerBankAreLoading,
    partnerBankAreFetching,
    allPaymentTermsData,
    paymentTermsAreLoading,
    paymentTermsAreFetching,
    assetPropertyData,
    assetIsLoading,
    assetIsFetching,
    allBankIsLoading,
    allBankIsFetching,
    allBanksData,
    allCatgoryData,
    categoriesAreLoading,
    categoriesAreFetching,
    assetTypePropertyData,
    assetTypeIsLoading,
    assetTypeIsFetching,
    bussinessDataLoading,
    bussinessDataFetching,
    allbusinessData,
    createPartnerLocation,
    updatePartnerLocation,
    activatePartnerAssetType,
    updatePartnerAssetType,
    partnerlocationActivator,
    postRequest,
    putRequest,
  };
};

export default useAuthService;

// {
//   "accountNumber": "0070906892",
//   "bankId": 21,
//   "partnerId": 2
// }
