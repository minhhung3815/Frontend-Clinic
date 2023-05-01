import AppLayout from "Layout/AppLayout";
import Dashboard from "Pages/Dashboard";
import Doctors from "Pages/Doctors";
import Edit from "Pages/Edit";
import EditDoctor from "Pages/EditDoctor";
import Users from "Pages/Patients";
import Managers from "Pages/Managers";
import Appointments from "Pages/Appointment";
import DoctorsSchedule from "Pages/DoctorsSchedule";
import NewAppointment from "Pages/Create appointment";
import EditAppointment from "Pages/EditAppointment";
import Prescriptions from "Pages/Prescriptions";
import WorkCalendar from "Pages/WorkCalendar";
import NotFound from "Pages/Errors/NotFound";
import CreateDoctor from "Pages/CreateDoctor";
import CreateWorkingSchedule from "Pages/CreateWorkingSchedule";
import EditSchedule from "Pages/EditSchedule";
import CreateUserAndAdmin from "Pages/CreateUserAndAdmin";
import NewPrescription from "Pages/NewPrescription";
import NewMedicine from "Pages/CreateMedicine";
import Medicines from "Pages/Medicines";
import EditMedicine from "Pages/EditMedicine";
import Payments from "Pages/Payment";
import DoctorAppointments from "Pages/DoctorAppointment";
import CreateRequest from "Pages/CreateRequest";
import SentMail from "Pages/MailSent";
import InboxMail from "Pages/MailInbox";
import LoginPage from "Pages/Login";
import PersistLogin from "Route/persistLogin";
import Unauthorized from "Pages/Errors/Unauthorized";
import Error500 from "Pages/Errors/500Error";
import { Navigate, Route, Routes } from "react-router-dom";
import "./style.scss";
import PrivateRoute from "Route/privateRoute";
import RegisterPage from "Pages/Register";

const roles = {
  role1: "manager",
  role2: "doctor",
  role3: "user",
};
{
  /* <Route path="/" element={<Navigate to="/dashboard" />} /> */
}

const App = () => {
  return (
    <Routes>
      {/** public routes */}
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/notfound" element={<NotFound />} />
      <Route path="/error500" element={<Error500 />} />

      {/** protected routes */}
      <Route element={<PersistLogin />}>
        <Route path="/" element={<AppLayout />}>
          <Route element={<PrivateRoute allowedRoles={[roles.role1]} />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role1]} />}>
            <Route path="doctors" element={<Doctors />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role1]} />}>
            <Route path="users" element={<Users />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role1]} />}>
            <Route path="managers" element={<Managers />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role1]} />}>
            <Route path="edit/account/:userId" element={<Edit />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role1]} />}>
            <Route path="edit/doctor/:userId" element={<EditDoctor />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role1]} />}>
            <Route path="appointments" element={<Appointments />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role1]} />}>
            <Route
              path="edit-appointment/:appointmentId"
              element={<EditAppointment />}
            />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role1]} />}>
            <Route path="schedule" element={<DoctorsSchedule />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role1]} />}>
            <Route
              path="edit-schedule/:scheduleId"
              element={<EditSchedule />}
            />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role1]} />}>
            <Route path="new-appointment" element={<NewAppointment />} />
          </Route>
          <Route
            element={<PrivateRoute allowedRoles={[roles.role1, roles.role2]} />}
          >
            <Route path="prescriptions" element={<Prescriptions />} />
          </Route>
          <Route
            element={<PrivateRoute allowedRoles={[roles.role1, roles.role2]} />}
          >
            <Route path="prescriptions/:id" />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role1]} />}>
            <Route path="payment" element={<Payments />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role1]} />}>
            <Route path="payment/:id" />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role1]} />}>
            <Route path="calendar" element={<WorkCalendar />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role1]} />}>
            <Route path="medicines" element={<Medicines />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role1]} />}>
            <Route path="medicines/:medicineId" element={<EditMedicine />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role1]} />}>
            <Route path="new-user" element={<CreateUserAndAdmin />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role1]} />}>
            <Route path="new-doctor" element={<CreateDoctor />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role1]} />}>
            <Route path="request/inbox" element={<InboxMail />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role2]} />}>
            <Route path="request/sent" element={<SentMail />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role1]} />}>
            <Route path="new-medicine" element={<NewMedicine />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role1]} />}>
            <Route path="new-schedule" element={<CreateWorkingSchedule />} />
          </Route>
          <Route
            element={<PrivateRoute allowedRoles={[roles.role2, roles.role2]} />}
          >
            <Route
              path="doctor/appointments"
              element={<DoctorAppointments />}
            />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role2]} />}>
            <Route path="new-prescription" element={<NewPrescription />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role2]} />}>
            <Route path="new-request" element={<CreateRequest />} />
          </Route>
        </Route>
      </Route>
      {/* Catch all path */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
