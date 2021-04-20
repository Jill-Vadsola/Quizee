import { auth, db } from "../../src/config/firebaseConfig";
import createRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";
import firebase from "firebase";

export default async function MatchQueue(
  type = "Casual",
  queCounts = 2,
  playerLimit = 3
) {
  const queurRef = db.collection("queue").doc(type);
  const data = await (await queurRef.get()).data();
  console.log(data);
  if (data.rooms === undefined || data.rooms.length === 0) {
    //if room queue is empty
    const roomData = await createRoom(type, queCounts * 5);
    queurRef.set({
      rooms: [roomData],
    });
    return [roomData.chatRoomId, roomData.gameRoomId];
  } else {
    //is some rooms available
    const gameRoomId = data.rooms[0].gameRoomId;

    //join room
    const chatRoomId = await JoinRoom(data.rooms[0].gameRoomId);
    let roomData = { gameRoomId, chatRoomId };
    let gameRoomData = await db
      .collection("gameRoom")
      .doc(roomData.gameRoomId)
      .get();

    if ((await gameRoomData.data().playersData.length) >= playerLimit) {
      //if three players joined than close the room for other players
      await queurRef.update({
        rooms: firebase.firestore.FieldValue.arrayRemove({ roomData }),
      });
      //set game room setting to start
      await db.collection("gameRoom").doc(roomData.gameRoomId).update({
        state: "Running",
      });
    }
    return [roomData.chatRoomId, roomData.gameRoomId];
  }
}
