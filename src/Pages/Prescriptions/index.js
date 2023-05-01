import Prescription from "Component/Prescription";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import NewContext from "Context/createContext";
import "./style.scss";
import Loading from "Layout/Loading";
const Prescriptions = () => {
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  const [prescriptionList, setPrescriptionList] = useState([]);
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getPrescription = async () => {
      try {
        const response = await axiosPrivate.get("/prescription/list/all");
        isMounted && setPrescriptionList(response?.data?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getPrescription();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <>
      <NewContext.Provider value={{ setPrescriptionList, prescriptionList }}>
        <div className="nav">
          <div>
            <p style={{ fontSize: "25px" }}>Prescription</p>
          </div>
        </div>
        {loading ? <Loading size="large" /> : <Prescription />}
      </NewContext.Provider>
    </>
  );
};

export default Prescriptions;
