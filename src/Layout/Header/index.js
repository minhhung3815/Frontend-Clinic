import { Button, Layout, Space } from "antd";
import React from "react";
import { headerStyle } from "./handler";
import Logo from "Static/Images/Logo.svg";
import useAuth from "Hook/useAuth";
import ButtonGroup from "antd/es/button/button-group";
import Axios from "../../Axios/axios";
import "./style.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const handleLogOut = async () => {
    try {
      const jwt = localStorage.getItem("jwt");
      const response = await Axios.post(
        "/user/logout",
        { jwt },
        { withCredentials: true }
      );
      localStorage.clear();
      setAuth({});
    } catch (error) {
      console.log(error);
    }
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
              <Button
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </Button>
              <Button
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register
              </Button>
            </Space>
          </ButtonGroup>
        )}
      </Space>
    </Layout.Header>
  );
};

export default Header;
