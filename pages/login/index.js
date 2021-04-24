import { Form, Input, Button, Checkbox, Alert } from "antd";
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
  const [alert, setAlert] = useState(false);
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
        setAlert(true);
      });
  }

  return (
    <body style={{
      backgroundColor:"rgba(187,147,83,25)",
      width:"100%",
      height:"680px"
    }}>
    <Form
      style={{ maxWidth: "300px",position:"relative",top:"13vw", marginLeft: "40%",backgroundColor:"rgb(44,44,52,0.95)",padding:"15px",borderRadius:"25px"}}
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
    >
      {alert ? (
        <Alert
          style={{
            marginBottom: "15px",
          }}
          message="Please Enter Correct Email And Password"
          type="warning"
          closable
          onClose={() => {
            setAlert(false);
          }}
        ></Alert>
      ) : (
        <React.Fragment></React.Fragment>
      )}
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
            width: "270px",
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
      <Form.Item style={{textAlign:"center"}}>
        <a 
          onClick={() => {
            auth.sendPasswordResetEmail(email);
          }}
          className="login-form-forgot"
          href=""
        >
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button style={{position:"relative",left:"7vw"}}
          onClick={LoginWithFirebase}
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          Log in
        </Button>
      </Form.Item>
    </Form>
    </body>
  );
};
export default Complete;
