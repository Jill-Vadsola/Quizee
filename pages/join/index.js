import { useState, useEffect } from "react";
import { Input } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Radio } from 'antd';
import ChatBox from "../../src/components/ChatBox";
import { auth, db } from "../../src/config/firebaseConfig";
import firebase from "firebase";
import JoinRoom from "../../src/config/JoinRoom";
import Quiz from "../../src/components/quiz";
import Leaderbord from "../../src/components/LeaderBord";
import Timer from "../../src/components/timer";

export default function Join() {
  const [roomCode, setRoomCode] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [roomCodeInput, setRoomCodeInput] = useState("");
  const [chatRoomCode, setChatRoomCode] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [queNums, setQueNums] = useState(10);
  const [time, setTime] = useState(15);
  useEffect(() => {
    const connectRoom = async () => {
      if (roomCode !== "") {
        const chatId = await JoinRoom(roomCode);
        setChatRoomCode(chatId);
        setIsConnected(true);
      }
    };
    connectRoom();
  }, [roomCode]);

  useEffect(() => {
    if (roomCode === "") {
      return;
    }
    const unsub = db
      .collection("gameRoom")
      .doc(roomCode)
      .onSnapshot(async (s) => {
        const data = await s.data();
        setTime(data.time);
        setQueNums(data.queNums.length / 5);
        console.error(data);
        if (data.state === "Running") {
          setGameStarted(true);
        }
      });
    return () => {
      unsub();
    };
  }, [roomCode]);

  return (
    <div style={{
      backgroundColor:"rgba(187,147,83,25)",
      width:"100%",
      height:"680px"
    }}>
      {!isConnected ? (
        <div>
          <input
          style={{position:"relative",left:"40vw",top:"18vw",padding:"5px",width:"300px"}}
            placeholder="Enter Room Code Here"
            value={roomCodeInput}
            onChange={(e) => {
              setRoomCodeInput(e.target.value);
            }}
          ></input>
          <Button type="primary" shape="round" size="large" 
          style={{position:"relative",left:"20.5vw",top:"21vw",width:"300px"}}
            onClick={(e) => {
              setRoomCode(roomCodeInput);
            }}
          >
            {" "}
            JOIN
          </Button>
        </div>
      ) : (
        <div>
          {gameStarted ? (
            <div>
              <Timer
                key="555"
                gameRoomId={roomCode}
                quizState={gameStarted}
                overTime={time}
              ></Timer>
              
            </div>
          ) : (
            <h2 style={{marginLeft:"15px"}}>Waiting for Host To Start Game</h2>
          )}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
          <Leaderbord
            gameRoomId={roomCode}
            timeBased={true}
            key="a"
            onWin={() => {}}
            onLoose={() => {}}
          ></Leaderbord>
          </div>
          <div>
          <Quiz
                queMultiplier={queNums}
                gameRoomId={roomCode}
                quizState={gameStarted}
                hasTime={true}
                key="10"
              ></Quiz>
              </div>
              <div>
              <ChatBox ChatRoomId={chatRoomCode}></ChatBox>
              </div>
              </div>
        </div>
      )}
    </div>
  );
}
