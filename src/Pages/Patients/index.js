import TableUser from "Component/TableUser";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import UserContext from "Context/createContext";
import Loading from "Layout/Loading";

const Patients = () => {
  const [loading, setLoading] = useState(true);
  const [userList, setUserList] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUser = async () => {
      try {
        const response = await axiosPrivate.get("/user/account/user", {
          signal: controller.signal,
        });
        isMounted && setUserList(response.data?.data);
      } catch (error) {
        console.log(error);
        // navigate("/login", { state: { from: location }, replace: true });
      } finally {
        setLoading(false);
      }
    };

    getUser();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <>
      <UserContext.Provider value={{ userList, setUserList }}>
        {loading ? <Loading size="large" /> : <TableUser />}
      </UserContext.Provider>
    </>
  );
};

export default Patients;
