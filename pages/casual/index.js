import React, { useEffect, useState, useMemo } from "react";
import ChatBox from "../../src/components/ChatBox";
import MatchQueue from "../../src/config/QueueMatch";
import Quiz from "../../src/components/quiz";
import { db } from "../../src/config/firebaseConfig";
import Leaderbord from "../../src/components/LeaderBord";
import Grid from "antd/lib/card/Grid";
import { Col, Row } from "antd";
import Timer from "../../src/components/timer";
export default function Casual() {
  const [gameRoomId, setGameRoomId] = useState("");
  const [chatRoomIdm, setChatRoomId] = useState("");
  const [quizState, setQuizState] = useState(false);
  const hasTime = false;
  const overTime = 15;

  useEffect(() => {
    const Match = async () => {
      const [chatRoomId, gameRoomId] = await MatchQueue("Casual", 3);
      setGameRoomId(gameRoomId);
      setChatRoomId(chatRoomId);
    };
    Match();
  }, []);
  useEffect(() => {
    if (gameRoomId === "") {
      return;
    }
    let unsub;
    if (gameRoomId !== "") {
      unsub = db
        .collection("gameRoom")
        .doc(gameRoomId)
        .onSnapshot((doc) => {
          //do something with data change
          const data = doc.data();
          if (data.state === "Running") {
            setQuizState(true);
          }
        });
    }
    return () => {
      try {
        unsub();
      } catch {}
    };
  }, [gameRoomId]);
  const onWin = () => {
    //DO Something When Win to db
  };
  const onLoose = () => {
    //Do Something When Loose to db
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <ChatBox ChatRoomId={chatRoomIdm} key="1"></ChatBox>
      {hasTime && (
        <Timer
          key="555"
          gameRoomId={gameRoomId}
          quizState={quizState}
          overTime={overTime}
        ></Timer>
      )}
      <Quiz
        gameRoomId={gameRoomId}
        quizState={quizState}
        hasTime={hasTime}
        key="10"
      ></Quiz>{" "}
      <Leaderbord
        gameRoomId={gameRoomId}
        timeBased={hasTime}
        key="a"
        onWin={onWin}
        onLoose={onLoose}
      ></Leaderbord>
    </div>
  );
}
