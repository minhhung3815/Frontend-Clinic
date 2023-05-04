import DoctorAptTable from "Component/DoctorAptTable";
import React from "react";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import NewContext from "Context/createContext";
import useAuth from "Hook/useAuth";
import "style.scss";
import NewAppointmentModal from "Component/AppointmentModal";

const DoctorAppointments = () => {
  const { auth } = useAuth();
  const [doctorName, setDoctorName] = useState("");
  const navigate = useNavigate();
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [appointmentList, setAppointmentList] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          isModalOpen,
          setIsModalOpen,
          appointmentList,
          setAppointmentList,
          selectedDoctor,
          setDoctorName,
          doctorName,
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
              onClick={() => {
                setIsModalOpen(true);
                setDoctorName(auth?.username);
                setSelectedDoctor(auth?.id);
              }}
            >
              Add appointment
            </Button>
          </div>
        </div>
        <DoctorAptTable />
        <NewAppointmentModal />
      </NewContext.Provider>
    </>
  );
};

export default DoctorAppointments;
