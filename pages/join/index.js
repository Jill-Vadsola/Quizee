import { useState, useEffect } from "react";
import ChatBox from "../../src/components/ChatBox";
import { auth, db } from "../../src/config/firebaseConfig";
export default function Join() {
  const [roomCode, setRoomCode] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [roomCodeInput, setRoomCodeInput] = useState("");
  const [chatRoomCode, setChatRoomCode] = useState("");
  useEffect(() => {
    const connectRoom = async () => {
      if (roomCode !== "") {
        //        let gameRoomRef = await db.collection("gameRoom").add({
        let gameRoomData = await db.collection("gameRoom").doc(roomCode).get();

        setChatRoomCode(gameRoomData.data().chatRoomId);
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
