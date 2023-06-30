import React from "react";
import styles from "./Graph.module.css";
import Axis from "./Axis";
import Word from "./Word";
import axios from "axios";
import WordList from "./Wordlist";

import { useState } from "react";

const Graph = () => {
  const [xLeftInputValue, setXLeftInputValue] = useState("salty");
  const [xRightInputValue, setXRightInputValue] = useState("sweet");
  const [yTopInputValue, setYTopInputValue] = useState("healthy");
  const [yBottomInputValue, setYBottomInputValue] = useState("unhealthy");

  const initialWords = [
    {
      text: "Apple",
      x: 150,
      y: 190,
    },
    {
      text: "Orange",
      x: 160,
      y: 180,
    },
    {
      text: "Cucumber",
      x: 60,
      y: 170,
    },
    {
      text: "Tomato",
      x: 100,
      y: 160,
    },
    {
      text: "Potato Chip",
      x: 20,
      y: 50,
    },
  ];

  const [words, setWords] = useState(initialWords);
  const [embeddingInstruction, setEmbeddingInstruction] = useState(
    "Edit the axis labels and click the button to reorganize the words."
  );
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleButtonClick = async () => {
    setEmbeddingInstruction("Reorganizing your words...");
    setButtonDisabled(true);

    const response = await axios.post("/api/position", {
      xLeft: xLeftInputValue,
      xRight: xRightInputValue,
      yTop: yTopInputValue,
      yBottom: yBottomInputValue,
      words: words.map((word) => word.text),
    });
    // remove white space from the beginning and end of the response data
    response.data = response.data.trim();

    // parse the response data as a JSON object
    const newWords = JSON.parse(response.data);
    console.log("Word coords", newWords);

    setWords(newWords);
    setEmbeddingInstruction(
      "Edit the axis labels and click the button to reorganize the words."
    );
    setButtonDisabled(false);
  };

  return (
    <>
      <main className={styles.main}>
        <input
          className={styles.xLeft}
          type="text"
          value={xLeftInputValue}
          onChange={(event) => setXLeftInputValue(event.target.value)}
        />
        <input
          className={styles.xRight}
          type="text"
          value={xRightInputValue}
          onChange={(event) => setXRightInputValue(event.target.value)}
        />
        <input
          className={styles.yTop}
          type="text"
          value={yTopInputValue}
          onChange={(event) => setYTopInputValue(event.target.value)}
        />
        <input
          className={styles.yBottom}
          type="text"
          value={yBottomInputValue}
          onChange={(event) => setYBottomInputValue(event.target.value)}
        />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          fill="none"
          stroke="black"
          className={styles.svg}
        >
          <Axis />
          {words.map((word, index) => (
            <Word x={word.x} y={word.y} text={word.text} key={index} />
          ))}
        </svg>

        <div className={styles.title}>
          <div className={styles.header}>Graph Axis Experiment</div>
          <div className={styles.subheader}>Powered by GPT-4</div>
          <WordList words={words} setWords={setWords} />
        </div>

        <div className={styles.embeddingContainer}>
          <div className={styles.instructions}>{embeddingInstruction}</div>
          <button
            className={`${styles.getEmbeddings} ${
              buttonDisabled ? styles.buttonDisabled : ""
            } p-4 bg-gray-900 hover:bg-black text-white  `}
            disabled={buttonDisabled}
            onClick={handleButtonClick}
          >
            Reorganize Words
          </button>
        </div>
      </main>
      ;
    </>
  );
};

export default Graph;
