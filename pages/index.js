import Head from "next/head";
import React from "react";
import { Descriptions, Divider } from "antd";
import Icon from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/router";
import { auth } from "../src/config/firebaseConfig";
import { useState, useEffect } from "react";

export default function Home() {
  const [isauth, setIsAuth] = useState(false);

  const style = { background: "#0092ff", padding: "8px 0" };
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  }, []);

  return (
    <div>
      <Head>
        <title>Quizee</title>
        <link rel="icon"></link>
      </Head>
      <div>
        {isauth ? (
          <div>
            <Divider></Divider>

            <Descriptions
              bordered
              title={auth.currentUser.providerData[0].displayName}
              column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="competitive matches">
                7
              </Descriptions.Item>
              <Descriptions.Item label="Winrate">80%</Descriptions.Item>
              <Descriptions.Item label="Rank">Silver 1</Descriptions.Item>
              <Descriptions.Item label="Best Catagory">Geo</Descriptions.Item>
            </Descriptions>
            <Divider></Divider>
          </div>
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <CardForGameMode
            imagePath="/images/casual.svg"
            name="Casual"
            RedirectPath="/casual"
          ></CardForGameMode>
          <CardForGameMode
            imagePath="/images/competitive.svg"
            name="Competitive"
            RedirectPath="/competitive"
          ></CardForGameMode>
          <CardForGameMode
            imagePath="/images/host.svg"
            name="Host Game"
            RedirectPath="/host"
          ></CardForGameMode>
          <CardForGameMode
            imagePath="/images/join.svg"
            name="Join Game"
            RedirectPath="/join"
          ></CardForGameMode>
        </div>
      </div>
    </div>
  );
}

function CardForGameMode({ imagePath, RedirectPath, name }) {
  const router = useRouter();
  return (
    <div
      style={{
        flex: "50%",
        maxWidth: "50%",
        padding: "0 4px",
        position: "relative",
        textAlign: "center",
      }}
    >
      <Image
        onClick={() => {
          router.push(RedirectPath);
        }}
        width="250px"
        height="250px"
        src={imagePath}
        alt={name}
      ></Image>
      <p
        style={{
          textAlign: "center",
          left: "13vw",
          fontSize: "3vw",
          color: "black",
        }}
      >
        {name}
      </p>
    </div>
  );
}
