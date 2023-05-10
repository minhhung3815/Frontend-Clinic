// import { useLocation, Navigate, Outlet } from "react-router-dom";
// import useAuth from "Hook/useAuth";

// const PrivateRoute = ({ allowedRoles }) => {
//   const { isLogined } = useAuth();
//   const location = useLocation();

//   return isLogined ? (
//     <Outlet />
//   ) : (
//     <Navigate to="/login" state={{ from: location }} replace />
//   );
// };

// export default PrivateRoute;

import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "Hook/useAuth";
import { notification } from "antd";

const PrivateRoute = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  
  const getRenderContent = () => {
    if (allowedRoles?.includes(auth?.role)) {
      return <Outlet />;
    } else if (auth?.accessToken) {
      return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    } else {
      notification.warning({
        message: "Warning",
        description: "You need to log in to access this page",
      });
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  };

  return getRenderContent();
};

export default PrivateRoute;
