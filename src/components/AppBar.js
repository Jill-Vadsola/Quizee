import { PageHeader, Button } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { useRouter } from "next/router";
export default function App() {
  const router = useRouter();
  const nonAuthButtons = [
    <Button>SignUp</Button>,
    <Button type="primary">Login</Button>,
  ];
  const AuthButtons = [];
  return (
    <PageHeader
      className="site-page-header"
      title="Quizee"
      extra={[
        <Button
          onClick={() => {
            router.push("/Login");
          }}
        >
          SignUp
        </Button>,
        <Button
          type="primary"
          onClick={() => {
            router.push("/signup");
          }}
        >
          Login
        </Button>,
      ]}
      subTitle="The Online Multiplayer Quiz Game"
    ></PageHeader>
  );
}
