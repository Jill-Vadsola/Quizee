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
      <h1>{roomId}</h1>
      <Row 
      style={{
        paddingRight:"20vw",
      }}
      >
        <Col span={6} pull={6}>
          {roomId}
        </Col>
        <Col span={18} push={6}>
          <ChatBox ChatRoomId={chatRoomId}></ChatBox>
        </Col>
      </Row>
    </div>
  );
}
