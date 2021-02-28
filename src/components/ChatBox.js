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
    <div
      style={{
        backgroundColor: "#282c34",
        border: "1px solid black",
        width: "300px",
        height: "400px",
        maxWidth: "70%",
        overflowY: "scroll",
        //overflow: "scroll",
      }}
    >
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
      <div
        style={{
          position: "absolute ",
          bottom: "1px",
          left: "0px",
          right: "0px",
          display: "block",
          paddingLeft: "2px",
          paddingRight: "2px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Input
            style={{
              width: "70%",
            }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="enter message"
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
    </div>
  );
}

function Message({ content, name, isMe }) {
  return (
    <Row justify={isMe ? "end" : "start"}>
      <Col
        span={10}
        style={{
          maxWidth: "60%",
          padding: "10px",

          backgroundColor: "rgb(58, 58, 58)",
          borderRadius: "10px",
          color: "white",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <Text
          style={{
            fontSize: "120px",
            color: "white",
            fontWeight: "bold",
          }}
        >
          {content}
        </Text>
        <Text
          style={{
            color: "wheat",
            fontSize: "10px",
            display: "block",
          }}
          type="secondary"
        >
          {name}
        </Text>
      </Col>
    </Row>
  );
}
