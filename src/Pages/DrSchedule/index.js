import { useEffect, useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import Toolbar from "react-big-calendar/lib/Toolbar";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import moment from "moment";
import "moment/locale/en-gb";
import NewContext from "Context/createContext";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ViewAppointment from "Component/ViewAppointmentModal";
import useAuth from "Hook/useAuth";
import NewAppointmentModal from "Component/AppointmentModal";
import DoctorAppointmentModal from "Component/DoctorAppointmentModal";

const localizer = momentLocalizer(moment);

const WorkCalendar = () => {
  const { auth } = useAuth();
  const [appointments, setAppointment] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointmentData, setAppointmentData] = useState({});
  const [newEvent, setNewEvent] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [view, setView] = useState(false);
  const [add, setAdd] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [currentView, setCurrentView] = useState("month");
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

  const calendarConfig = {
    month: {
      selectable: false,
    },
  };

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
        onView={(view) => {
          console.log(view);
          setCurrentView(view);
        }}
      />
      {view === true && <ViewAppointment />}
      {add === true && <DoctorAppointmentModal />}
    </NewContext.Provider>
  );
};

export default WorkCalendar;
