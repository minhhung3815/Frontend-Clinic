// import Prescription from "Component/Prescription";
import MedicineTable from "Component/MedicineTable";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import NewContext from "Context/createContext";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import Loading from "Layout/Loading";
import ServiceTable from "Component/ServiceTable";

const ServicesPage = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [serviceList, setServiceList] = useState([]);

  const handleClick = () => {
    navigate("/admin/new-service");
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getMedicine = async () => {
      try {
        const response = await axiosPrivate.get("/services/all", {
          signal: controller.signal,
        });
        isMounted && setServiceList(response?.data?.data);
      } catch (error) {
        console.log(error);
        // navigate("/login", { state: { from: location }, replace: true });
      } finally {
        setLoading(false);
      }
    };

    getMedicine();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <>
      <NewContext.Provider value={{ serviceList, setServiceList }}>
        <div className="nav">
          <div>
            <p style={{ fontSize: "25px" }}>Services</p>
          </div>
          <div>
            <PlusCircleOutlined
              type="primary"
              onClick={handleClick}
            />
          </div>
        </div>
        {loading ? <Loading size="large" /> : <ServiceTable />}
      </NewContext.Provider>
    </>
  );
};

export default ServicesPage;
