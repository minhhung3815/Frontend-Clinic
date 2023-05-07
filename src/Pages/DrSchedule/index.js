import DoctorAppointmentModal from "Component/DoctorAppointmentModal";
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

const WorkCalendar = () => {
  const { auth } = useAuth();
  const [appointments, setAppointment] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointmentData, setAppointmentData] = useState({});
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [view, setView] = useState(false);
  const [add, setAdd] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const handleSelectEvent = (event) => {
    setAppointmentData(event);
    setIsModalOpen(true);
    setView(true);
  };

  const handleSelectSlot = (slotInfo) => {
    setStartTime(slotInfo.start);
    setEndTime(slotInfo.end);
    setIsModalOpen(true);
    setAdd(true);
    setDoctorName(auth?.username);
    setSelectedDoctor(auth?.id);
  };

  const events = appointments.map((data) => {
    return {
      title: `${data?.appointmentId} - ${data?.patient_name}`,
      start: moment(data?.startTime).toDate(),
      end: moment(data?.endTime).toDate(),
      ...data,
    };
  });

  useEffect(() => {
    const getSchedule = async () => {
      try {
        const response = await axiosPrivate.get(`/appointment/doctor/all`);
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
        setAppointment,
        selectedDoctor,
        setDoctorName,
        doctorName,
        view,
        add,
        setView,
        setAdd,
        startTime,
        setStartTime,
        endTime,
        setEndTime,
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
        onSelectSlot={handleSelectSlot}
        selectable={true}
      />
      {view === true && <ViewAppointment />}
      {add === true && <DoctorAppointmentModal />}
    </NewContext.Provider>
  );
};

export default WorkCalendar;
