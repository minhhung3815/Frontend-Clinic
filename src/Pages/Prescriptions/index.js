import Prescription from "Component/Prescription";
import React from 'react'
import { Button } from 'antd';
import './style.scss';
const Prescriptions = () => {
    return (
      <>
        <div className='nav'>
            <div><p style={{fontSize:'25px'}}>Prescription</p></div>
        </div>
        <Prescription />
      </>
    )
  }
  
export default Prescriptions

