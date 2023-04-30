import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Upload,
  Radio,
  notification,
} from "antd";
import { useEffect, useState } from "react";
import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import useAxiosPrivate from "Hook/useAxiosPrivate";
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

const EditUser = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const role = searchParams.get("role");
  const { userId } = useParams();
  const [previewImage, setPreviewImage] = useState(null);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("name", values.name);
    formData.append("gender", values.gender);
    formData.append("phone_number", values.phone_number);
    formData.append("date_of_birth", values.date_of_birth);
    formData.append("image", values.avatar && values.avatar[0].originFileObj);
    try {
      const response = await axiosPrivate.put(`/user/edit/user/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      notification.success({
        message: "Edit user",
        description: response.data.data,
      });
      navigate(-1);
    } catch (error) {
      notification.error({
        message: "Edit user",
        description: "Edit user profile failed",
      });
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
  useEffect(() => {
    axiosPrivate.get(`/user/account/detail/${userId}`).then((res) => {
      const { name, email, date_of_birth, phone_number, gender, _id } =
        res.data.data;
      form.setFieldsValue({
        id: _id,
        email: email,
        name: name,
        gender: gender,
        phone_number: phone_number,
        date_of_birth: moment(new Date(date_of_birth)),
      });
    });
  }, [form, userId]);
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
            message: "Username is required",
          },
        ]}
      >
        <Input placeholder="Username" />
      </Form.Item>
      {role === "manager" ? (
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
          <Input />
        </Form.Item>
      ) : null}

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

      <Form.Item name="date_of_birth" label="Date">
        <DatePicker style={{ width: "100%" }} locale={locale} />
      </Form.Item>

      <Form.Item
        name="phone_number"
        label="Phone Number"
        rules={[{ required: true, message: "Please input your phone number!" }]}
      >
        <Input placeholder="Phone number"/>
      </Form.Item>

      <Form.Item
        name="avatar"
        label="Avatar"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload
          customRequest={customUpload}
          beforeUpload={handlePreview}
          maxCount={1}
          listType="picture-card"
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

export default EditUser;
