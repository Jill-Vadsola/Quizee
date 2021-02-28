import { Row, Col } from "antd";
import { useState, useEffect } from "react";
import ChatBox from "../../src/components/ChatBox";
import { auth, db } from "../../src/config/firebaseConfig";
export default function Host() {
  const [roomId, setRoomId] = useState("");
  const [chatRoomId, setChatRoomId] = useState("");
  useEffect(() => {
    const createRoom = async () => {
      let chatroomRef = await db.collection("chatRooms").add({
        chats: [],
      });
      setChatRoomId(chatroomRef.id);
      let gameRoomRef = await db.collection("gameRoom").add({
        chatRoomId: chatroomRef.id,
        playersData: [{ name: "shreyansh", id: "xanxhuasnxhuasn" }],
      });
      setRoomId(gameRoomRef.id);
      console.log(roomId);
    };
    createRoom();
  }, []);

  return (
    <div>
      <h1>Room Id : {roomId}</h1>
      <p>Share This To Your Friend </p>
      <div
        style={{
          paddingRight: "20vw",
        }}
      >
        <ChatBox ChatRoomId={chatRoomId}></ChatBox>
      </div>
    </div>
  );
}
