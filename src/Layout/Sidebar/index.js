import { MailOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { siderStyle } from './handler';
import {
  CalendarOutlined,
  UserOutlined,
  DashboardOutlined,
  ContactsOutlined,
  TeamOutlined,
} from '@ant-design/icons';
const Sidebar = () => {
  const getItem = (label, key, icon, children, type) => {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem('Dashboard', 'dashboard', <DashboardOutlined />,),
    getItem('Doctors', 'doctors', <TeamOutlined />,),
    getItem('Patients', 'patients', <UserOutlined />,),
    // getItem('Edit Doctor', 'edit', <MailOutlined />,),
    // getItem('Edit Appointment', 'edit-appointment', <MailOutlined />,),
    getItem('Appointments', 'appointments', <ContactsOutlined />,),
    getItem('Doctor Schedule', 'schedule', <CalendarOutlined />,),
    getItem('Prescriptions', 'prescriptions', <CalendarOutlined />,),
  ];

  const navigate = useNavigate()

  const onClick = (e) => {
    navigate(e.key)
  };
  return (
    <Layout.Sider style={siderStyle}>
      <Menu
        onClick={onClick}
        mode="inline"
        style={{
          height: '100%',
        }}
        items={items}
      />
    </Layout.Sider>

  )
}

export default Sidebar