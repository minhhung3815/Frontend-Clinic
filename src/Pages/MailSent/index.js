// import Prescription from "Component/Prescription";
import SentTable from "Component/SentTable";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import NewContext from "Context/createContext";
import "./style.scss";
import { useNavigate } from "react-router-dom";

const SentMail = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [sentList, setSentList] = useState([]);

  const handleClick = () => {
    navigate("/new-request");
  };

  useEffect(() => {
    axiosPrivate
      .get("/request/user/requests")
      .then((res) => {
        const sentData = res?.data?.data;
        setSentList(sentData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <NewContext.Provider value={{ sentList, setSentList }}>
        <div className="nav">
          <div>
            <p style={{ fontSize: "25px" }}>Sent Requests</p>
          </div>
          <div>
            <PlusCircleOutlined
              type="primary"
              style={{ fontSize: "16px" }}
              onClick={handleClick}
            />
          </div>
        </div>
        <SentTable />
      </NewContext.Provider>
    </>
  );
};

export default SentMail;
