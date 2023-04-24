import { Space, Table, Tag } from 'antd';
import { CloudDownloadOutlined, EyeFilled, DeleteFilled} from '@ant-design/icons'
const Prescription = () => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key:'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Created By',
      dataIndex: 'doctor',
      key: 'doctor',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Diseases',
      dataIndex: 'diseases',
      key: 'diseases',
      render: (_, { diseases }) => (
        <>
          {diseases.map((tag) => {
           let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'Toothache') {
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
      render: () => (
        <Space size="middle">
          <CloudDownloadOutlined/>
          <EyeFilled />
          <DeleteFilled />
        </Space>
      ),
    },
  ];

  const data = [
    {
      id: '1',
      title: 'John Brown',
      doctor: 'John Brown',
      address: 'New York No. 1 Lake Park',
      date: '30 Dec 2018',
      diseases: ['Tooth'],
    },
    {
      id: '2',
      title: 'John Brown',
      doctor: 'John Brown',
      address: 'New York No. 1 Lake Park',
      date: '30 Dec 2018',
      diseases: ['Tooth'],
    },
    {
      id: '3',
      title: 'John Brown',
      doctor: 'John Brown',
      address: 'New York No. 1 Lake Park',
      date: '30 Dec 2018',
      diseases: ['Tooth'],
    },
    {
      id: '4',
      title: 'John Brown',
      doctor: 'John Brown',
      address: 'New York No. 1 Lake Park',
      date: '30 Dec 2018',
      diseases: ['Tooth'],
    },
  ];
  
  return (
    <Table columns={columns} dataSource={data}/>
  )
}

export default Prescription