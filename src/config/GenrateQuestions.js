import { auth, db } from "./firebaseConfig";

export const questionTypes = [
  "geo",
  "Culture",
  "Economy",
  "History",
  "Politics",
];

export const GenrateQuestions = async (questionNums) => {
  const questionsArr = [];
  for (let n = 0; n < questionNums.length; n++) {
    const QueType =
      questionTypes[
        Math.floor(n / (questionNums.length / questionTypes.length))
      ];

    let queD = await (
      await db
        .collection(`questions/all/${QueType}`)
        .doc(`${questionNums[n]}`)
        .get()
    ).data();
    console.log(queD);
    questionsArr.push(queD);
  }
  return questionsArr;
};
