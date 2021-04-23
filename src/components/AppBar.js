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
import Link from "next/link";
export default function App() {
  const router = useRouter();
  const [links, setLinks] = useState();

  const nonAuthButtons = [
    <Button
      key="mmmmmmxasxaxm"
      onClick={(e) => {
        router.push("/signup");
      }}
    >
      SignUp
    </Button>,
    <Button
      key="axasxas"
      type="primary"
      onClick={(e) => {
        router.push("/login");
      }}
    >
      Login
    </Button>,
  ];
  const AuthButtons = [
    <Button
      key="222"
      type="primary"
      danger
      onClick={(e) => {
        auth.signOut();
      }}
    >
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
    style={{backgroundColor:"rgb(44,44,52,0.95)"}}
      className="site-page-header"
      title={<a href="/">Quizee</a>}
      extra={links}
      subTitle={<span style={{color:"whitesmoke"}}>The Online Multiplayer Quiz Game</span>}
    >
    </PageHeader>
  );
}
