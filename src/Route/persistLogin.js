import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "Hook/useRefreshToken";
import useAuth from "Hook/useAuth";
import Loading from "Layout/Loading";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  return (
    <>
      {!persist ? (
        <Outlet />
      ) : isLoading ? (
        <Loading size="large" />
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
