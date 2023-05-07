// import Prescription from "Component/Prescription";
import SentTable from "Component/SentTable";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import NewContext from "Context/createContext";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import Loading from "Layout/Loading";

const SentMail = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [sentList, setSentList] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleClick = () => {
    navigate("/new-request");
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getRequest = async () => {
      try {
        const response = await axiosPrivate.get("/request/user/requests", {
          signal: controller.signal,
        });
        isMounted && setSentList(response?.data?.data);
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
        {loading ? <Loading size="large" /> : <SentTable />}
      </NewContext.Provider>
    </>
  );
};

export default SentMail;
