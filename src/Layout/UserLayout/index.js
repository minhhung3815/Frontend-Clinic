import {
  LogoutOutlined,
  UserOutlined
} from "@ant-design/icons";
import Footer from "Component/Footer";
import useAuth from "Hook/useAuth";
import Sidebar from "Layout/Sidebar";
import { Layout, Menu, Space } from "antd";
import { Outlet, matchPath, useLocation, useNavigate } from "react-router-dom";
import Axios from "../../Axios/axios";
import NavLogo from "../../Static/Images/NavLogo.png";
import "./style.css";
// import { useState } from 'react';

const UserLayout = () => {
  const { auth, setAuth } = useAuth();
  const location = useLocation();
  const routesWithoutParams = [
    "/admin/dashboard",
    "/admin/doctors",
    "/admin/users",
    "/admin/managers",
    "/admin/appointments",
    "/admin/schedule",
    "/admin/prescriptions",
    "/edit-prescription",
    "/admin/payment",
    "/medicines",
    "/admin/new-user",
    "/admin/new-doctor",
    "/admin/request/inbox",
    "request/sent",
    "/admin/new-medicine",
    "/admin/new-schedule",
    "/doctor/appointments",
    "/doctor/schedule",
    "/new-prescription",
    "/new-request",
    "/admin/medicines",
    "/admin/edit/account/:userId",
    "/admin/edit/doctor/:userId",
    "/admin/edit-schedule/:scheduleId",
    "/prescriptions/:id",
    "/admin/payment/:id",
    "/admin/medicines/:medicineId",
    "/admin/request/inbox/:requestId",
    "/request/sent/:requestId",
    "/admin/edit-appointment/:appointmentId",
  ];
  const isPathMatch = (path) => {
    const matchedPath = matchPath(
      {
        path,
        exact: true,
      },
      `${location?.pathname}`
    );
    return !!matchedPath;
  };

  const isPathWithoutParamsMatch = routesWithoutParams.some(isPathMatch);

  const isLogined = localStorage.getItem("isLogined") || false;
  const role = localStorage.getItem("role") || "";
  const getItem = (label, key, icon, items, type) => {
    return {
      key,
      icon,
      items,
      label,
      type,
    };
  };
  const items = [
    getItem("Home", "home"),
    getItem("Services", "services"),
    getItem("Doctors", "doctors"),
    getItem("Appointment", "appointments"),
    getItem("Schedule", "appointment-schedule"),
    getItem("Contact", "contact"),
  ];

  const itemsDoctorAndAdmin = [
    getItem("Home", "home"),
    getItem("Services", "services"),
    getItem("Doctors", "doctors"),
    getItem("Dashboard", "admin/dashboard"),
    getItem("Doctor Workspace", "doctor/appointments"),
    getItem("Contact", "contact"),
  ];

  const itemsLogin = [
    getItem("Login", "login"),
    getItem("Register", "register"),
  ];

  const navigate = useNavigate();
  const selectedKeys = [location.pathname.split("/")[1]];
  const onClick = (e) => {
    navigate(e.key);
  };

  const handleLogOut = async () => {
    try {
      const jwt = localStorage.getItem("jwt");
      await Axios.post("/user/logout", { jwt }, { withCredentials: true });
      localStorage.clear();
      setAuth({});
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
    <Layout style={{backgroundColor:'white'}}>
      <Layout.Header className="headerStyle">
        <img src={NavLogo} alt="" className="Logo" />
        <span className="spanx"></span>
        
          <Menu
            selectedKeys={selectedKeys}
            onClick={onClick}
            mode="horizontal"
            items={
              isLogined && (role === "manager" || role === "doctor")
                ? itemsDoctorAndAdmin
                : items
            }
            className="header"
          />
        
        <span className="spanx"></span>
        {isLogined ? (
          <>
            <Menu
              mode="horizontal"
              className="header-login"
            >
              <Menu.SubMenu
                key="sub1"
                title={
                  <span>
                    <UserOutlined type="mail" />
                  </span>
                }
              >
                <Menu.Item
                  onClick={onClick}
                  key="profile"
                  icon={<UserOutlined />}
                >
                  Edit Profile
                </Menu.Item>
                <Menu.Item
                  key="home"
                  onClick={handleLogOut}
                  icon={<LogoutOutlined />}
                >
                  Log Out
                </Menu.Item>
              </Menu.SubMenu>
            </Menu>
          </>
        ) : (
          <Menu
            onClick={onClick}
            mode="horizontal"
            items={itemsLogin}
            className="header-login"
          ></Menu>
        )}
      </Layout.Header>

      <Layout hasSider>
        {isPathWithoutParamsMatch ? (
          <>
            <Sidebar />
            <Layout.Content className="contentStyle">
              <div
                style={{
                  paddingLeft: "15%",
                  paddingTop: 20,
                  textAlign: "center",
                  width: "100%",
                }}
              >
                <Outlet />
              </div>
            </Layout.Content>
          </>
        ) : (
          <Layout.Content className="contentStyle">
            <Outlet />
          </Layout.Content>
        )}
      </Layout>

      {isPathWithoutParamsMatch ? null : <Footer />} 
    </Layout>
    </Space>
  );
};

export default UserLayout;
