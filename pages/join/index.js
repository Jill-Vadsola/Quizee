import { useState, useEffect } from "react";
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
    <div>
      {!isConnected ? (
        <div>
          <input
            placeholder="Enter Room Code"
            value={roomCodeInput}
            onChange={(e) => {
              setRoomCodeInput(e.target.value);
            }}
          ></input>
          <button
            onClick={(e) => {
              setRoomCode(roomCodeInput);
            }}
          >
            {" "}
            JOIN
          </button>
        </div>
      ) : (
        <div>
          <ChatBox ChatRoomId={chatRoomCode}></ChatBox>
          <Leaderbord
            gameRoomId={roomCode}
            timeBased={true}
            key="a"
            onWin={() => {}}
            onLoose={() => {}}
          ></Leaderbord>
          {gameStarted ? (
            <div>
              <Timer
                key="555"
                gameRoomId={roomCode}
                quizState={gameStarted}
                overTime={time}
              ></Timer>
              <Quiz
                queMultiplier={queNums}
                gameRoomId={roomCode}
                quizState={gameStarted}
                hasTime={true}
                key="10"
              ></Quiz>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
}
