import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { AutoComplete } from "antd";
const { Option } = AutoComplete;
import { useRouter } from "next/router";
import { auth } from "../../src/config/firebaseConfig";
const Complete = () => {
  const [result, setResult] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSearch = (value) => {
    let res = [];

    if (!value || value.indexOf("@") >= 0) {
      res = [];
    } else {
      res = ["gmail.com", "yahoo.com", "outlook.com"].map(
        (domain) => `${value}@${domain}`
      );
    }

    setResult([]);
  };
  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        router.push("/");
      }
    });
  }, []);

  function LoginWithFirebase() {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        router.push("/");
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  }

  return (
    <Form
      style={{ maxWidth: "300px", marginTop: "150px", marginLeft: "40%" }}
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      >
        <AutoComplete
          style={{
            width: "300px",
          }}
          onSearch={handleSearch}
          placeholder="Email"
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
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        rules={[
          {
            required: true,
            message: "Please input your Password!",
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
        <Button
          onClick={LoginWithFirebase}
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Complete;
