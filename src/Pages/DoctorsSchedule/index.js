import TableSchedule from 'Component/TableSchedule';
import './style.scss';
import { Button } from 'antd';
const DoctorsSchedule = () => {
  return (
    <>
      <div className='nav'>
        <div><p style={{fontSize:'25px'}}>Schedule</p></div>
        <div><Button type="primary" style={{fontSize:'16px'}}>Add Schedule</Button></div>
      </div>
      <TableSchedule />
    </>

  )
}

export default DoctorsSchedule