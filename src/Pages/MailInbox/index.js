// import Prescription from "Component/Prescription";
import MedicineTable from "Component/MedicineTable";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import NewContext from "Context/createContext";
import "./style.scss";
import { useNavigate } from "react-router-dom";

const InboxMail = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [medicineList, setMedicineList] = useState([]);

  const handleClick = () => {
    navigate("/new-medicine");
  };

  useEffect(() => {
    axiosPrivate.get("/medicine/all")
      .then((res) => {
        const medicineData = res.data.data;
        setMedicineList(medicineData);
      })
      .catch((error) => {
        console.log(error);
      });
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
        <MedicineTable />
      </NewContext.Provider>
    </>
  );
};

export default InboxMail;
