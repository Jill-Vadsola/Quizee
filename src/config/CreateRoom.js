import { auth, db } from "../../src/config/firebaseConfig";

const createRoom = async (type) => {
  let chatroomRef = await db.collection("chatRooms").add({
    chats: [],
  });

  //select que from que pool
  let gameRoomRef = await db.collection("gameRoom").add({
    state: "Waiting",
    type: type,
    chatRoomId: chatroomRef.id,
    playersData: [
      {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid,
        score: 0,
      },
    ],
  });
  return {
    gameRoomId: gameRoomRef.id,
    chatRoomId: chatroomRef.id,
  };
};

export default createRoom;
