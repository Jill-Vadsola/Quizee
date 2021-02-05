import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { AutoComplete } from "antd";
import Link from "next/link";
import { auth } from "../../src/config/firebaseConfig";
const { Option } = AutoComplete;
import { useRouter } from "next/router";
import { useEffect } from "react";
import { route } from "next/dist/next-server/server/router";

const Login = () => {
  const [result, setResult] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const form = useForm();
  const router = useRouter();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        route.push("/");
      }
    });
  }, []);

  const handleSearch = (value) => {
    let res = [];

    if (!value || value.indexOf("@") >= 0) {
      res = [];
    } else {
      res = ["gmail.com", "yahoo.com", "outlook.com"].map(
        (domain) => `${value}@${domain}`
      );
    }

    setResult(res);
  };

  const loginUser = async () => {
    try {
      const values = await form.validateFields();
    } catch {
      return;
    }
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        router.push("/");
      })
      .catch((err) => {
        //todo:add error signin
      });
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Form
      form={form}
      style={{ maxWidth: "300px", marginTop: "150px", marginLeft: "40%" }}
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        value={email}
        onChange={(e) => {
          console.log(e.target.value);
          setEmail(e.target.value);
        }}
        rules={[
          {
            required: true,
            message: "Please input your Email!",
          },
        ]}
      >
        <AutoComplete
          onSearch={handleSearch}
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder={"Email"}
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

      <Form.Item
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          type="primary"
          onClick={loginUser}
          className="login-form-button"
        >
          Log in
        </Button>

        <Link href="/signup">register now!</Link>
      </Form.Item>
    </Form>
  );
};
export default Login;
