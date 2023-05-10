import useAuth from "Hook/useAuth";
import { Button, Form, Input, notification } from "antd";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "../../Axios/axios";
import "./index.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth, persist, setPersist } = useAuth();
  const from = location.state?.from?.pathname || "/";

  const onFinish = async (values) => {
    try {
      const response = await Axios.post("/user/login", values, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        withCredentials: true,
      });

      if (response?.data?.success) {
        const email = values?.email;
        const id = response?.data?.id;
        const accessToken = response?.data?.accessToken;
        const jwt = response?.data?.jwt;
        const role = response?.data?.role;
        const username = response?.data?.username;
        localStorage.setItem("jwt", jwt);
        localStorage.setItem("persist", true);
        localStorage.setItem("isLogined", true);
        localStorage.setItem("role", role);
        setAuth({ email, accessToken, role, username, id });
        notification.success({
          message: "Success",
          description: response?.data?.data,
          duration: 1,
        });
        role === "manager"
          ? navigate("/admin/dashboard")
          : role === "doctor"
          ? navigate("/doctor/appointments")
          : navigate(from);
      }
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Error",
        description: error?.response?.data?.data,
        duration: 1,
      });
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // const togglePersist = () => {
  //   setPersist((prev) => !prev);
  // };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);
  return (
    <>
      <div className="login-page">
        <div className="login-box">
          <div className="illustration-wrapper">
            <img
              src="https://drsafehands.com/resources/assets/images/doctor.png"
              alt="Login"
            />
          </div>
          <Form
            name="login-form"
            initialValues={{ remember: true }}
            onSubmit={(e) => e.preventDefault()}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <p className="form-title">Welcome back</p>
            <p>Login to the Dashboard</p>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input placeholder="E-mail" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            {/* <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item> */}

            <Form.Item>
              <Button
                type="primary"
                style={{ background: "#1e8ed8" }}
                htmlType="submit"
                className="login-form-button"
              >
                SUBMIT
              </Button>
              Or{" "}
              <a href="/register" style={{ color: "blue" }}>
                Register now?
              </a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
