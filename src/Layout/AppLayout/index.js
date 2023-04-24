import { Layout } from 'antd';
import Header from 'Layout/Header';
import Sidebar from 'Layout/Sidebar';
import { Outlet } from 'react-router-dom';

const contentStyle = {
  textAlign: 'center',
  height: 'auto',
  lineHeight: '120px',
  color: '#fff',
  padding: 16
};
const AppLayout = () => {
  return (
    <Layout>
      <Header />
      <Layout>
        <Sidebar />
        <Layout.Content style={contentStyle}>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout