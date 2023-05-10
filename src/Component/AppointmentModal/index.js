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
  Tag,
  Modal,
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
import axios from "axios";
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

const NewAppointmentModal = () => {
  const {
    isModalOpen,
    setIsModalOpen,
    selectedDoctor,
    setSelectedDoctor,
    doctorName,
    setDoctorName,
    setAdd,
  } = useContext(NewContext);
  const [userId, setUserId] = useState("");
  const [slot, setSlot] = useState([]);
  const [service, setService] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const axiosPrivate = useAxiosPrivate();
  const handleOk = () => {
    setIsModalOpen(false);
    setAdd(false);
  };

  const handleCancel = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setDoctorName("");
    form.resetFields();
    setIsModalOpen(false);
    setAdd(false);
  };

  const onFinish = async (values) => {
    // console.log(values);
    const [startTime, endTime] = values.slot.split("+");
    const date = new Date(values.date);
    // const start = new Date(startTime);
    // start.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    // console.log(date.toISOString());
    // console.log(start.toISOString());
    // console.log(startTime);
    const time = new Date(startTime);
    time.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    time.setMilliseconds(0);
    const appointmentData = {
      user_id: userId,
      patient_name: values.patientname,
      doctor_id: selectedDoctor,
      doctor_name: values.doctor,
      appointment_date: values.date,
      startTime: time,
      endTime: new Date(time.getTime() + 60 * 60 * 1000),
      service,
      description: values.description,
    };
    try {
      const response = await axiosPrivate.post(
        `/appointment/admin/new`,
        appointmentData
      );
      if (response.data.success === true) {
        notification.success({
          message: "Success",
          description: response?.data?.data,
          duration: 1,
        });
        window.location.reload();
        setIsModalOpen(false);
        setAdd(false);
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

  const handlePickDate = async (date) => {
    try {
      const aptDate = new Date(date);
      const isoDateString = aptDate.toISOString();
      const formattedDateString = isoDateString.substr(0, 10);
      const response = await axiosPrivate.get(
        `/appointment/doctor/slot/${selectedDoctor}/${formattedDateString}`
      );
      const slots = !response?.data?.data ? [] : response?.data?.data;
      setSlot(slots);
      setSelectedDate(date);
      setSelectedTime(null);
    } catch (error) {
      console.log(error);
      // notification.error({
      //   message: "Error",
      //   description: "Something went wrong",
      //   duration: 1,
      // });
    }
  };

  const handleSelectTime = (time) => {
    setSelectedTime(time);
  };

  const timeOptions = slot.map((slot, index) => {
    const start = new Date(slot.start).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const end = new Date(slot.end).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return (
      <Select.Option key={index} value={`${slot.start}+${slot.end}`}>
        {`${start} - ${end}`}
      </Select.Option>
    );
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
  const optionsUser = userList.map((user) => renderOptionEmail(user));

  useEffect(() => {
    form.setFieldsValue({
      doctor: doctorName,
    });
  }, [doctorName, form, selectedDoctor]);

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
    <>
      <Modal
        title="New Appointment"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
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
            rules={[{ required: true, message: "Please select a date!" }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="date"
            label="Appointment Date"
            rules={[{ required: true, message: "Please select a date!" }]}
          >
            <DatePicker onChange={handlePickDate} />
          </Form.Item>
          {selectedDate ? (
            <Form.Item name="slot" label="Appointment Time">
              <Select
                placeholder="Select a time slot"
                style={{ width: 200 }}
                rules={[{ required: true, message: "Please select a date!" }]}
                onChange={handleSelectTime}
              >
                {timeOptions}
              </Select>
            </Form.Item>
          ) : null}
          {selectedTime ? (
            <>
              <Form.Item
                name="patientname"
                label="Patient Name"
                rules={[
                  { required: true, message: "Please provide your full name!" },
                ]}
              >
                <Input placeholder="Enter patient name" />
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
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
              </Form.Item>
              <Form.Item
                name="service"
                label="Service"
                rules={[{ required: true, message: "Please select a service" }]}
              >
                <Select
                  placeholder="Select service"
                  mode="multiple"
                  options={Services}
                  showSearch
                  allowClear
                  onSelect={(_, value) => {
                    setService([
                      ...service,
                      { type: value.value, price: value.price },
                    ]);
                  }}
                  onDeselect={(_, value) => {
                    const newArray = service.filter(
                      (item) => item.type !== value.value
                    );
                    setService(newArray);
                  }}
                  onClear={(_, value) => {
                    setService([]);
                  }}
                  style={{ textAlign: "left" }}
                ></Select>
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "Please give us short description",
                  },
                ]}
              >
                <Input.TextArea
                  showCount
                  maxLength={100}
                  placeholder="Enter description"
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" style={{ background: "#1e8ed8" }} htmlType="submit">
                  New Appointment
                </Button>
              </Form.Item>
            </>
          ) : null}
        </Form>
      </Modal>
    </>
  );
};

export default NewAppointmentModal;
