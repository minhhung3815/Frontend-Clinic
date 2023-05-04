import axios from "axios";
import Axios from "../Axios/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const jwt = localStorage.getItem("jwt");
    const response = await Axios.post(
      "/refresh",
      { jwt },
      {
        withCredentials: true,
      }
    );
    setAuth((prev) => {
      return {
        ...prev,
        role: response?.data?.role,
        accessToken: response?.data?.accessToken,
        email: response?.data?.email,
        username: response?.data?.username,
        id: response?.data?.id,
      };
    });
    return response?.data?.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
