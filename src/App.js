import AppLayout from "Layout/AppLayout";
import Appointments from "Pages/Appointment";
import Contact from "Pages/Contact";
import CreateDoctor from "Pages/CreateDoctor";
import NewMedicine from "Pages/CreateMedicine";
import CreateRequest from "Pages/CreateRequest";
import CreateUserAndAdmin from "Pages/CreateUserAndAdmin";
import CreateWorkingSchedule from "Pages/CreateWorkingSchedule";
import Dashboard from "Pages/Dashboard";
import DoctorAppointments from "Pages/DoctorAppointment";
import DoctorDetail from "Pages/DoctorProfile";
import Doctors from "Pages/Doctors";
import DoctorsList from "Pages/DoctorsList";
import DoctorsSchedule from "Pages/DoctorsSchedule";
import RoomScheduler from "Pages/DrSchedule";
import Edit from "Pages/Edit";
import EditAppointment from "Pages/EditAppointment";
import EditDoctor from "Pages/EditDoctor";
import EditMedicine from "Pages/EditMedicine";
import EditRequest from "Pages/EditResponse";
import EditSchedule from "Pages/EditSchedule";
import Error500 from "Pages/Errors/500Error";
import NotFound from "Pages/Errors/NotFound";
import Unauthorized from "Pages/Errors/Unauthorized";
import Home from "Pages/Home";
import LoginPage from "Pages/Login";
import InboxMail from "Pages/MailInbox";
import SentMail from "Pages/MailSent";
import Managers from "Pages/Managers";
import Medicines from "Pages/Medicines";
import NewPrescription from "Pages/NewPrescription";
import Users from "Pages/Patients";
import Payments from "Pages/Payment";
import Prescriptions from "Pages/Prescriptions";
import RegisterPage from "Pages/Register";
// import Services from "Pages/Services";
import SuccessfulPayment from "Pages/SuccessfulPayment";
import EditPrescription from "Pages/UpdatePrescription";
import UserAppointment from "Pages/UserAppointment";
import UserPay from "Pages/UserPay";
import UserSchedule from "Pages/UserSchedule";
import ViewRequest from "Pages/ViewResponse";
import PersistLogin from "Route/persistLogin";
import PrivateRoute from "Route/privateRoute";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import "./style.scss";

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
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/notfound" element={<NotFound />} />
      <Route path="/error500" element={<Error500 />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<AppLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="" element={<Navigate to="/home" />} />
        {/* <Route path="/services" element={<Services />} /> */}
        <Route path="/doctors" element={<DoctorsList />} />
        <Route path="/doctors/:id" element={<DoctorDetail />} />
        <Route path="/contact" element={<Contact />} />
        {/** protected routes */}
        <Route element={<PersistLogin />}>
          <Route
            element={
              <PrivateRoute
                allowedRoles={[roles.role1, roles.role2, roles.role3]}
              />
            }
          >
            <Route path="/appointments" element={<UserAppointment />} />
          </Route>
          <Route
            element={
              <PrivateRoute
                allowedRoles={[roles.role1, roles.role2, roles.role3]}
              />
            }
          >
            <Route path="/appointment-schedule" element={<UserSchedule />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role3]} />}>
            <Route path="/user-payment/:appointmentId" element={<UserPay />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role3]} />}>
            <Route path="/payment/execute-payment" element={<SuccessfulPayment />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role3]} />}>
            <Route path="/payment/cancel-payment" element={<cA />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role1]} />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role1]} />}>
            <Route path="/admin/doctors" element={<Doctors />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role1]} />}>
            <Route path="/admin/users" element={<Users />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role1]} />}>
            <Route path="/admin/managers" element={<Managers />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role1]} />}>
            <Route path="/admin/edit/account/:userId" element={<Edit />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role1]} />}>
            <Route path="/admin/edit/doctor/:userId" element={<EditDoctor />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role1]} />}>
            <Route path="/admin/appointments" element={<Appointments />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role1]} />}>
            <Route
              path="/admin/edit-appointment/:appointmentId"
              element={<EditAppointment />}
            />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role1]} />}>
            <Route path="/admin/schedule" element={<DoctorsSchedule />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role1]} />}>
            <Route
              path="/admin/edit-schedule/:scheduleId"
              element={<EditSchedule />}
            />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role1]} />}>
            <Route path="/admin/prescriptions" element={<Prescriptions />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role2]} />}>
            <Route path="edit-prescription" element={<EditPrescription />} />
          </Route>
          <Route
            element={<PrivateRoute allowedRoles={[roles.role1, roles.role2]} />}
          >
            <Route path="prescriptions/:id" />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role1]} />}>
            <Route path="/admin/payment" element={<Payments />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role1]} />}>
            <Route path="/admin/payment/:id" />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role1]} />}>
            <Route path="/admin/medicines" element={<Medicines />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role1]} />}>
            <Route
              path="/admin/medicines/:medicineId"
              element={<EditMedicine />}
            />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role1]} />}>
            <Route path="/admin/new-user" element={<CreateUserAndAdmin />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role1]} />}>
            <Route path="/admin/new-doctor" element={<CreateDoctor />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role1]} />}>
            <Route path="/admin/request/inbox" element={<InboxMail />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role1]} />}>
            <Route
              path="/admin/request/inbox/:requestId"
              element={<EditRequest />}
            />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role2]} />}>
            <Route path="request/sent" element={<SentMail />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role2]} />}>
            <Route path="request/sent/:requestId" element={<ViewRequest />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role1]} />}>
            <Route path="/admin/new-medicine" element={<NewMedicine />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role1]} />}>
            <Route
              path="/admin/new-schedule"
              element={<CreateWorkingSchedule />}
            />
          </Route>
          <Route
            element={<PrivateRoute allowedRoles={[roles.role1, roles.role2]} />}
          >
            <Route
              path="doctor/appointments"
              element={<DoctorAppointments />}
            />
          </Route>
          <Route
            element={<PrivateRoute allowedRoles={[roles.role1, roles.role2]} />}
          >
            <Route path="doctor/schedule" element={<RoomScheduler />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role2]} />}>
            <Route path="new-prescription" element={<NewPrescription />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[roles.role2]} />}>
            <Route path="new-request" element={<CreateRequest />} />
          </Route>
          {/* </Route> */}
          {/* Catch all path */}
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
