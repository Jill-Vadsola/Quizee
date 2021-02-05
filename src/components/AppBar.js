import { PageHeader, Button } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { auth } from "../config/firebaseConfig";
export default function App() {
  const router = useRouter();
  const [links, setLinks] = useState();

  const nonAuthButtons = [
    <Button>SignUp</Button>,
    <Button type="primary">Login</Button>,
  ];
  const AuthButtons = [];
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLinks(AuthButtons);
      } else {
        setLinks(nonAuthButtons);
      }
    });
  }, []);

  return (
    <PageHeader
      className="site-page-header"
      title="Quizee"
      extra={links}
      subTitle="The Online Multiplayer Quiz Game"
    ></PageHeader>
  );
}
