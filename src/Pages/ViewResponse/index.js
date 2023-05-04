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
import {
  PlusOutlined,
  MinusCircleOutlined,
  CheckOutlined,
  CloseOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
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
const ViewRequest = () => {
  const navigate = useNavigate();
  const params = useParams();
  const axiosPrivate = useAxiosPrivate();
  const { requestId } = params;
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    try {
      const response = await axiosPrivate.put(
        `/request/edit/${requestId}`,
        values
      );
      if (response?.data?.success) {
        notification.success({
          message: "Success",
          description: response?.data?.data,
        });
        navigate(-1);
      } else {
        notification.error({
          message: "Error",
          description: "Something went wrong",
        });
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Something went wrong",
      });
    }
  };

  useEffect(() => {
    axiosPrivate
      .get(`/request/specific/requests/${requestId}`)
      .then((res) => {
        const responseData = res?.data?.data;
        console.log(responseData);
        form.setFieldsValue({
          to: responseData?.receiver_id?.email,
          title: responseData?.title,
          explanation: responseData?.explanation,
          response: responseData?.response,
          accepted: responseData?.accepted,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [requestId, form]);
  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      scrollToFirstError
    >
      <Form.Item name="to" label="To">
        <Input disabled />
      </Form.Item>

      <Form.Item name="title" label="Title">
        <Input disabled />
      </Form.Item>

      <Form.Item name="explanation" label="Request">
        <Input.TextArea disabled />
      </Form.Item>

      <Form.Item name="response" label="Response">
        <Input.TextArea disabled />
      </Form.Item>

      <Form.Item name="accepted" label="Accept">
        <Radio.Group disabled>
          <Space size={50}>
            <Radio value="accept">Accept</Radio>
            <Radio value="reject">Reject</Radio>
          </Space>
        </Radio.Group>
      </Form.Item>
    </Form>
  );
};

export default ViewRequest;
