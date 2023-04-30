// import Prescription from "Component/Prescription";
import PaymentTable from "Component/PaymentTable";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import NewContext from "Context/createContext";
import "./style.scss";
import { useNavigate } from "react-router-dom";

const Payments = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [paymentList, setPaymentList] = useState([]);

  useEffect(() => {
    axiosPrivate.get("/payment/all")
      .then((res) => {
        const paymentData = res.data.data;
        setPaymentList(paymentData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <NewContext.Provider value={{ paymentList, setPaymentList }}>
        <div className="nav">
          <div>
            <p style={{ fontSize: "25px" }}>Medicines</p>
          </div>
        </div>
        <PaymentTable />
      </NewContext.Provider>
    </>
  );
};

export default Payments;
