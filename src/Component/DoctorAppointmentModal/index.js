import { UserOutlined } from "@ant-design/icons";
import NewContext from "Context/createContext";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import { Services } from "Utils/Services";
import {
  AutoComplete,
  Avatar,
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  TimePicker,
  notification,
} from "antd";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const DoctorAppointmentModal = () => {
  const {
    isModalOpen,
    setIsModalOpen,
    selectedDoctor,
    setSelectedDoctor,
    doctorName,
    setDoctorName,
    setAdd,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
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
    setSelectedDate(null);
    setSelectedTime(null);
    setDoctorName("");
    setStartTime("");
    setEndTime("");
    form.resetFields();
    setIsModalOpen(false);
    setAdd(false);
  };

  const handleCancel = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setDoctorName("");
    setStartTime("");
    setEndTime("");
    form.resetFields();
    setIsModalOpen(false);
    setAdd(false);
  };

  const onFinish = async (values) => {
    const appointmentData = {
      user_id: userId,
      patient_name: values.patientname,
      doctor_id: selectedDoctor,
      doctor_name: values.doctor,
      appointment_date: values.date,
      startTime: values?.slot[0],
      endTime: values?.slot[1],
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
      date: moment(startTime),
      slot: [moment(startTime), moment(endTime)],
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
            <DatePicker disabled onChange={handlePickDate} />
          </Form.Item>
          <Form.Item name="slot" label="Appointment Time">
            <TimePicker.RangePicker disabled />
          </Form.Item>
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
              <Button
                type="primary"
                style={{
                  background: "#1e8ed8",
                  width: "100%",
                  marginLeft: "25%",
                }}
                htmlType="submit"
              >
                New Appointment
              </Button>
            </Form.Item>
          </>
        </Form>
      </Modal>
    </>
  );
};

export default DoctorAppointmentModal;
