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
  AutoComplete,
  SelectProps,
  Avatar,
  TimePicker,
} from "antd";
import { useEffect, useRef, useState } from "react";
import React from "react";
import {
  PlusOutlined,
  MinusCircleOutlined,
  UserOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import "style.scss";
import Axios from "../../Axios/axios";
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
const CreateWorkingSchedule = () => {
  const [doctorId, setDoctorId] = useState("");
  const [doctorList, setDoctorList] = useState([]);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const axiosPrivate = useAxiosPrivate();
  const onFinish = async (values) => {
    try {
      const response = await axiosPrivate.post(`/schedule/new`, {
        doctor_id: doctorId,
        ...values,
      });
      console.log(response.response);
      if (response?.status === 200) {
        notification.success({
          message: "Success",
          description: response?.data?.data,
          duration: 1,
        });
        navigate(`/schedule`);
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

  const renderOption = (user) => ({
    key: user._id,
    value: user.name,
    label: (
      <Form.Item>
        <Space>
          <Avatar src={user.avatar.url} icon={<UserOutlined />} />
          {user.name}
        </Space>
      </Form.Item>
    ),
  });

  const optionsDoctor = doctorList.map((user) => renderOption(user));
  useEffect(() => {
    axiosPrivate
      .get("/user/account/doctor")
      .then((res) => {
        const doctorData = res.data.data;
        setDoctorList(doctorData);
      })
      .catch((error) => console.error(error));
  }, []);

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
        name="doctor"
        label="Doctor"
        rules={[{ required: true, message: "Please select a doctor!" }]}
      >
        <AutoComplete
          options={optionsDoctor}
          style={{ textAlign: "left" }}
          placeholder="Choose doctor"
          onSelect={(_, option) => {
            setDoctorId(option.key);
          }}
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      </Form.Item>

      <Form.Item label="Working Schedule">
        <Form.List
          name="working_time"
          rules={[
            {
              validator: async (_, working_time) => {
                if (!working_time || working_time.length < 3) {
                  return Promise.reject(new Error("At least 3 days"));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} align="baseline">
                  <Form.Item
                    {...restField}
                    name={[name, "date"]}
                    rules={[{ required: true, message: "Date is missing" }]}
                  >
                    <Select placeholder="Select date" style={{ width: "100%" }}>
                      <Option value="monday">Monday</Option>
                      <Option value="tuesday">Tuesday</Option>
                      <Option value="wednesday">Wednesday</Option>
                      <Option value="thursday">Thursday</Option>
                      <Option value="friday">Friday</Option>
                      <Option value="saturday">Saturday</Option>
                      <Option value="sunday">Sunday</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name={[name, "time"]}
                    rules={[{ required: true, message: "Time is missing" }]}
                  >
                    <TimePicker.RangePicker />
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
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateWorkingSchedule;
