import { UserOutlined } from "@ant-design/icons";
import useAuth from "Hook/useAuth";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import { Services } from "Utils/Services";
import {
  AutoComplete,
  Avatar,
  Button,
  DatePicker,
  Form,
  Input,
  Radio,
  Select,
  notification,
} from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const [date, setDate] = useState("");
  const { appointmentId } = useParams();
  const [service, setService] = useState([]);
  const [status, setStatus] = useState(null);
  const [slot, setSlot] = useState([]);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const isFinishedDisabled = status === "cancelled";
  const isCancelledDisabled = status === "finished";

  const onFinish = async (values) => {
    const [startTime, endTime] = values.slot.split("+");
    const time = new Date(startTime);
    const appointmentData = {
      user_id: userId,
      patient_name: values.patientname,
      doctor_id: doctorId,
      doctor_name: values.doctor,
      appointment_date: values.date,
      startTime: time,
      endTime: new Date(time.getTime() + 60 * 60 * 1000),
      description: values.description,
      service,
      status: values.status,
    };
    try {
      const response = await axiosPrivate.put(
        `/appointment/update/status/${appointmentId}`,
        appointmentData
      );
      if (response.data.success === true) {
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

  const handlePickDate = async (date) => {
    try {
      const aptDate = new Date(date);
      const isoDateString = aptDate.toISOString();
      const formattedDateString = isoDateString.substr(0, 10);
      const response = await axiosPrivate.get(
        `/appointment/doctor/slot/${doctorId}/${formattedDateString}`
      );
      const slots = !response?.data?.data ? [] : response?.data?.data;
      setSlot(slots);
    } catch (error) {
      console.log(error);
      // notification.error({
      //   message: "Error",
      //   description: "Something went wrong",
      //   duration: 1,
      // });
    }
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

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const response = await axiosPrivate.get(
          `/appointment/specific/${appointmentId}`
        );
        const appointmentData = response?.data?.data;
        setDoctorId(appointmentData.doctor_id?._id);
        setUserId(appointmentData.user_id?._id);
        setStatus(appointmentData.status);
        setService(appointmentData.service);
        setDate(appointmentData.appointment_date);
        const start = new Date(appointmentData.startTime).toLocaleTimeString(
          [],
          {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }
        );
        const end = new Date(appointmentData.endTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        form.setFieldsValue({
          patientname: appointmentData.patient_name,
          doctor: appointmentData.doctor_id?.name,
          date: moment(new Date(appointmentData.appointment_date)),
          slot: `${start}-${end}`,
          email: appointmentData?.user_id?.email,
          service: appointmentData?.service.map((data) => ({
            value: data.type,
            price: data.price,
            _id: data._id,
          })),
          description: appointmentData.description,
          status: appointmentData.status,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getAppointments();
  }, [appointmentId, form]);

  useEffect(() => {
    if (doctorId) {
      const getSlots = async () => {
        try {
          const aptDate = new Date(date);
          const isoDateString = aptDate.toISOString();
          const formattedDateString = isoDateString.substr(0, 10);
          const response = await axiosPrivate.get(
            `/appointment/doctor/slot/${doctorId}/${formattedDateString}`
          );
          const slots = !response?.data?.data ? [] : response?.data?.data;
          setSlot(slots);
        } catch (error) {
          console.log(error);
          notification.error({
            message: "Error",
            description: "Something went wrong",
            duration: 1,
          });
        }
      };
      getSlots();
    }
  }, [doctorId]);

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
        <Input
          placeholder="Enter patient name"
          disabled={status !== "waiting"}
        />
      </Form.Item>

      <Form.Item
        name="doctor"
        label="Doctor"
        rules={[{ required: true, message: "Please select a doctor!" }]}
      >
        <AutoComplete
          disabled={status !== "waiting"}
          options={optionsDoctor}
          style={{ textAlign: "left" }}
          placeholder="Choose doctor"
          onSelect={(_, option) => {
            setDoctorId(option.key);
            form.setFieldsValue({
              date: "",
              slot: "",
            });
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
        <DatePicker
          disabled={status !== "waiting"}
          style={{ width: "100%" }}
          onChange={handlePickDate}
        />
      </Form.Item>

      <Form.Item name="slot" label="Appointment Time">
        <Select
          disabled={status !== "waiting"}
          placeholder="Select a time slot"
          style={{ width: "100%" }}
          rules={[{ required: true, message: "Please select a date!" }]}
        >
          {timeOptions}
        </Select>
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, message: "Please select a doctor!" }]}
      >
        <AutoComplete
          disabled={status !== "waiting"}
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
          disabled={status !== "waiting"}
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
          mode="multiple"
          disabled={status !== "waiting"}
          placeholder="Select service"
          options={Services}
          showSearch
          allowClear
          onSelect={(_, value) => {
            setService([...service, { type: value.value, price: value.price }]);
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
        <Button
          type="primary"
          style={{ background: "#1e8ed8", width: "100%", marginLeft: "50%" }}
          htmlType="submit"
        >
          Update Appointment
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditAppointment;
