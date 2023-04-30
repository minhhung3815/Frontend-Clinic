import { MailOutlined, UserAddOutlined } from "@ant-design/icons";
import { Layout, Menu, theme, ConfigProvider } from "antd";
import { useNavigate } from "react-router-dom";
import { siderStyle } from "./handler";
import { useState } from "react";
import {
  CalendarOutlined,
  UserOutlined,
  DashboardOutlined,
  ContactsOutlined,
  TeamOutlined,
  MedicineBoxOutlined,
  HeartOutlined,
  ScheduleOutlined,
  CreditCardOutlined,
  SendOutlined,
  FileTextOutlined,
  IdcardOutlined,
  InboxOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

import { useLocation } from "react-router-dom";
import useAuth from "Hook/useAuth";
import "./style.css";

const Sidebar = () => {
  const { auth } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const getItem = (label, key, icon, children, type) => {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  };
  const itemsManager = [
    getItem("Dashboard", "dashboard", <DashboardOutlined />),
    getItem("Doctors", "doctors", <TeamOutlined />),
    getItem("Users", "users", <UserOutlined />),
    getItem("Managers", "managers", <IdcardOutlined />),
    getItem("Appointments", "appointments", <ContactsOutlined />),
    getItem("Doctor Schedule", "schedule", <CalendarOutlined />),
    getItem("Prescriptions", "prescriptions", <FileTextOutlined />),
    getItem("Requests", "request", <MailOutlined />, [
      getItem("Inbox", "request/inbox", <InboxOutlined />),
      getItem("Sent", "request/sent", <SendOutlined />),
    ]),
    getItem("Transactions", "payment", <CreditCardOutlined />),
    getItem("Medicines", "medicines", <MedicineBoxOutlined />),
    getItem("New Appointment", "new-appointment", <CalendarOutlined />),
    getItem("New User", "new-user", <UserAddOutlined />),
    getItem("New Doctor", "new-doctor", <UserAddOutlined />),
    getItem("New Request", "new-request", <SendOutlined />),
    getItem("New Medicine", "new-medicine", <HeartOutlined />),
    getItem("New Schedule", "new-schedule", <ScheduleOutlined />),
    getItem("New Prescription", "new-prescription", <FileTextOutlined />),
  ];

  const itemsDoctor = [
    getItem("New Prescription", "new-prescription", <FileTextOutlined />),
  ];

  const selectedKeys = [location.pathname.split("/")[1]];

  const onClick = (e) => {
    navigate(e.key);
  };
  return (
    <Layout.Sider
      style={siderStyle}
      // collapsible
      // collapsed={collapsed}
      // onCollapse={(value) => setCollapsed(value)}
      // className="ant-layout-sider-collapsed"
      // collapsedWidth={20}
      // collapseIcon={<FileTextOutlined />}
      // expandIcon={<MenuFoldOutlined />}
    >
      <Menu
        onClick={onClick}
        mode="inline"
        style={{
          height: "100%",
          background: "white",
        }}
        items={auth?.role === "manager" ? itemsManager : itemsDoctor}
        selectedKeys={selectedKeys}
      />
    </Layout.Sider>
  );
};

export default Sidebar;
