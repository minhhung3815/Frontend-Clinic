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
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import React from "react";
import {
  PlusOutlined,
  MinusCircleOutlined,
  UserOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import useAxiosPrivate from "Hook/useAxiosPrivate";
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
const EditSchedule = () => {
  const axiosPrivate = useAxiosPrivate();
  const { scheduleId } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    try {
      const response = await axiosPrivate.put(
        `/schedule/update/${scheduleId}`,
        values
      );
      if (response?.data?.success) {
        notification.success({
          message: "Success",
          description: response?.data?.data,
          duration: 1,
        });
        navigate(`/admin/schedule`);
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

  useEffect(() => {
    axiosPrivate
      .get(`/schedule/doctor/${scheduleId}`)
      .then((res) => {
        const doctorData = res.data.data;
        const antdTime = doctorData.working_time.map((data) => {
          const time_list = data.time.map((time) => moment(new Date(time)));
          return {
            date: data.date,
            time: time_list,
          };
        });
        form.setFieldsValue({
          doctor: doctorData.doctor_id?.name,
          working_time: antdTime,
        });
      })
      .catch((error) => console.error(error));
  }, [form, scheduleId]);

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
        <Input placeholder="Doctor" disabled />
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
        <Button type="primary" style={{ background: "#1e8ed8" }} htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditSchedule;
