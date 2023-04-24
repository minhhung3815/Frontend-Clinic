import { Space, Table, Tag, Button } from 'antd';
import { MoreOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
const TableAppointment = () => {
  const navigate = useNavigate()
  function handleClick() {
    navigate('/edit-appointment')
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Patient Name',
      dataIndex: 'patient',
      key: 'patient',
      render: (text) => <div>{text}</div>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Doctor Name',
      key: 'doctor',
      dataIndex: 'doctor',
      render: (text) => <div>{text}</div>,
    },
    {
      title: 'Appointment Date',
      key: 'date',
      dataIndex: 'date',
    },
    {
      title: 'Appointment Time',
      key: 'time',
      dataIndex: 'time',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (_, { status }) => (
        <>
          {status.map((tag) => {
            let color = 'green';
            if (tag === 'Inactive') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      render: (_, record) => (
        <Space size="middle">
          <Button type='link' onClick={handleClick}>Edit</Button>
          <Button type='text'>Delete</Button>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: '1',
      id: 'APT001',
      patient: 'John Brown',
      age: 32,
      doctor: 'John Brown',
      date: '30 Dec 2018',
      time: '10:00am - 11:00am',
      status: ['Active'],
    },
    {
      key: '2',
      id: 'APT002',
      patient: 'John Brown',
      age: 32,
      doctor: 'John Brown',
      date: '30 Dec 2018',
      time: '10:00am - 11:00am',
      status: ['Inactive'],
    },
    {
      key: '3',
      id: 'APT004',
      patient: 'John Brown',
      age: 32,
      doctor: 'John Brown',
      date: '30 Dec 2018',
      time: '10:00am - 11:00am',
      status: ['Inactive'],
    },
  ]
  return (
    <Table columns={columns} dataSource={data} />
  )
}

export default TableAppointment