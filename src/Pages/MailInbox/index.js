// import Prescription from "Component/Prescription";
import MedicineTable from "Component/MedicineTable";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import NewContext from "Context/createContext";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import InboxTable from "Component/InboxTable";
import Loading from "Layout/Loading";

const InboxMail = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [requestList, setRequestList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getRequest = async () => {
      try {
        const response = await axiosPrivate.get("/request/admin/requests", {
          signal: controller.signal,
        });
        isMounted && setRequestList(response?.data?.data);
      } catch (error) {
        console.log(error);
        // navigate("/login", { state: { from: location }, replace: true });
      } finally {
        setLoading(false);
      }
    };

    getRequest();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <>
      <NewContext.Provider value={{ requestList, setRequestList }}>
        <div className="nav">
          <div>
            <p style={{ fontSize: "25px" }}>Requests</p>
          </div>
        </div>
        {loading ? <Loading size="large" /> : <InboxTable />}
      </NewContext.Provider>
    </>
  );
};

export default InboxMail;
