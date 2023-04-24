import {
  AutoComplete,
  Button,
  Cascader,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Upload,
  Radio,
  TimePicker,
} from 'antd'
import { useState } from 'react'
import React from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom'

const { Option } = Select
const { RangePicker } = DatePicker
const normFile = (e) => {
  console.log('Upload event:', e)
  if (Array.isArray(e)) {
    return e
  }
  return e?.fileList
}
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
}

const EditDoctor = () => {
  const { userId } = useParams()
  const [form] = Form.useForm()
  const onFinish = (values) => {
    console.log('Received values of form: ', values)
  }

  const [autoCompleteResult, setAutoCompleteResult] = useState([])

  return (
    <Form
      {...formItemLayout}
      form={form}
      name='register'
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      scrollToFirstError
    >
      <Form.Item name='appointmentid' label='Appointment ID'>
        <Input />
      </Form.Item>

      <Form.Item name='patientname' label='Patient Name'>
        <Input />
      </Form.Item>

      <Form.Item name='doctor' label='Doctor'>
        <Input />
      </Form.Item>

      <Form.Item label='Date'>
        <DatePicker renderExtraFooter={() => 'extra footer'} showTime />
      </Form.Item>

      <Form.Item label='Time'>
        <TimePicker use12Hours format='h:mm A' />
      </Form.Item>

      <Form.Item name='email' label='Patient Email'>
        <Input />
      </Form.Item>

      <Form.Item
        name='phone'
        label='Patient Phone Number'
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name='message' label='Message'>
        <Input.TextArea showCount maxLength={100} />
      </Form.Item>

      <Form.Item name='status' label='Appointment Status'>
        <Radio.Group>
          <Radio value='active'>Active</Radio>
          <Radio value='inactive'>Inactive</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          CREATE APPOINTMENT
        </Button>
      </Form.Item>
    </Form>
  )
}

export default EditDoctor
