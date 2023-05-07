import {
  EditOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import NewContext from "Context/createContext";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import { Services } from "Utils/Services";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Space,
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

const ViewAppointment = () => {
  const { isModalOpen, setIsModalOpen, appointmentData, setView } =
    useContext(NewContext);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const axiosPrivate = useAxiosPrivate();
  const [appointmentId, setAppointmentId] = useState("");

  const handleOk = () => {
    setIsModalOpen(false);
    setView(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
    setView(false);
  };

  const onFinish = async (values) => {
    // console.log(values);
    try {
      const response = await axiosPrivate.put(
        `/appointment/update/status/${appointmentId}`,
        {
          ...appointmentData,
          status: values?.status,
        }
      );
      if (response.data.success === true) {
        notification.success({
          message: "Success",
          description: response?.data?.data,
          duration: 1,
        });
        window.location.reload();
        setIsModalOpen(false);
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

  const handleAddPrescription = () => {
    const prescriptionId = appointmentData?.prescription_id
      ? appointmentData?.prescription_id
      : "";
    const appointmentId = appointmentData?._id;
    if (!prescriptionId) {
      navigate(`/new-prescription?appointmentId=${appointmentId}`);
    } else {
      notification.warning({
        message: "Warning",
        description: "Appointment already has prescription.",
      });
    }
  };

  const handleUpdate = () => {
    const prescriptionId = appointmentData?.prescription_id
      ? appointmentData?.prescription_id
      : "";
    const appointmentId = appointmentData?._id;
    if (prescriptionId) {
      navigate(
        `/edit-prescription?appointmentId=${appointmentId}&prescriptionId=${prescriptionId}`
      );
    } else {
      notification.warning({
        message: "Warning",
        description:
          "Appointment has no prescription. Please create a new one before edit",
      });
    }
  };

  useEffect(() => {
    setAppointmentId(appointmentData?._id);
    form.setFieldsValue({
      aptid: appointmentData?.appointmentId,
      patientname: appointmentData?.patient_name,
      doctor: appointmentData?.doctor_name,
      date: moment(appointmentData?.appointment_date),
      slot: [
        moment(appointmentData?.startTime),
        moment(appointmentData?.endTime),
      ],
      service: appointmentData?.service?.map((data) => ({
        value: data.type,
        price: data.price,
        _id: data._id,
      })),
      status: appointmentData?.status,
      description: appointmentData?.description,
    });
  }, [form, appointmentData]);
  return (
    <Modal
      title="Update Appointment"
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
        <Form.Item name="aptid" label="APT-ID">
          <Input disabled />
        </Form.Item>

        <Form.Item name="patientname" label="Patient Name">
          <Input disabled />
        </Form.Item>

        <Form.Item name="doctor" label="Doctor">
          <Input disabled />
        </Form.Item>

        <Form.Item name="date" label="Date">
          <DatePicker disabled style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="slot" label="Time">
          <TimePicker.RangePicker
            disabled
            style={{ width: "100%" }}
            use12Hours
            format="h:mm A"
          />
        </Form.Item>

        <Form.Item name="service" label="Service">
          <Select
            mode="multiple"
            placeholder="Select service"
            options={Services}
            showSearch
            allowClear
            disabled
            style={{ textAlign: "left" }}
          ></Select>
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input.TextArea
            disabled
            showCount
            maxLength={100}
            placeholder="Enter description"
          />
        </Form.Item>

        <Form.Item name="status" label="Status">
          <Select>
            <Select.Option value="examined" />
          </Select>
        </Form.Item>

        <Form.Item>
          <Space style={{ marginLeft: "50%" }} size="middle" align="baseline">
            <FileTextOutlined
              type="link"
              title="New prescription"
              onClick={handleAddPrescription}
              style={{ color: "red", fontSize: "20px" }}
            />

            <EditOutlined
              type="link"
              title="Edit prescription"
              onClick={handleUpdate}
              style={{ color: "blue", fontSize: "20px" }}
            />
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ViewAppointment;
