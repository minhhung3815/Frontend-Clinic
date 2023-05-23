import {
  CalendarOutlined,
  ContactsOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  FileTextOutlined,
  HeartOutlined,
  IdcardOutlined,
  InboxOutlined,
  MedicineBoxOutlined,
  ScheduleOutlined,
  SendOutlined,
  TeamOutlined,
  UserAddOutlined,
  UserOutlined,
  AppstoreOutlined,
  PlusSquareOutlined
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { siderStyle } from "./handler";

import useAuth from "Hook/useAuth";
import { useLocation } from "react-router-dom";
import "./style.css";

const Sidebar = () => {
  const { auth } = useAuth();
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
    getItem("Dashboard", "/admin/dashboard", <DashboardOutlined />),
    getItem("Doctors", "/admin/doctors", <TeamOutlined />),
    getItem("Users", "/admin/users", <UserOutlined />),
    getItem("Managers", "/admin/managers", <IdcardOutlined />),
    getItem("Appointments", "/admin/appointments", <ContactsOutlined />),
    getItem("Doctor Schedule", "/admin/schedule", <CalendarOutlined />),
    getItem("Prescriptions", "/admin/prescriptions", <FileTextOutlined />),
    getItem("Inbox", "/admin/request/inbox", <InboxOutlined />),
    getItem("Transactions", "/admin/payment", <CreditCardOutlined />),
    getItem("Medicines", "/admin/medicines", <MedicineBoxOutlined />),
    getItem("Services", "/admin/services", <AppstoreOutlined />),
    getItem("New Service", "/admin/new-service", <PlusSquareOutlined />),
    getItem("New User", "/admin/new-user", <UserAddOutlined />),
    getItem("New Doctor", "/admin/new-doctor", <UserAddOutlined />),
    getItem("New Medicine", "/admin/new-medicine", <HeartOutlined />),
    getItem("New Schedule", "/admin/new-schedule", <ScheduleOutlined />),
  ];

  const itemsDoctor = [
    getItem("Appointments", "doctor/appointments", <ContactsOutlined />),
    getItem("Sent", "request/sent", <SendOutlined />),
    getItem("New Prescription", "new-prescription", <FileTextOutlined />),
    getItem("New Request", "new-request", <SendOutlined />),
    getItem("Schedule", "doctor/schedule", <ContactsOutlined />),
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
