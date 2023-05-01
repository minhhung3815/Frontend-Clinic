import TableAppointment from "Component/TableAppointment";
import React from "react";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import NewContext from "Context/createContext";
import "style.scss";
import Loading from "Layout/Loading";

const Appointments = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [appointmentList, setAppointmentList] = useState([]);
  const [doctorList, setDoctorList] = useState([]);

  function handleClick() {
    navigate("/new-appointment");
  }
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getAppointment = async () => {
      try {
        const response = await axiosPrivate.get("/appointment/all", {
          signal: controller.signal,
        });
        isMounted && setAppointmentList(response?.data?.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    getAppointment();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    axiosPrivate
      .get("/user/account/doctor")
      .then((res) => {
        const doctorData = res.data.data;
        setDoctorList(doctorData);
      })
      .catch((error) => {
        console.error();
      });
  }, []);
  return (
    <>
      <NewContext.Provider
        value={{
          appointmentList,
          setAppointmentList,
          doctorList,
          setDoctorList,
        }}
      >
        <div className="nav">
          <div>
            <p style={{ fontSize: "25px" }}>Appointments</p>
          </div>
          {/* <div>
            <Button
              type="primary"
              style={{ fontSize: "16px" }}
              onClick={handleClick}
            >
              Add appointment
            </Button>
          </div> */}
        </div>
        {loading ? <Loading size="large" /> : <TableAppointment />}
      </NewContext.Provider>
    </>
  );
};

export default Appointments;
