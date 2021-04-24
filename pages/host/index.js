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
    <div
      style={{
        backgroundColor: "rgba(187,147,83,25)",
        width: "100%",
        height: "680px",
      }}
    >
      <div>
        <table
          style={{
            marginLeft: "40%",
            border: "1px solid black",
            position: "relative",
            top: "12vw",
          }}
        >
          <tr
            style={{
              textAlign: "center",
              backgroundColor: "rgb(44,44,52,0.95)",
            }}
          >
            <th colSpan="2">
              <h1 style={{ color: "whitesmoke" }}>Game Settings</h1>
            </th>
          </tr>
          <tr
            style={{
              backgroundColor: "rgb(255,255,255)",
              border: "1px solid black",
            }}
          >
            <td style={{ padding: "10px" }}>
              <label>Time Limit(Seconds)</label>
            </td>
            <td style={{ padding: "10px" }}>
              <InputNumber
                aria-label="Time Limit"
                min={15}
                max={120}
                defaultValue={15}
                onChange={(value) => setTime(value)}
              />
            </td>
          </tr>
          <tr
            style={{
              textAlign: "center",
              backgroundColor: "rgb(255,255,255)",
              border: "1px solid black",
            }}
          >
            <td style={{ padding: "10px" }}>
              <label>Questions Count : {NumQues}</label>
            </td>
            <td style={{ padding: "10px" }}>
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
            </td>
          </tr>
          <tr
            style={{
              textAlign: "center",
              backgroundColor: "rgb(255,255,255)",
              border: "1px solid black",
            }}
          >
            <td colspan="2" style={{ padding: "10px" }}>
              <Button
                onClick={(e) => {
                  MakeRoom();
                }}
              >
                Complete Setup
              </Button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  ) : (
    <div
      style={{
        backgroundColor: "rgba(187,147,83,25)",
        width: "100%",
        height: "680px",
      }}
    >
      {started ? (
        <div>
          <Timer
            key="555"
            gameRoomId={roomId}
            quizState={started}
            overTime={time}
          ></Timer>
        </div>
      ) : (
        <div>
          <h1 style={{ marginLeft: "15px" }}>Room Id : {roomId}</h1>
          <p style={{ marginLeft: "15px" }}>Share This To Your Friend </p>
          <div></div>
          <Button
            style={{ position: "relative", top: "13vw", left: "47vw" }}
            type="primary"
            shape="round"
            size="large"
            onClick={(e) => StartQuiz()}
          >
            Start Quiz
          </Button>
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Leaderbord
            gameRoomId={roomId}
            timeBased={true}
            key="a"
            onWin={() => {}}
            onLoose={() => {}}
          ></Leaderbord>
        </div>
        <div>
          <Quiz
            queMultiplier={NumQues / 5}
            gameRoomId={roomId}
            quizState={started}
            hasTime={true}
            key="10"
          ></Quiz>
        </div>
        <div>
          <ChatBox ChatRoomId={chatRoomId}></ChatBox>
        </div>
      </div>
    </div>
  );
}

//Show All Dials For Changes and button for start quiz
//After That Similar experiance
