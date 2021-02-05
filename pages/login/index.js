import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { AutoComplete } from 'antd';
const { Option } = AutoComplete;

const Complete = () => {
  const [result, setResult] = useState([]);

  const handleSearch = (value) => {
    let res = [];

    if (!value || value.indexOf('@') >= 0) {
      res = [];
    } else {
      res = ['gmail.com', 'yahoo.com', 'outlook.com'].map((domain) => `${value}@${domain}`);
    }

    setResult(res);
  };


  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
    style={{maxWidth: "300px",
  marginTop: "150px",
marginLeft:"40%"}}

      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <AutoComplete
        style={{
          width: "300px",
        }}
      onSearch={handleSearch}
      placeholder="Username"
    >
      {result.map((email) => (
        <Option key={email} value={email}>
          {email}
        </Option>
      ))}
    </AutoComplete>
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
  );
};
export default Complete;
