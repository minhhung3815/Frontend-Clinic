// import Prescription from "Component/Prescription";
import PaymentTable from "Component/PaymentTable";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import NewContext from "Context/createContext";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import Loading from "Layout/Loading";

const Payments = () => {
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [paymentList, setPaymentList] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getPayment = async () => {
      try {
        const response = await axiosPrivate.get("/payment/all", {
          signal: controller.signal,
        });
        isMounted && setPaymentList(response?.data?.data);
      } catch (error) {
        console.log(error);
        // navigate("/login", { state: { from: location }, replace: true });
      } finally {
        setLoading(false);
      }
    };

    getPayment();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <>
      <NewContext.Provider value={{ paymentList, setPaymentList }}>
        <div className="nav">
          <div>
            <p style={{ fontSize: "25px" }}>Transactions</p>
          </div>
        </div>
        {loading ? <Loading size="large" /> : <PaymentTable />}
      </NewContext.Provider>
    </>
  );
};

export default Payments;
