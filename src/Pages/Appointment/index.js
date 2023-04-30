import TableAppointment from "Component/TableAppointment";
import React from "react";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import NewContext from "Context/createContext";
import "style.scss";

const Appointments = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [appointmentList, setAppointmentList] = useState([]);
  const [doctorList, setDoctorList] = useState([]);

  function handleClick() {
    navigate("/new-appointment");
  }
  useEffect(() => {
    axiosPrivate.get("/appointment/all")
      .then((res) => {
        const appointmentData = res.data.data;
        setAppointmentList(appointmentData);
      })
      .catch((error) => {
        console.error();
      });
  }, []);

  useEffect(() => {
    axiosPrivate.get("/user/account/doctor")
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
          <div>
            <Button
              type="primary"
              style={{ fontSize: "16px" }}
              onClick={handleClick}
            >
              Add appointment
            </Button>
          </div>
        </div>
        <TableAppointment />
      </NewContext.Provider>
    </>
  );
};

export default Appointments;
