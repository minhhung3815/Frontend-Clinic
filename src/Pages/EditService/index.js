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
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import "style.scss";
import locale from "antd/es/date-picker/locale/en_US";
import moment from "moment";
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
const EditService = () => {
  const navigate = useNavigate();
  const params = useParams();
  const axiosPrivate = useAxiosPrivate();
  const { serviceId } = params;
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    // console.log(values);
    try {
      const response = await axiosPrivate.put(`/medicine/new`, values);
      if (response?.data?.data) {
        notification.success({
          message: "Success",
          description: response?.data?.data,
          duration: 1,
        });
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
      // notification.error({
      //   message: "Error",
      //   description: "Something went wrong",
      //   duration: 1,
      // });
    }
  };

  useEffect(() => {
    axiosPrivate
      .get(`/services/specific/${serviceId}`)
      .then((res) => {
        const serviceData = res?.data?.data;
        form.setFieldsValue({
          value: serviceData?.value,
          price: serviceData?.price,
          description: serviceData?.description,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [serviceId, form]);
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
        name="value"
        label="Service"
        rules={[
          {
            required: true,
            message: "Please input service!",
          },
        ]}
      >
        <Input placeholder="Service" />
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
        <Button
          type="primary"
          style={{ background: "#1e8ed8", width: "100%", marginLeft: "50%" }}
          htmlType="submit"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditService;
