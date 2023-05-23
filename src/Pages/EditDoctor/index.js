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
import { useEffect, useState } from "react";
import React from "react";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
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

const EditDoctor = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { userId } = useParams();
  const [previewImage, setPreviewImage] = useState(null);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    const { achievements = [], specialization = [], experience = [] } = values;
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("name", values.name);
    formData.append("gender", values.gender);
    formData.append("phone_number", values.phone_number);
    formData.append("date_of_birth", values.date_of_birth);
    formData.append("description", values.description);
    formData.append("achievements", JSON.stringify(achievements));
    formData.append("specialization", JSON.stringify(specialization));
    formData.append("exp", JSON.stringify(experience));
    formData.append("image", values.avatar && values.avatar[0].originFileObj);
    try {
      const response = await axiosPrivate.put(
        `/user/edit/doctor/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response?.data?.success) {
        notification.success({
          message: "Success",
          description: response?.data?.data,
        });
        navigate(-1);
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
  useEffect(() => {
    axiosPrivate.get(`/user/doctor/detail/${userId}`).then((res) => {
      // console.log(res.data.data);
      const {
        name,
        email,
        date_of_birth,
        phone_number,
        gender,
        _id,
        description,
        exp,
        specialization,
        achievements,
      } = res.data.data;
      form.setFieldsValue({
        id: _id,
        email: email,
        name: name,
        gender: gender,
        phone_number: phone_number,
        date_of_birth: moment(new Date(date_of_birth)),
        description: description,
        experience: exp,
        specialization: specialization,
        achievements: achievements,
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
          },
        ]}
      >
        <Input />
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
        <Input />
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

      <Form.Item name="date_of_birth" label="Birth">
        <DatePicker style={{ width: "100%" }} locale={locale} />
      </Form.Item>

      <Form.Item
        name="phone_number"
        label="Phone Number"
        rules={[{ required: true, message: "Please input your phone number!" }]}
      >
        <Input />
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
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: "Please input bio" }]}
      >
        <Input.TextArea showCount maxLength={100} />
      </Form.Item>

      <Form.Item label="Achievements">
        <Form.List name="achievements">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  align="baseline"
                  style={{ marginRight: "50%" }}
                >
                  <Form.Item
                    {...restField}
                    name={name}
                    rules={[{ required: true, message: "Missing field" }]}
                  >
                    <Input placeholder="Enter achievement" />
                  </Form.Item>
                  <MinusCircleOutlined
                    onClick={() => remove(name)}
                    style={{ color: "red" }}
                  />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>

      <Form.Item label="Specialization">
        <Form.List name="specialization">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  align="baseline"
                  style={{ marginRight: "50%" }}
                >
                  <Form.Item
                    {...restField}
                    name={name}
                    rules={[{ required: true, message: "Missing field" }]}
                  >
                    <Input placeholder="Enter specialization" />
                  </Form.Item>
                  <MinusCircleOutlined
                    onClick={() => remove(name)}
                    style={{ color: "red" }}
                  />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>

      <Form.Item label="Experience">
        <Form.List name="experience">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  align="baseline"
                  style={{ marginRight: "50%" }}
                >
                  <Form.Item
                    {...restField}
                    name={name}
                    rules={[{ required: true, message: "Missing field" }]}
                  >
                    <Input placeholder="Enter experience" />
                  </Form.Item>
                  <MinusCircleOutlined
                    onClick={() => remove(name)}
                    style={{ color: "red" }}
                  />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item>
        <Button type="primary" style={{ background: "#1e8ed8", width: "100%", marginLeft: "50%" }} htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditDoctor;
