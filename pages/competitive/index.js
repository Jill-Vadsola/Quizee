import { Button, Col, Input, Row, Typography } from "antd";
import React, { useEffect, useState, useMemo } from "react";
import ChatBox from "../../src/components/ChatBox";
import MatchQueue from "../../src/config/QueueMatch";
import Quiz from "../../src/components/quiz";
import { auth, db } from "../../src/config/firebaseConfig";
import Leaderbord from "../../src/components/LeaderBord";
import Timer from "../../src/components/timer";
import firebase from "firebase";
export default function Casual() {
  const [gameRoomId, setGameRoomId] = useState("");
  const [chatRoomIdm, setChatRoomId] = useState("");
  const [quizState, setQuizState] = useState(false);
  const hasTime = true;
  const overTime = 30;
  const playerCount = 3;
  const questionMultiplier = 4;
  useEffect(() => {
    const Match = async () => {
      const [chatRoomId, gameRoomId] = await MatchQueue(
        "Competitive",
        questionMultiplier,
        playerCount
      );
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
  const onWin = async () => {
    //DO Something When Win to db
    await db
      .collection("users")
      .doc(auth.currentUser.uid)
      .update({
        CompetitiveGamesPlayed: firebase.firestore.FieldValue.increment(1),
        CompetitiveGamesWin: firebase.firestore.FieldValue.increment(1),
      });
  };
  const onLoose = async () => {
    //Do Something When Loose to db

    await db
      .collection("users")
      .doc(auth.currentUser.uid)
      .update({
        CompetitiveGamesPlayed: firebase.firestore.FieldValue.increment(1),
      });
  };
  return (
    <div style={{
      backgroundColor:"rgba(187,147,83,25)",
      width:"100%",
      height:"680px"
    }}>
      <h3 style={{marginLeft:"15px"}}>
        Answer All {questionMultiplier * 5} questions Before Timer Runs Out To
        Win
      </h3>
      <Row>
        <Col style={{position:"relative",top:"1vw"}}>
      <ChatBox ChatRoomId={chatRoomIdm} key="1"></ChatBox>
      </Col>
      <Row style={{padding: "10px",marginTop:"20px"}}>
      <Quiz
        queMultiplier={questionMultiplier}
        gameRoomId={gameRoomId}
        quizState={quizState}
        hasTime={hasTime}
        key="10"
      ></Quiz>{" "}
       <Col>
      <Row style={{padding: "10px",
      marginLeft:"50vw"}}>
      {hasTime && (
        <Timer
          key="555"
          gameRoomId={gameRoomId}
          quizState={quizState}
          overTime={overTime}
        ></Timer>
      )}
      </Row>
      <Row
      style={{padding: "10px",
      marginLeft:"50vw"}}>
      <Leaderbord
        gameRoomId={gameRoomId}
        timeBased={hasTime}
        key="a"
        onWin={onWin}
        onLoose={onLoose}
      ></Leaderbord>
      </Row>
      </Col>
      </Row>
      </Row>
    </div>
  );
}
