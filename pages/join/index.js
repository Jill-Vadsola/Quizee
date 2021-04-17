import { useState, useEffect } from "react";
import ChatBox from "../../src/components/ChatBox";
import { auth, db } from "../../src/config/firebaseConfig";
import firebase from "firebase";
import JoinRoom from "../../src/config/JoinRoom";

export default function Join() {
  const [roomCode, setRoomCode] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [roomCodeInput, setRoomCodeInput] = useState("");
  const [chatRoomCode, setChatRoomCode] = useState("");

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
        </div>
      )}
    </div>
  );
}
