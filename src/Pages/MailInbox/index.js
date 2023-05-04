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

const InboxMail = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [requestList, setRequestList] = useState([]);

  useEffect(() => {
    axiosPrivate
      .get("/request/admin/requests")
      .then((res) => {
        const requestData = res.data.data;
        setRequestList(requestData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <NewContext.Provider value={{ requestList, setRequestList }}>
        <div className="nav">
          <div>
            <p style={{ fontSize: "25px" }}>Requests</p>
          </div>
        </div>
        <InboxTable />
      </NewContext.Provider>
    </>
  );
};

export default InboxMail;
