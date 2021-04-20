import React, { useEffect, useState, useMemo } from "react";
import ChatBox from "../../src/components/ChatBox";
import MatchQueue from "../../src/config/QueueMatch";
import Quiz from "../../src/components/quiz";
import { db, auth } from "../../src/config/firebaseConfig";
import Leaderbord from "../../src/components/LeaderBord";
import Timer from "../../src/components/timer";
import firebase from "firebase";
import { useRouter } from "next/router";
export default function Casual() {
  const [gameRoomId, setGameRoomId] = useState("");
  const [chatRoomIdm, setChatRoomId] = useState("");
  const [quizState, setQuizState] = useState(false);

  //For Future Use (without counter Games)
  const hasTime = true;
  //Time Limit
  const overTime = 15;
  //Automatically start when player count matched
  const playerCount = 3;
  //Number Of Questions Asked in Round
  const questionMultiplier = 3;
  useEffect(() => {
    const Match = async () => {
      const [chatRoomId, gameRoomId] = await MatchQueue(
        "Casual",
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
  const onWin = () => {
    //DO Something When Win to db
    db.collection("users")
      .doc(auth.currentUser.uid)
      .update({
        CasualGamesPlayed: firebase.firestore.FieldValue.increment(1),
        CasualamesWin: firebase.firestore.FieldValue.increment(1),
      });
  };
  const onLoose = () => {
    //Do Something When Loose to db

    db.collection("users")
      .doc(auth.currentUser.uid)
      .update({
        CasualGamesPlayed: firebase.firestore.FieldValue.increment(1),
      });
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <h3>
        Answer All {questionMultiplier * 5} questions Before Timer Runs Out To
        Win
      </h3>
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
        queMultiplier={questionMultiplier}
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
