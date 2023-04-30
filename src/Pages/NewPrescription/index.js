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
  InputNumber,
} from "antd";
import { useEffect, useRef, useState } from "react";
import React from "react";
import {
  PlusOutlined,
  MinusCircleOutlined,
  UserOutlined,
  MailOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import "style.scss";
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
const NewPrescription = () => {
  const [doctorId, setDoctorId] = useState("");
  const [price, setPrice] = useState(0);
  const [userId, setUserId] = useState("");
  const [medicineList, setMedicineList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const appointmentId = searchParams.get("id") ? searchParams.get("id") : "";
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    // console.log(values);
    // console.log(price);
    try {
      const response = await axiosPrivate.post(`/prescription/new`, {
        user_id: userId,
        doctor_id: doctorId,
        appointment_id: appointmentId,
        price: price,
        ...values,
      });
      notification.success({
        message: "New prescription",
        description: response.data.data,
      });
      navigate("/prescriptions");
    } catch (error) {
      // console.log(error.response.data.data);
      notification.error({
        message: "New prescirption",
        description: error.response.data.data,
      });
    }
  };

  const renderOption = (user) => ({
    key: user._id,
    value: user.name,
    label: user.name,
    price: user.price,
  });

  const optionsDoctor = medicineList.map((user) => renderOption(user));

  useEffect(() => {
    if (appointmentId) {
      axiosPrivate.get(`/appointment/specific/${appointmentId}`)
        .then((res) => {
          const appointmentData = res.data.data;
          setDoctorId(appointmentData.doctor_id?._id);
          setUserId(appointmentData.user_id?._id);
          form.setFieldsValue({
            patient_name: appointmentData.patient_name,
            email: appointmentData.user_id?.email,
            doctor_name: appointmentData.doctor_id?.name,
          });
        })
        .catch((error) => console.error(error));
    }
  }, [appointmentId, form]);

  useEffect(() => {
    axiosPrivate.get(`/medicine/all`)
      .then((res) => {
        const medicineList = res.data.data;
        setMedicineList(medicineList);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          name="patient_name"
          label="Patient"
          rules={[{ required: true, message: "Patient name is required!" }]}
        >
          <Input placeholder="Patient name" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Patient email is required!" }]}
        >
          <Input placeholder="Patient email" />
        </Form.Item>
        <Form.Item
          name="doctor_name"
          label="Doctor"
          rules={[{ required: true, message: "Please select a doctor!" }]}
        >
          <Input placeholder="Doctor name" />
        </Form.Item>

        <Form.Item
          name="diagnose"
          label="Diagnose"
          rules={[{ required: true, message: "Diagnose is required!" }]}
        >
          <Input placeholder="Enter diagnose" />
        </Form.Item>

        <Form.Item label="Medications">
          <Form.List name="medications">
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, "name"]}
                      rules={[
                        { required: true, message: "Medicince is missing" },
                      ]}
                    >
                      <Select
                        placeholder="Enter medicines"
                        options={optionsDoctor}
                        onSelect={(_, value) => {
                          setPrice(price + value.price);
                        }}
                        style={{ width: "100%" }}
                        showSearch
                        allowClear
                      >
                        <Option value="abc">abc</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name={[name, "dosage"]}
                      rules={[{ required: true, message: "Dosage is missing" }]}
                    >
                      <Input placeholder="Dosage" />
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

        <Form.Item
          name="note"
          label="Note"
          rules={[{ required: false, message: "Note is required!" }]}
        >
          <Input.TextArea placeholder="Enter note" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginLeft: "85%" }}
          >
            <SendOutlined />
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default NewPrescription;
