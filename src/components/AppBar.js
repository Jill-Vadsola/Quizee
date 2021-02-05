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
    <Button
      onClick={(e) => {
        router.push("/signup");
      }}
    >
      SignUp
    </Button>,
    <Button
      type="primary"
      onClick={(e) => {
        router.push("/login");
      }}
    >
      Login
    </Button>,
  ];
  const AuthButtons = [
    <Button type="primary" danger>
      SignOut
    </Button>,
  ];
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
