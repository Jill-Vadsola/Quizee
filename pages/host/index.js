import { Row, Col, InputNumber, Button, Slider } from "antd";
import { useState, useEffect } from "react";
import ChatBox from "../../src/components/ChatBox";
import Quiz from "../../src/components/quiz";
import createRoom from "../../src/config/CreateRoom";
import Leaderbord from "../../src/components/LeaderBord";
import Timer from "../../src/components/timer";
import { db } from "../../src/config/firebaseConfig";
export default function Host() {
  const [roomId, setRoomId] = useState("");
  const [chatRoomId, setChatRoomId] = useState("");
  const [started, setStarted] = useState(false);
  const [roomCreated, setRoomCreated] = useState(false);
  const [time, setTime] = useState(15);
  const [NumQues, setNumQues] = useState(10);
  //TO Create Room
  const MakeRoom = async () => {
    const { gameRoomId, chatRoomId } = await createRoom("Custom", NumQues);
    await db.collection("gameRoom").doc(gameRoomId).update({
      time,
    });
    setChatRoomId(chatRoomId);
    setRoomId(gameRoomId);
    setRoomCreated(true);
  };

  const StartQuiz = async () => {
    await db.collection("gameRoom").doc(roomId).update({
      state: "Running",
    });
    setStarted(true);
  };

  function formatter(value) {
    return `${value}`;
  }

  return !roomCreated ? (
    <div>
      <h1>Game Settings</h1>
      <div>
        <label>Time Limit(Seconds)</label>
        <InputNumber
          aria-label="Time Limit"
          min={15}
          max={120}
          defaultValue={15}
          onChange={(value) => setTime(value)}
        />
      </div>
      <div>
        <label>Questions Count : {NumQues}</label>
        <Slider
          style={{ width: "200px" }}
          key="xas"
          min={5}
          max={20}
          step={5}
          defaultValue={10}
          tipFormatter={formatter}
          onChange={(value) => setNumQues(value)}
        />
      </div>
      <Button
        onClick={(e) => {
          MakeRoom();
        }}
      >
        Complete Setup
      </Button>
    </div>
  ) : (
    <div>
      {started ? (
        <div>
          <Timer
            key="555"
            gameRoomId={roomId}
            quizState={started}
            overTime={time}
          ></Timer>
          <Quiz
            queMultiplier={NumQues / 5}
            gameRoomId={roomId}
            quizState={started}
            hasTime={true}
            key="10"
          ></Quiz>
        </div>
      ) : (
        <div>
          <h1>Room Id : {roomId}</h1>
          <p>Share This To Your Friend </p>
          <div
            style={{
              paddingRight: "20vw",
            }}
          ></div>
          <Button onClick={(e) => StartQuiz()}>Start Quiz</Button>
        </div>
      )}
      <ChatBox ChatRoomId={chatRoomId}></ChatBox>
      <Leaderbord
        gameRoomId={roomId}
        timeBased={true}
        key="a"
        onWin={() => {}}
        onLoose={() => {}}
      ></Leaderbord>
    </div>
  );
}

//Show All Dials For Changes and button for start quiz
//After That Similar experiance
