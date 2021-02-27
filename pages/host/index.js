import { Row, Col } from "antd";
import { useState, useEffect } from "react";
import ChatBox from "../../src/components/ChatBox";
import { auth, db } from "../../src/config/firebaseConfig";
export default function Host() {
  const [roomId, setRoomId] = useState(false);
  const [chatRoomId, setChatRoomId] = useState();
  useEffect(() => {
    const createRoom = async () => {
      const chatRoomsRes = await db.collection("chatRooms").add({ chats: [] });
      setChatRoomId(chatRoomId);
      const res = await db.collection("rooms").add({
        chatRoomId: chatRoomsRes.id,
        members: [
          { id: auth.currentUser.uid, name: auth.currentUser.displayName },
        ],
        roomType: "Host",
      });
      setRoomId(res.id);
      console.log(res.id, chatRoomsRes.id);
    };
    auth.onAuthStateChanged((user) => {
      if (user && !roomId) {
        createRoom();
      }
    });
  }, []);

  return (
    <div>
      <Row justify="center" align="top">
        <Col span={6} pull={18}>
          {roomId}
        </Col>
        <Col span={18} push={6}>
          <ChatBox ChatRoomId={chatRoomId}></ChatBox>
        </Col>
      </Row>
    </div>
  );
}
