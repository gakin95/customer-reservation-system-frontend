import axios from "axios";
import { useMutation } from "react-query";
import { api } from "./api";

const useService = () => {
  const putRequest = useMutation(api.put);
  const postRequest = useMutation(api.post);

  const postHandler = async (url, values) => {
    console.log("got herererererreer")
    return await postRequest
      .mutateAsync([url, values])
      .then((res) => {
        return {
          data: res.data || [],
          status: res.status,
          message: res.message,
        };
      })
      .catch((err) => {
        console.log("er======================================",err)
        return {
          data: {},
          status: err.data.status,
          message: err?.data ? err.data.message : "Network Error",
        };
      });
  };

  const postFileHandler = async (url, values) => {
    return await axios({
      method: "post",
      url: url,
      data: values,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        return {
          data: res.data,
          status: true,
        };
      })
      .catch((err) => {
        return {
          data: "Something went wrong",
          status: false,
        };
      });
  };

  const putHandler = async (url, values) => {
    return await putRequest
      .mutateAsync([url, values])
      .then((res) => {
        return {
          data: res.data || [],
          status: res.status,
          message: res.message,
        };
      })
      .catch((err) => {
        return {
          data: {},
          status: err.data.status,
          message: err?.data ? err.data.message : "Network Error",
        };
      });
  };

  const getHandler = async (url) => {
    return await api
      .get(url)
      .then((res) => res)
      .catch((error) => error);
  };

  const deleteHandler = async (url) => {
    return await api
      .delete(url)
      .then((res) => res)
      .catch((error) => error);
  };

  return {
    postRequest,
    putRequest,
    postHandler,
    putHandler,
    getHandler,
    postFileHandler,
    deleteHandler
  };
};

export default useService;
