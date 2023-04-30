import TableUser from "Component/TableUser";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import UserContext from "Context/createContext";
import { Button } from "antd";

const Patients = () => {
  const [userList, setUserList] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    axiosPrivate.get("/user/account/user")
      .then((res) => {
        setUserList(res.data.data);
      })
      .catch((error) => {
        console.log(error);
        // navigate('/error')
      });
  }, []);
  return (
    <>
      <UserContext.Provider value={{ userList, setUserList }}>
        <TableUser  />
      </UserContext.Provider>
    </>
  );
};

export default Patients;
