import AppLayout from 'Layout/AppLayout'
import Dashboard from 'Pages/Dashboard'
import Doctors from 'Pages/Doctors'
import Edit from 'Pages/Edit'
import EditDoctor from 'Pages/EditDoctor'
import Patients from 'Pages/Patients'
import Appointments from 'Pages/Appointment'
import DoctorsSchedule from 'Pages/DoctorsSchedule'
import EditAppointment from 'Pages/Edit appointment'
import Prescriptions from 'Pages/Prescriptions'
import WorkCalendar from 'Pages/WorkCalendar'
import NotFound from 'Pages/Errors/NotFound'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './style.scss'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<Navigate to='/dashboard' />} />
        <Route path='' element={<AppLayout />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='doctors' element={<Doctors />} />
          <Route path='patients' element={<Patients />} />
          <Route path='edit/account/:userId' element={<Edit />} />
          <Route path='edit/doctor/:userId' element={<Edit />} />
          <Route path='appointments' element={<Appointments />} />
          <Route path='schedule' element={<DoctorsSchedule />} />
          <Route path='edit-appointment' element={<EditAppointment />} />
          <Route path='prescriptions' element={<Prescriptions />} />
          <Route path='calendar' element={<WorkCalendar />} />
        </Route>
        <Route path='error' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
