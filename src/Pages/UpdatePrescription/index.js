import {
  MinusCircleOutlined,
  PlusOutlined,
  SendOutlined,
} from "@ant-design/icons";
import useAxiosPrivate from "Hook/useAxiosPrivate";
import { Button, Form, Input, Select, Space, notification } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "style.scss";
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
const EditPrescription = () => {
  const [doctorId, setDoctorId] = useState("");
  const [price, setPrice] = useState(0);
  const [userId, setUserId] = useState("");
  const [medicineList, setMedicineList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const appointmentId = searchParams.get("appointmentId")
    ? searchParams.get("appointmentId")
    : "";
  const prescriptionId = searchParams.get("prescriptionId")
    ? searchParams.get("prescriptionId")
    : "";
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    try {
      const response = await axiosPrivate.post(`/prescription/new`, {
        user_id: userId,
        doctor_id: doctorId,
        appointment_id: appointmentId,
        price: price,
        ...values,
      });
      if (response?.data?.success) {
        notification.success({
          message: "Success",
          description: response?.data?.data,
          duration: 1,
        });
        form.resetFields();
        navigate(-1);
      }
    } catch (error) {
      // console.log(error.response.data.data);
      console.log(error);
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
    label: user.name,
    price: user.price,
  });

  const optionsDoctor = medicineList.map((user) => renderOption(user));

  useEffect(() => {
    if (appointmentId) {
      axiosPrivate
        .get(`/appointment/specific/${appointmentId}`)
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
    axiosPrivate
      .get(`/medicine/all`)
      .then((res) => {
        const medicineList = res.data.data;
        setMedicineList(medicineList);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (prescriptionId) {
      axiosPrivate
        .get(`/prescription/list/detail/${prescriptionId}`)
        .then((res) => {
          const prescriptionData = res?.data?.data;
          // console.log(prescriptionData);
          form.setFieldsValue({
            diagnose: prescriptionData?.diagnose,
            medications: prescriptionData?.medications,
            notes: prescriptionData?.notes,
          });
        });
    }
  }, [prescriptionId, form]);

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
          name="notes"
          label="Note"
          rules={[{ required: false, message: "Note is required!" }]}
        >
          <Input.TextArea placeholder="Enter note" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            style={{ background: "#1e8ed8", width: "100%", marginLeft: "50%" }}
            htmlType="submit"
          >
            <SendOutlined />
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditPrescription;
