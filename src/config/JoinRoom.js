import { auth, db } from "../../src/config/firebaseConfig";
import firebase from "firebase";

const JoinRoom = async (roomCode) => {
  let gameRoomData = await db.collection("gameRoom").doc(roomCode).get();
  await db
    .collection("gameRoom")
    .doc(roomCode)
    .update({
      playersData: firebase.firestore.FieldValue.arrayUnion({
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        score: 0,
      }),
    });
  return await gameRoomData.data().chatRoomId;
};

export default JoinRoom;
