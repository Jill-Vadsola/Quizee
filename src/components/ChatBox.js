import { Button, Col, Input, Row, Typography } from "antd";
const { Text } = Typography;

import { useEffect, useState } from "react";
import { auth, db } from "../config/firebaseConfig";
export default function ChatBox({ ChatRoomId }) {
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (!ChatRoomId) {
      return;
    }
    let unsubscribe = db
      .collection("chatRooms")
      .doc(ChatRoomId)
      .onSnapshot((snapshot) => {
        if (snapshot.data === undefined) {
          return;
        }

        setChats(snapshot.data().chats);
        console.log(snapshot.data());
      });

    return () => {
      unsubscribe();
    };
  }, [ChatRoomId]);
  return (
    <div>
      {chats.length !== 0 ? (
        chats.map((c) => (
          <Message
            content={c.content}
            name={c.name}
            key={c.content}
            isMe={c.uid === auth.currentUser.uid}
          ></Message>
        ))
      ) : (
        <div></div>
      )}
      <div>
        <Input
        style={{
          marginLeft: "20vw",
        marginTop: "70px",
        width:"35vw"
        }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message"
        ></Input>
        <Button
          onClick={() => {
            setChats(chats);
            db.collection("chatRooms")
              .doc(ChatRoomId)
              .update({
                chats: [
                  ...chats,
                  {
                    uid: auth.currentUser.uid,
                    name: auth.currentUser.displayName,
                    content: message,
                  },
                ],
              });
          }}
        >
          Send
        </Button>
      </div>
    </div>
  );
}

function Message({ content, name, isMe }) {
  return (
    <Row justify={isMe ? "end" : "start"}>
      <Col span={3}>
        <Text>{content+" "}</Text>
        <Text type="secondary">{name}</Text>
      </Col>
    </Row>
  );
}
