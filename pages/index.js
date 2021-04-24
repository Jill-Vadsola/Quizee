import Head from "next/head";
import React from "react";
import { Descriptions, Divider } from "antd";
import Icon from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/router";
import { auth, db } from "../src/config/firebaseConfig";
import { useState, useEffect } from "react";

export default function Home() {
  const [isauth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState({
    CasualGamesPlayed: 0,
    CasualamesWin: 0,
    CompetitiveGamesPlayed: 0,
    CompetitiveGamesWin: 0,
  });

  const style = { background: "#0092ff", padding: "8px 0" };
  useEffect(() => {
    const getUserData = async () => {
      const user = await (
        await db.collection("users").doc(auth.currentUser.uid).get()
      ).data();
      setUserData(user);
    };
    auth.onAuthStateChanged((user) => {
      if (user) {
        getUserData();
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  }, []);

  return (
    <div style={{
      backgroundColor:"rgba(187,147,83,25)",
      width:"100%",
      height:"auto"
    }}>
      <Head>
        <title>Quizee</title>
        <link rel="icon"></link>
      </Head>
      <div>
        {isauth ? (
          <div>
            <Divider></Divider>

            <Descriptions
            style={{
              marginLeft:"10px",marginRight:"10px"
            }}
              key="xasxaxa"
              bordered
              title={auth.currentUser.providerData[0].displayName}
              column={{ md: 4, sm: 2, xs: 1 }}
            >
              <Descriptions.Item key="qas" label="Competitive matches Played" style={{backgroundColor:"rgb(255,255,255)"}}>
                {userData.CompetitiveGamesPlayed}
              </Descriptions.Item>
              <Descriptions.Item key="qqqa" label="Competitive matches win" style={{backgroundColor:"rgb(255,255,255)"}}>
                {userData.CompetitiveGamesWin}
              </Descriptions.Item>
              <Descriptions.Item key="sda" label="Casual matches Played" style={{backgroundColor:"rgb(255,255,255)"}}>
                {userData.CasualGamesPlayed}
              </Descriptions.Item>
              <Descriptions.Item key="wa" label="Casual matches win" style={{backgroundColor:"rgb(255,255,255)"}}>
                {userData.CasualamesWin}
              </Descriptions.Item>
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
            key="qa"
            imagePath="/images/casual.svg"
            name="Casual"
            RedirectPath={isauth ? "/casual" : "/signup"}
          ></CardForGameMode>
          <CardForGameMode
            key="a"
            imagePath="/images/competitive.svg"
            name="Competitive"
            RedirectPath={isauth ? "/competitive" : "/signup"}
          ></CardForGameMode>
          <CardForGameMode
            key="as"
            imagePath="/images/host.svg"
            name="Host Game"
            RedirectPath={isauth ? "/host" : "/signup"}
          ></CardForGameMode>
          <CardForGameMode
            key="aa"
            imagePath="/images/join.svg"
            name="Join Game"
            RedirectPath={isauth ? "/join" : "/signup"}
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
