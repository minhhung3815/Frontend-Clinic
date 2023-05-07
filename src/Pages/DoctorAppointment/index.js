import NewAppointmentModal from "Component/AppointmentModal";
import DoctorAptTable from "Component/DoctorAptTable";
import NewContext from "Context/createContext";
import useAuth from "Hook/useAuth";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import Loading from "Layout/Loading";
import { Button } from "antd";
import { useEffect, useState } from "react";
import "style.scss";

const DoctorAppointments = () => {
  const { auth } = useAuth();
  const [doctorName, setDoctorName] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [appointmentList, setAppointmentList] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getAppointments = async () => {
      try {
        const response = await axiosPrivate.get(`/appointment/doctor/all`, {
          signal: controller.signal,
        });
        isMounted && setAppointmentList(response?.data?.data);
      } catch (error) {
        console.log(error);
        // navigate("/login", { state: { from: location }, replace: true });
      } finally {
        setLoading(false);
      }
    };

    getAppointments();

    return () => {
      isMounted = false;
      controller.abort();
    };
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
        {loading ? (
          <Loading size="large" />
        ) : (
          <>
            <DoctorAptTable />
            <NewAppointmentModal />
          </>
        )}
      </NewContext.Provider>
    </>
  );
};

export default DoctorAppointments;
