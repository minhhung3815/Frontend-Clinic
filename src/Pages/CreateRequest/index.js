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
  InputNumber,
  Avatar,
} from "antd";
import { useEffect, useRef, useState } from "react";
import React from "react";
import {
  PlusOutlined,
  MinusCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
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
const CreateRequest = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [managerList, setManagerList] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const onFinish = async (values) => {
    try {
      const response = await axiosPrivate.post(`/request/new`, values);
      notification.success({
        message: "Success",
        description: response?.data?.data,
      });
      navigate("/request/sent");
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Error",
        description: "Send request failed. Please try again!!!",
      });
    }
  };

  useEffect(() => {
    axiosPrivate
      .get("/user/account/manager")
      .then((res) => {
        const managerList = res.data.data;
        console.log(managerList);
        setManagerList(managerList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const renderOptions = (data) => ({
    key: data._id,
    value: data._id,
    label: (
      <Form.Item>
        <Avatar size="small" src={data.avatar?.url} /> {data.email}
      </Form.Item>
    ),
  });
  const options = managerList.map((data) => renderOptions(data));
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
        name="receiver"
        label="To"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please select email!",
          },
        ]}
      >
        <Select
          placeholder="Email"
          options={options}
          size="large"
          showSearch
          style={{ textAlign: "left" }}
        ></Select>
      </Form.Item>

      <Form.Item
        name="title"
        label="Title"
        rules={[
          {
            required: true,
            message: "Please select gender!",
          },
        ]}
      >
        <Input placeholder="Title" />
      </Form.Item>

      <Form.Item
        name="explanation"
        label="Description"
        rules={[
          {
            required: true,
            message: "Please write some description!",
          },
        ]}
      >
        <Input.TextArea
          size="default"
          style={{ paddingBottom: "20%" }}
          placeholder="Description"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateRequest;
