import TableManager from "Component/TableAdmin";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import UserContext from "Context/createContext";
import { Button, Table } from "antd";

const Managers = () => {
  const axiosPrivate = useAxiosPrivate();
  const [managerList, setManagerList] = useState([]);
  useEffect(() => {
    axiosPrivate.get("/user/account/manager")
      .then((res) => {
        setManagerList(res.data.data);
      })
      .catch((error) => {
        console.log(error);
        // navigate('/error')
      });
  }, []);
  return (
    <>
      <UserContext.Provider value={{ managerList, setManagerList }}>
        <TableManager />
      </UserContext.Provider>
    </>
  );
};

export default Managers;
