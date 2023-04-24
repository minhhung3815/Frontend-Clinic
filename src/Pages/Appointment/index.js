import TableAppointment from 'Component/TableAppointment'
import React from 'react'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import 'style.scss'
const Appointments = () => {
  const navigate = useNavigate()
  function handleClick() {
    navigate('/edit-appointment')
  }
  return (
    <>
    <div className='nav'>
        <div><p style={{fontSize:'25px'}}>Appointments</p></div>
        <div><Button type="primary" style={{fontSize:'16px'}} onClick={handleClick}>Add appointment</Button></div>
      </div>
      <TableAppointment />
    </>
   
  )
}

export default Appointments