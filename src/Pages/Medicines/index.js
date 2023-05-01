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

const Medicines = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [medicineList, setMedicineList] = useState([]);

  const handleClick = () => {
    navigate("/new-medicine");
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getMedicine = async () => {
      try {
        const response = await axiosPrivate.get("/medicine/all", {
          signal: controller.signal,
        });
        isMounted && setMedicineList(response?.data?.data);
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
      <NewContext.Provider value={{ medicineList, setMedicineList }}>
        <div className="nav">
          <div>
            <p style={{ fontSize: "25px" }}>Medicines</p>
          </div>
          <div>
            <PlusCircleOutlined
              type="primary"
              style={{ fontSize: "16px" }}
              onClick={handleClick}
            />
          </div>
        </div>
        {loading ? <Loading size="large" /> : <MedicineTable />}
      </NewContext.Provider>
    </>
  );
};

export default Medicines;
