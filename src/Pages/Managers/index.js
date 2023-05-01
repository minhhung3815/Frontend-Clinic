import TableManager from "Component/TableAdmin";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import UserContext from "Context/createContext";
import { Button, Table, notification } from "antd";
import ErrorHandler from "Pages/Errors";
import Loading from "Layout/Loading";

const Managers = () => {
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(true);
  const [managerList, setManagerList] = useState([]);
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getManager = async () => {
      try {
        const response = await axiosPrivate.get("/user/account/manager", {
          signal: controller.signal,
        });
        isMounted && setManagerList(response?.data?.data);
      } catch (error) {
        ErrorHandler(error);
      } finally {
        setLoading(false);
      }
    };

    getManager();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <>
      <UserContext.Provider value={{ managerList, setManagerList }}>
        {loading ? <Loading size="large" /> : <TableManager />}
      </UserContext.Provider>
    </>
  );
};

export default Managers;
