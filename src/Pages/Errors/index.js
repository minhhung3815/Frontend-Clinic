import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import useAuth from "Hook/useAuth";

const ErrorHandler = (error) => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  if (error?.resonse?.status === 404) {
    return navigate("/notfound");
  } else if (error?.response?.status === 400) {
    return notification.error({
      message: "Error",
      description: error?.response?.data,
    });
  } else if (error?.response?.status === 403) {
    return navigate("/unauthorized");
  } else if (error?.response?.status === 401) {
    localStorage.removeItem("jwt");
    localStorage.removeItem("persist");
    setAuth({});
    navigate("/login");
  } else {
    return navigate("/error500");
  }
};

export default ErrorHandler;
