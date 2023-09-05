import React, { useState } from "react";
import plusButton from "../../images/icon-plus.svg";
import minusButton from "../../images/icon-minus.svg";
import "./style/Score.css";

const Score = ({ score = 0 }) => {
  const [currentScore, setCurrentScore] = useState({
    score,
  });

  const handlerScoreAdd = () => {
    setCurrentScore((oldScore) => {
      return { score: oldScore.score + 1 };
    });
  };

  const handlerScoreDecrease = () => {
    if (currentScore.score !== 0) {
      setCurrentScore((oldScore) => {
        return { score: oldScore.score - 1 };
      });
    }
  };

  return (
    <div className="score">
      <div className="plusButton">
        <button type="button" onClick={handlerScoreAdd}>
          <img src={plusButton} alt="plusButton" />
        </button>
      </div>
      <p className="commentScore">{currentScore.score}</p>
      <div className="minusButton">
        <button type="button" onClick={handlerScoreDecrease}>
          <img src={minusButton} alt="minusButton" />
        </button>
      </div>
    </div>
  );
};

export default Score;
