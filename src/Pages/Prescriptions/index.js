import Prescription from "Component/Prescription";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import NewContext from "Context/createContext";
import "./style.scss";
const Prescriptions = () => {
  const axiosPrivate = useAxiosPrivate();
  const [prescriptionList, setPrescriptionList] = useState([]);
  useEffect(() => {
    axiosPrivate.get("/prescription/list/all")
      .then((res) => {
        const prescriptionData = res.data.data;
        setPrescriptionList(prescriptionData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <NewContext.Provider value={{ setPrescriptionList, prescriptionList }}>
        <div className="nav">
          <div>
            <p style={{ fontSize: "25px" }}>Prescription</p>
          </div>
        </div>
        <Prescription />
      </NewContext.Provider>
    </>
  );
};

export default Prescriptions;
