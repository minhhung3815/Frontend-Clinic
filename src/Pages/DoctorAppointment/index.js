import DoctorAptTable from "Component/DoctorAptTable";
import React from "react";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import NewContext from "Context/createContext";
import "style.scss";

const DoctorAppointments = () => {
  const navigate = useNavigate();
  const [appointmentList, setAppointmentList] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  function handleClick() {
    navigate("/new-appointment");
  }
  useEffect(() => {
    axiosPrivate
      .get(`/appointment/doctor/all`)
      .then((res) => {
        const appointmentData = res.data.data;
        setAppointmentList(appointmentData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <NewContext.Provider
        value={{
          appointmentList,
          setAppointmentList,
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
        <DoctorAptTable />
      </NewContext.Provider>
    </>
  );
};

export default DoctorAppointments;
