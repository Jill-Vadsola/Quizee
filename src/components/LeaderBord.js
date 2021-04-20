import { useEffect, useState } from "react";
import { auth, db } from "../config/firebaseConfig";

export default function Leaderbord({
  gameRoomId,
  timeBased = false,
  onWin,
  onLoose,
}) {
  const [data, setData] = useState([]);
  const [ended, setEnded] = useState(false);
  const [winner, setWinner] = useState(false);
  useEffect(() => {
    if (gameRoomId === "") {
      return;
    }
    const unSub = db
      .collection("gameRoom")
      .doc(gameRoomId)
      .onSnapshot((e) => {
        const playerData = e
          .data()
          .playersData.sort((a, b) => b.score - a.score);
        setData(playerData);
        if (e.data().state === "Ended") {
          setEnded(true);
          if (
            playerData[0].id == auth.currentUser.uid ||
            playerData[1].score === playerData[0].score
          ) {
            setWinner(true);
            onWin();
          } else {
            onLoose();
          }
        }
      });
    return () => {
      unSub();
    };
  }, [gameRoomId]);

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div>
      {ended && <div>{winner ? "Winner" : "Better Luck Next Time"}</div>}

      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Score</th>
          </tr>
          {data.map((e, idx) => {
            return (
              <tr>
                <td>{e.name}</td>
                <td>{e.score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
