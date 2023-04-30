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

const PrivateRoute = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return allowedRoles?.includes(auth?.role) ? (
    <Outlet />
  ) : auth?.accessToken ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
