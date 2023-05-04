import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Avatar,
  Radio,
  TimePicker,
  List,
  notification,
  AutoComplete,
} from "antd";
import moment from "moment";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import NewContext from "Context/createContext";
import { useNavigate } from "react-router-dom";
import { Services } from "Utils/Services";
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

const EditAppointment = () => {
  const axiosPrivate = useAxiosPrivate();
  const [doctorId, setDoctorId] = useState("");
  const [userId, setUserId] = useState("");
  const { appointmentId } = useParams();
  const [service, setService] = useState({});
  const [status, setStatus] = useState(null);

  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setStatus(value);
    form.setFieldsValue({ status: value });
  };

  const isFinishedDisabled = status === "cancelled";
  const isCancelledDisabled = status === "finished";

  const onFinish = async (values) => {
    const time = new Date(values.startTime);
    const appointmentData = {
      user_id: userId,
      patient_name: values.patientname,
      doctor_id: doctorId,
      doctor_name: values.doctor,
      appointment_date: values.date,
      startTime: values.startTime,
      endTime: new Date(time.getTime() + 60 * 60 * 1000),
      description: values.description,
      service: {
        type: service.value,
        price: service.price,
      },
      status: values.status,
    };
    try {
      const response = await axiosPrivate.put(
        `/appointment/update/status/${appointmentId}`,
        appointmentData
      );
      if (response.data.success === true) {
        notification.success({
          message: "Make new appointment",
          description: "Make new appointment successfully",
        });
        navigate("/appointments");
      }
    } catch (error) {
      notification.error({
        message: "Make new appointment",
        description: "Make new appointment failed",
      });
    }
  };

  const [doctorList, setDoctorList] = useState([]);
  const [userList, setUserList] = useState([]);

  const renderOption = (user) => ({
    key: user._id,
    value: user.name,
    label: (
      <Form.Item>
        <Avatar src={user.avatar.url} icon={<UserOutlined />} /> {user.name}
      </Form.Item>
    ),
  });

  const renderOptionEmail = (user) => ({
    key: user._id,
    value: user.email,
    label: (
      <Form.Item>
        <Avatar src={user.avatar.url} icon={<UserOutlined />} /> {user.email}
      </Form.Item>
    ),
  });

  const optionsDoctor = doctorList.map((user) => renderOption(user));
  const optionsUser = userList.map((user) => renderOptionEmail(user));

  useEffect(() => {
    axiosPrivate
      .get(`/appointment/specific/${appointmentId}`)
      .then((res) => {
        const appointmentData = res.data.data;
        setDoctorId(appointmentData.doctor_id?._id);
        setUserId(appointmentData.user_id?._id);
        setStatus(appointmentData.status);
        form.setFieldsValue({
          patientname: appointmentData.patient_name,
          doctor: appointmentData.doctor_id?.name,
          date: moment(new Date(appointmentData.appointment_date)),
          startTime: moment(new Date(appointmentData.startTime)),
          email: appointmentData.user_id?.email,
          service: appointmentData.service?.type,
          description: appointmentData.description,
          status: appointmentData.status,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [appointmentId, form]);

  useEffect(() => {
    axiosPrivate
      .get("/user/account/doctor")
      .then((res) => {
        const doctorData = res.data.data;
        setDoctorList(doctorData);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    axiosPrivate
      .get("/user/list/all/account")
      .then((res) => {
        const userData = res.data.data;
        setUserList(userData);
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
        name="patientname"
        label="Patient Name"
        rules={[{ required: true, message: "Please provide your full name!" }]}
      >
        <Input placeholder="Enter patient name" />
      </Form.Item>

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

      <Form.Item
        name="date"
        label="Date"
        rules={[{ required: true, message: "Please select a date!" }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="startTime"
        label="Time"
        rules={[{ required: true, message: "Please select a time" }]}
      >
        <TimePicker style={{ width: "100%" }} use12Hours format="h:mm A" />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, message: "Please select a doctor!" }]}
      >
        <AutoComplete
          options={optionsUser}
          style={{ textAlign: "left" }}
          placeholder="Please enter email"
          onSelect={(_, option) => {
            setUserId(option.key);
          }}
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[
          { required: true, message: "Please give us short description" },
        ]}
      >
        <Input.TextArea
          showCount
          maxLength={100}
          placeholder="Enter description"
        />
      </Form.Item>

      <Form.Item
        name="service"
        label="Service"
        rules={[{ required: true, message: "Please select a service" }]}
      >
        <Select
          placeholder="Select service"
          options={Services}
          showSearch
          allowClear
          onSelect={(_, value) => {
            setService({ ...value });
          }}
          style={{ textAlign: "left" }}
        />
      </Form.Item>

      <Form.Item
        name="status"
        label="Status"
        rules={[{ required: true, message: "Please select status!" }]}
      >
        <Radio.Group>
          <Radio value="finished" disabled={isFinishedDisabled}>
            Fininsh
          </Radio>
          <Radio value="cancelled" disabled={isCancelledDisabled}>
            Cancel
          </Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Edit Appointment
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditAppointment;
