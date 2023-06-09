import useAxiosPrivate from "Hook/useAxiosPrivate";
import {
  Button,
  Form,
  Input,
  Radio,
  Space,
  notification
} from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "style.scss";

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
const EditRequest = () => {
  const navigate = useNavigate();
  const params = useParams();
  const axiosPrivate = useAxiosPrivate();
  const { requestId } = params;
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    try {
      const response = await axiosPrivate.put(
        `/request/edit/${requestId}`,
        values
      );
      if (response?.data?.success) {
        notification.success({
          message: "Success",
          description: response?.data?.data,
          duration: 1,
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

  useEffect(() => {
    axiosPrivate
      .get(`/request/specific/requests/${requestId}`)
      .then((res) => {
        const responseData = res?.data?.data;
        // console.log(responseData);
        form.setFieldsValue({
          from: responseData?.user_id?.email,
          title: responseData?.title,
          explanation: responseData?.explanation,
          response: responseData?.response,
          accepted: responseData?.accepted,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [requestId, form]);
  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      scrollToFirstError
    >
      <Form.Item name="from" label="From">
        <Input disabled />
      </Form.Item>

      <Form.Item name="title" label="Title">
        <Input disabled />
      </Form.Item>

      <Form.Item name="explanation" label="Request">
        <Input.TextArea disabled placeholder="Description" />
      </Form.Item>

      <Form.Item name="response" label="Response">
        <Input.TextArea placeholder="Response" />
      </Form.Item>

      <Form.Item
        name="accepted"
        label="Accept"
        rules={[
          {
            required: true,
            message: "Please select options",
          },
        ]}
      >
        <Radio.Group>
          <Space size={50}>
            <Radio value="accept">Accept</Radio>
            <Radio value="reject">Reject</Radio>
          </Space>
        </Radio.Group>
      </Form.Item>

      <Form.Item>
        <Button type="primary" style={{ background: "#1e8ed8", width: "100%", marginLeft: "50%" }} htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditRequest;
