import { Space, Table, Tag, Button } from 'antd'
// import { MoreOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.scss'
const TableUser = (props) => {
  const { list } = props
  const navigate = useNavigate()

  function handleClick(selectedId, role) {
    navigate(`/edit/account/${selectedId}`)
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Birth',
      dataIndex: 'date_of_birth',
      render: (date_of_birth) => {
        const date = new Date(date_of_birth)
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear()
        const formattedDate = `${day}/${month}/${year}`
        return formattedDate
      },
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Phone',
      dataIndex: 'phone_number',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Action',
      render: (_, record) => (
        <Space size='middle'>
          <Button
            type='link'
            onClick={() => {
              handleClick(record._id, record.role)
            }}
          >
            Edit
          </Button>
          <Button type='text'>Delete</Button>
        </Space>
      ),
    },
  ]
  const onChange = (pagination, sorter, extra) => {
    console.log('params', pagination, sorter, extra)
  }
  return (
    <>
      <div className='nav'>
        <div>
          <p style={{ fontSize: '25px' }}>Patients</p>
        </div>
        <div>
          <Button type='primary' style={{ fontSize: '16px' }} onClick={handleClick}>
            Add Patient
          </Button>
        </div>
      </div>
      <Table columns={columns} rowKey='_id' dataSource={list} onChange={onChange} />
    </>
  )
}

export default TableUser
