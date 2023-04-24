import React, { useState } from 'react'
import { Button, Card, Col, Row, Popover } from 'antd'
import { MoreOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { EditOutlined, EllipsisOutlined, DeleteFilled } from '@ant-design/icons'
import './style.scss'
const DoctorCard = (props) => {
  const { list } = props
  console.log(list)
  const navigate = useNavigate()
  function handleClick() {
    navigate('/edit/doctor')
  }
  const listData = [
    {
      name: 'Cristina Groves',
      staff: 'Gynecologist',
      address: 'United States, San Francisco',
    },
    {
      name: 'Cristina Groves',
      staff: 'Gynecologist',
      address: 'United States, San Francisco',
    },
    {
      name: 'Cristina Groves',
      staff: 'Gynecologist',
      address: 'United States, San Francisco',
    },
    {
      name: 'Cristina Groves',
      staff: 'Gynecologist',
      address: 'United States, San Francisco',
    },
  ]

  // const [open, setOpen] = useState(false);
  // const hide = () => {
  //   setOpen(false);
  // };
  // const handleOpenChange = (newOpen) => {
  //   setOpen(newOpen);
  // };

  return (
    <Row gutter={16}>
      {listData.map((data, i) => (
        <Col span={8} key={i}>
          <Card
            className='doctor-card'
            actions={[<EditOutlined key='edit' onClick={handleClick} />, <DeleteFilled key='delete' />]}
          >
            <div className='avatar'>
              <img src='https://www.felixhospital.com/sites/default/files/2022-11/dr-dk-gupta.jpg' alt='qwe' />
            </div>
            <div className='name'>{data.name}</div>
            <div className='staff'>{data.staff}</div>
            <div className='address'>{data.address}</div>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default DoctorCard
