import DoctorCard from 'Component/DoctorCard'
import './style.scss'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Axios from "../../Axios/axios";
const Doctors = () => {
  const navigate = useNavigate()
  const [doctorList, setDoctorList] = useState([])
  function handleClick() {
    navigate('/edit')
  }
  useEffect(() => {
    Axios.get('/user/account/doctor')
      .then((res) => {
        setDoctorList(res.data.data)
      })
      .catch((error) => {
        console.log(error)
        // navigate('/error')
      })
  }, [])
  return (
    <>
      <div className='nav'>
        <div>
          <p style={{ fontSize: '25px' }}>Doctors</p>
        </div>
        <div>
          <Button type='primary' style={{ fontSize: '16px' }} onClick={handleClick}>
            Add Doctor
          </Button>
        </div>
      </div>
      <DoctorCard list={doctorList} />
    </>
  )
}

export default Doctors
