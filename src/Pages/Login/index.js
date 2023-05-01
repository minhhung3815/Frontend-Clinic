import { useEffect, useState } from "react";
import Axios from "../../Axios/axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input } from "antd";
import useAuth from "Hook/useAuth";

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
        const accessToken = response?.data?.accessToken;
        const jwt = response?.data?.jwt;
        const role = response?.data?.role;
        localStorage.setItem("jwt", jwt);
        setAuth({ email, accessToken, role });
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.log(error);
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
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* <Form.Item
        name="persist"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox onChange={togglePersist} checked={persist}>
          {" "}
          Trust this device
        </Checkbox>
      </Form.Item> */}

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginPage;
