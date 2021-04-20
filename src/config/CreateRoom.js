import { auth, db } from "../../src/config/firebaseConfig";

const createRoom = async (type, numberQues = 10) => {
  let chatroomRef = await db.collection("chatRooms").add({
    chats: [],
  });

  //select que from que pool
  let gameRoomRef = await db.collection("gameRoom").add({
    queNums: GenrateQuestions(numberQues),
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
  console.log(chatroomRef);
  return {
    gameRoomId: gameRoomRef.id,
    chatRoomId: chatroomRef.id,
  };
};

export default createRoom;

function GenrateQuestions(numberQues) {
  const arr = [];
  for (let i = 0; i < numberQues; i++) {
    const rand = Math.floor(Math.random() * 10) + 1;
    if (arr.length === 0) {
      arr.push(rand);
      continue;
    }
    if (arr[i - 1] === rand) {
      if (rand === 9) {
        arr.push(8);
      } else {
        rand++;
        arr.push(rand);
      }
    } else {
      arr.push(rand);
    }
  }
  return arr;
}
