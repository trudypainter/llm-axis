import { WordProps } from "./Graph";
import styles from "./Wordlist.module.css";
import { useState } from "react";

const WordList = ({ words, setWords }) => {
  const [newWordClicked, setNewWordClicked] = useState(false);
  const [newWord, setNewWord] = useState("");

  // if delete is clicked remove that word from the list of words
  const handleDelete = (word) => {
    const newWords = words.filter((w) => w.text !== word.text);
    console.log("new words: ", newWords);
    setWords(newWords);
  };

  // if add is clicked add that word to the list of words
  const handleAdd = () => {
    const newWords = words.concat({ text: newWord, x: -100, y: -100 });
    setWords(newWords);
    setNewWordClicked(false);
  };

  return (
    <div className={styles.boxOutline}>
      <div className={styles.header}>Edit Words</div>
      {words.map((word) => (
        <div className={styles.wordElm} key={word.text}>
          <span>{word.text}</span>
          <span>
            {word.x < 0 && <span className={styles.warning}>⚠</span>}
            <span onClick={() => handleDelete(word)} className={styles.delete}>
              X
            </span>
          </span>
        </div>
      ))}
      {newWordClicked ? (
        <div className={styles.addBox}>
          <input
            onChange={(event) => setNewWord(event.target.value)}
            type="text"
          ></input>
          <div className={styles.submitDiv}>
            <span
              className={styles.cancel}
              onClick={() => setNewWordClicked(false)}
            >
              Cancel
            </span>
            <span onClick={() => handleAdd()} className={styles.add}>
              Add
            </span>
          </div>
        </div>
      ) : (
        <div onClick={() => setNewWordClicked(true)} className={styles.new}>
          + New Word
        </div>
      )}
    </div>
  );
};

export default WordList;
