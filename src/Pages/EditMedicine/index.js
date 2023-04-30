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
const EditMedicine = () => {
  const navigate = useNavigate();
  const params = useParams();
  const axiosPrivate = useAxiosPrivate();
  const { medicineId } = params;
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    // console.log(values);
    try {
      const response = await axiosPrivate.put(`/medicine/new`, values);
      notification.success({
        message: "New medicine",
        description: response.data.data,
      });
      navigate(-1);
    } catch (error) {
      console.log(error);
      notification.error({
        message: "New medicine",
        description: "Create new medicine failed",
      });
    }
  };

  useEffect(() => {
    axiosPrivate.get(`/medicine/detail/${medicineId}`)
      .then((res) => {
        const medicineData = res.data.data;
        form.setFieldsValue({
          name: medicineData.name,
          price: medicineData.price,
          expiry: moment(new Date(medicineData.expiry)),
          manufacturer: medicineData.manufacturer,
          quantity: medicineData.amount,
          description: medicineData.description,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [medicineId, form]);
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

      {/* <Form.Item
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
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditMedicine;
