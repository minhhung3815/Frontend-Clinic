import { Button, DatePicker, Form, Input, Select, Upload, Radio, notification } from 'antd'
import { useEffect, useState } from 'react'
import React from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import Axios from "../../Axios/axios";
import locale from 'antd/es/date-picker/locale/en_US'
import moment from 'moment'

const { Option } = Select

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

const EditDoctor = () => {
  const navigate = useNavigate()
  const { userId, role } = useParams()
  const [previewImage, setPreviewImage] = useState(null)
  const [form] = Form.useForm()
  const onFinish = async (values) => {
    const formData = new FormData()
    formData.append('email', values.email)
    formData.append('name', values.name)
    formData.append('gender', values.gender)
    formData.append('phone_number', values.phone_number)
    formData.append('date_of_birth', values.date_of_birth)
    formData.append('image', values.avatar && values.avatar[0].originFileObj)
    try {
      const response = await Axios.put(`/user/edit/user/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      notification.success({
        message: 'Edit user',
        description: response.data.data,
      })
      navigate(-1)
    } catch (error) {
      notification.error({
        message: 'Edit user',
        description: 'Edit user profile failed',
      })
    }
  }
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  const handlePreview = (file) => {
    if (!file.url && !file.preview) {
      file.preview = URL.createObjectURL(file.originFileObj)
    }
    setPreviewImage(file.preview)
  }

  const customUpload = async (options) => {
    const { onSuccess, onError, file } = options
    try {
      onSuccess('success')
    } catch (error) {
      console.log(error)
      onError('error')
    }
  }
  useEffect(() => {
    const link = role === 'doctor' ? `/user/doctor/detail/${userId}` : `/user/account/detail/${userId}`
    Axios.get(link).then((res) => {
      const { name, email, date_of_birth, phone_number, gender, _id } = res.data.data
      form.setFieldsValue({
        id: _id,
        email: email,
        name: name,
        gender: gender,
        phone_number: phone_number,
        date_of_birth: moment(new Date(date_of_birth)),
      })
    })
  }, [])
  return (
    <Form
      {...formItemLayout}
      form={form}
      name='register'
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      scrollToFirstError
    >
      <Form.Item
        name='name'
        label='Username'
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='email'
        label='E-mail'
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: false,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      {/* <Form.Item
        name='password'
        label='Password'
        rules={[
          {
            required: false,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name='confirm'
        label='Confirm Password'
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: false,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'))
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item> */}

      {/* <Form.Item label='DatePicker'>
        <DatePicker style={{ width: '100%' }} />
      </Form.Item> */}

      <Form.Item
        name='gender'
        label='Gender'
        rules={[
          {
            required: false,
            message: 'Please select gender!',
          },
        ]}
      >
        <Select placeholder='Gender' style={{ textAlign: 'left' }}>
          <Option value='male'>Male</Option>
          <Option value='female'>Female</Option>
          <Option value='other'>Other</Option>
        </Select>
      </Form.Item>

      <Form.Item name='date_of_birth' label='Date'>
        <DatePicker locale={locale} />
      </Form.Item>

      {/* <Form.Item name='address' label='Address'>
        <Input />
      </Form.Item> */}

      <Form.Item
        name='phone_number'
        label='Phone Number'
        rules={[{ required: false, message: 'Please input your phone number!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name='avatar' label='Avatar' valuePropName='fileList' getValueFromEvent={normFile}>
        <Upload
          customRequest={customUpload}
          beforeUpload={handlePreview}
          maxCount={1}
          listType='picture-card'
          // showUploadList={false}
        >
          <div>
            <PlusOutlined />
            <div
              style={{
                marginTop: 8,
              }}
            >
              Avatar
            </div>
          </div>
        </Upload>
      </Form.Item>
      {previewImage && (
        <img
          src={previewImage}
          alt='Avatar Preview'
          style={{ maxWidth: '100%', position: 'absolute', top: 0, left: 0 }}
        />
      )}
      <Form.Item name='bio' label='Short Biography' rules={[{ required: false, message: 'Please input bio' }]}>
        <Input.TextArea showCount maxLength={100} />
      </Form.Item>

      <Form.Item name='status' label='Status'>
        <Radio.Group>
          <Radio value='active'>Active</Radio>
          <Radio value='inactive'>Inactive</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default EditDoctor
