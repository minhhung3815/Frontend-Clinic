import { Button, Layout, Space } from "antd";
import React from "react";
import { headerStyle } from "./handler";
import Logo from "Static/Images/Logo.svg";
import useAuth from "Hook/useAuth";
import ButtonGroup from "antd/es/button/button-group";
import "./style.css";

const Header = () => {
  const { auth, setAuth } = useAuth();
  const handleLogOut = () => {
    setAuth({});
    // localStorage.removeItem("isLogined");
    // localStorage.removeItem("token");
    // localStorage.removeItem("userData");
  };
  return (
    <Layout.Header style={headerStyle}>
      <Space align="baseline" justify="space-between" size={100}>
        <img src={Logo} alt="logo" />
        {auth?.accessToken ? (
          <Button
            onClick={() => {
              handleLogOut();
            }}
            style={{ marginRight: "0%" }}
          >
            Logout
          </Button>
        ) : (
          <ButtonGroup style={{ margiLeft: "50%" }}>
            <Space align="baseline">
              <Button>Login</Button>
              <Button>Register</Button>
            </Space>
          </ButtonGroup>
        )}
      </Space>
    </Layout.Header>
  );
};

export default Header;
