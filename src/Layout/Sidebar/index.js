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
    getItem("Inbox", "request/inbox", <InboxOutlined />),
    getItem("Transactions", "payment", <CreditCardOutlined />),
    getItem("Medicines", "medicines", <MedicineBoxOutlined />),
    getItem("New Appointment", "new-appointment", <CalendarOutlined />),
    getItem("New User", "new-user", <UserAddOutlined />),
    getItem("New Doctor", "new-doctor", <UserAddOutlined />),
    getItem("New Medicine", "new-medicine", <HeartOutlined />),
    getItem("New Schedule", "new-schedule", <ScheduleOutlined />),
  ];

  const itemsDoctor = [
    getItem("Appointments", "doctor/appointments", <ContactsOutlined />),
    getItem("Sent", "request/sent", <SendOutlined />),
    getItem("New Prescription", "new-prescription", <FileTextOutlined />),
    getItem("New Request", "new-request", <SendOutlined />),
  ];

  const selectedKeys = [location.pathname.split("/")[1]];

  const onClick = (e) => {
    navigate(e.key);
  };
  return (
    <Layout.Sider style={siderStyle}>
      <Menu
        onClick={onClick}
        mode="inline"
        style={{
          height: "100%",
          background: "white",
        }}
        items={
          auth?.role === "manager"
            ? itemsManager
            : auth?.role === "doctor"
            ? itemsDoctor
            : null
        }
        selectedKeys={selectedKeys}
      />
    </Layout.Sider>
  );
};

export default Sidebar;
