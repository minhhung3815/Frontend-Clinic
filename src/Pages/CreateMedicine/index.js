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
} from "antd";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
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
const NewMedicine = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    // console.log(values);
    try {
      const response = await axiosPrivate.post(`/medicine/new`, values);
      notification.success({
        message: "Success",
        description: response?.data?.data,
        duration: 1,
      });
      navigate(`/admin/medicines`);
    } catch (error) {
      // console.log(error);
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
        label="Medicine"
        rules={[
          {
            required: true,
            message: "Please input medicine!",
          },
        ]}
      >
        <Input placeholder="Medicine" />
      </Form.Item>
      <Form.Item
        name="price"
        label="Price"
        rules={[
          {
            required: true,
            message: "Please input price!",
          },
        ]}
      >
        <InputNumber
          style={{ width: "100%" }}
          placeholder="Price"
          step="0.01"
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
        />
      </Form.Item>

      <Form.Item
        name="expiry"
        label="Expiry Date"
        rules={[
          {
            required: true,
            message: "Please input expiry date!",
          },
        ]}
      >
        <DatePicker style={{ width: "100%" }} placeholder="Expiry Date" />
      </Form.Item>

      <Form.Item
        name="manufacturer"
        label="Manufacturer"
        rules={[
          {
            required: true,
            message: "Please select gender!",
          },
        ]}
      >
        <Input placeholder="Manufacturer" />
      </Form.Item>
      {/* 
      <Form.Item
        name="quantity"
        label="Quantity"
        rules={[
          {
            required: true,
            message: "Please select amount!",
          },
        ]}
      >
        <Input placeholder="Amount" type="number" />
      </Form.Item> */}

      <Form.Item
        name="description"
        label="Description"
        rules={[
          {
            required: true,
            message: "Please write some description!",
          },
        ]}
      >
        <Input.TextArea placeholder="Description" showCount maxLength="100" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" style={{ background: "#1e8ed8" }} htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewMedicine;
