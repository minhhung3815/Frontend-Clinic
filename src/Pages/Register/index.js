import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Upload,
  Radio,
  notification,
  Space,
} from "antd";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import "style.scss";
import locale from "antd/es/date-picker/locale/en_US";
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const RegisterPage = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    // console.log(values);
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("name", values.name);
    formData.append("gender", values.gender);
    formData.append("password", values.password);
    formData.append("phone_number", values.phone_number);
    formData.append("date_of_birth", values.date_of_birth);
    formData.append("role", values.role?.toLowerCase());
    formData.append("image", values.avatar[0]?.originFileObj);
    try {
      const response = await axiosPrivate.post(`/user/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response?.data?.success) {
        notification.success({
          message: "Success",
          description: response?.data?.data,
          duration: 1,
        });
      }
    } catch (error) {
      console.log(error)
      // notification.error({
      //   message: "Error",
      //   description: "Something went wrong",
      //   duration: 1,
      // });
    }
  };
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const handlePreview = (file) => {
    if (!file.url && !file.preview) {
      file.preview = URL.createObjectURL(file.originFileObj);
    }
    setPreviewImage(file.preview);
  };

  const customUpload = async (options) => {
    const { onSuccess, onError, file } = options;
    try {
      onSuccess("success");
    } catch (error) {
      console.log(error);
      onError("error");
    }
  };
  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      scrollToFirstError
    >
      <Form.Item
        name="name"
        label="Username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password placeholder="Password" />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password placeholder="Confirm Password" />
      </Form.Item>

      <Form.Item
        name="gender"
        label="Gender"
        rules={[
          {
            required: true,
            message: "Please select gender!",
          },
        ]}
      >
        <Select placeholder="Gender" style={{ textAlign: "left" }}>
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="date_of_birth"
        label="Birth"
        rules={[{ required: true, message: "Please provide your birthday" }]}
      >
        <DatePicker style={{ width: "100%" }} locale={locale} />
      </Form.Item>

      <Form.Item
        name="phone_number"
        label="Phone Number"
        rules={[{ required: true, message: "Please input your phone number!" }]}
      >
        <Input placeholder="Phone Number" />
      </Form.Item>

      <Form.Item
        name="avatar"
        label="Avatar"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[{ required: true, message: "Please select your avatar" }]}
      >
        <Upload
          customRequest={customUpload}
          beforeUpload={handlePreview}
          maxCount={1}
          listType="picture-card"
          // showUploadList={false}
        >
          <div>
            <PlusOutlined />
            <div
              style={{
                marginTop: 8,
              }}
            >
              Avatar
            </div>
          </div>
        </Upload>
      </Form.Item>
      {previewImage && (
        <img
          src={previewImage}
          alt="Avatar Preview"
          style={{ maxWidth: "100%", position: "absolute", top: 0, left: 0 }}
        />
      )}

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterPage;
