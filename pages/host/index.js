import { Row, Col } from "antd";
import { useState, useEffect } from "react";
import ChatBox from "../../src/components/ChatBox";
import createRoom from "../../src/config/CreateRoom";
import CreateRoom from "../../src/config/CreateRoom";
export default function Host() {
  const [roomId, setRoomId] = useState("");
  const [chatRoomId, setChatRoomId] = useState("");
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const MakeRoom = async () => {
      const { gameRoomId, chatRoomId } = await createRoom("Custom");
      setChatRoomId(chatRoomId);
      setRoomId(gameRoomId);
    };
    MakeRoom();
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
