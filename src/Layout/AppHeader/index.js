import { Button, Dropdown, Layout } from "antd";
import React from "react";
import NavLogo from "../../Static/Images/NavLogo.png";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "./style.css";
import { Menu } from "antd";
import Footer from "Component/Footer";
import useAuth from "Hook/useAuth";
import Axios from "../../Axios/axios";

const Header = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const handleLogOut = async (event) => {
    try {
      const jwt = localStorage.getItem("jwt");
      const response = await Axios.post(
        "/user/logout",
        { jwt },
        { withCredentials: true }
      );
      localStorage.clear();
      setAuth({});
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const getItem = (label, key, icon, children, type) => {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  };
  const items = [
    getItem("Home", "home"),
    getItem("Features", "features"),
    getItem("Services", "services"),
    getItem("Doctor", "doctors"),
    getItem("Blog", "blog"),
    getItem("Appointment", "appointment"),
    getItem("Contact", "contact"),
  ];

  const itemsLogin = [
    getItem("Login", "login"),
    getItem("Register", "register"),
  ];

  const itemsLogined = [
    { label: "item 1", key: "item-1" }, // remember to pass the key prop
    { label: "item 2", key: "item-2" },
  ];
  const onClick = (e) => {
    navigate(e.key);
  };
  return (
    <Layout.Header className="headerStyle">
      <img src={NavLogo} alt="" className="Logo" />
      <span className="spanx"></span>
      <Menu
        onClick={onClick}
        mode="horizontal"
        items={items}
        className="header"
      />
      <span className="spanx"></span>
      {auth?.accessToken ? (
        <Dropdown menu={{ itemsLogined }}>
          <a color="black">Hover me</a>
        </Dropdown>
      ) : (
        <Menu
          onClick={onClick}
          mode="horizontal"
          items={itemsLogin}
          className="header"
        />
      )}
    </Layout.Header>
    // <Layout.Header style={headerStyle}>
    //   <Space align="baseline" justify="space-between" size={100}>
    //     <img src={Logo} alt="logo" />
    //     {auth?.accessToken ? (
    //       <Button
    //         onClick={() => {
    //           handleLogOut();
    //         }}
    //         style={{ marginRight: "0%" }}
    //       >
    //         Logout
    //       </Button>
    //     ) : (
    //       <ButtonGroup style={{ margiLeft: "50%" }}>
    //         <Space align="baseline">
    //           <Button
    //             onClick={() => {
    //               navigate("/login");
    //             }}
    //           >
    //             Login
    //           </Button>
    //           <Button
    //             onClick={() => {
    //               navigate("/register");
    //             }}
    //           >
    //             Register
    //           </Button>
    //         </Space>
    //       </ButtonGroup>
    //     )}
    //   </Space>
    // </Layout.Header>
  );
};

export default Header;
