import React from 'react'
import { Card, Col, Row } from 'antd';
import './style.scss'
const CardList = () => {
  const listData = [
    {
      name: 'Doctors',
      color: '#009EFB',
      number: '98'
    },
    {
      name: 'Patients',
      color: '#55CE63',
      number: '1072'
    },
    {
      name: 'Attend',
      color: '#7A92A3',
      number: '98'
    },
    {
      name: 'Pending',
      color: '#FFBC35',
      number: '98'
    }
  ]
  return (
    <Row gutter={16}>
      {listData.map(data => (
        <Col span={6} key={data.color}>
          <Card className='card-item'>
            <div className='circle' style={{ background: data.color }} />
            <div className='content'>
              <div className='total'>{data.number}</div>
              <div className='button' style={{ background: data.color }}>{data.name}</div>
            </div>

          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default CardList