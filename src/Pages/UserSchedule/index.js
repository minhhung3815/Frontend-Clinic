import DoctorAppointmentModal from "Component/DoctorAppointmentModal";
import UserAppointmentModal from "Component/UserAppointmentModal";
import UserEditAppointmentModal from "Component/UserEditAppointmentModal";
import ViewAppointment from "Component/ViewAppointmentModal";
import NewContext from "Context/createContext";
import useAuth from "Hook/useAuth";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import moment from "moment";
import "moment/locale/en-gb";
import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const UserSchedule = () => {
  const { auth } = useAuth();
  const [appointments, setAppointment] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointmentData, setAppointmentData] = useState({});
  const handleSelectEvent = (event) => {
    setAppointmentData(event);
    setIsModalOpen(true);
  };

  const events = appointments.map((data) => {
    return {
      title: `${data?.appointmentId} - ${data?.doctor_name}`,
      start: moment(data?.startTime).toDate(),
      end: moment(data?.endTime).toDate(),
      ...data,
    };
  });

  useEffect(() => {
    const getSchedule = async () => {
      try {
        const response = await axiosPrivate.get(`/appointment/user/all`);
        setAppointment(response?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    getSchedule();
  }, []);

  return (
    <NewContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        appointmentData,
        setAppointmentData,
      }}
    >
      <Calendar
        defaultView="week"
        views={["month", "week", "day"]}
        style={{ height: "94vh", color: "black" }}
        events={events}
        localizer={localizer}
        min={moment("2023-03-18T07:00:00").toDate()}
        max={moment("2023-03-18T18:00:00").toDate()}
        onSelectEvent={handleSelectEvent}
        selectable={false}
      />
      <UserEditAppointmentModal />
    </NewContext.Provider>
  );
};

export default UserSchedule;
