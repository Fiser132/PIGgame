'use client';
import React, { useState } from 'react';




function PigGame() {

  const [score, updateScore] = useState<number[]>([0, 0]);
  const [current, updateCurrent] = useState<number>(0);
  const [playerActive, updatePlayer] = useState<number>(0);

  const [dice, updateDice] = useState<number>(1);
  const [game, updateGame] = useState<string>('hello');
  const diceRoll = () => {
    if (game === 'hello') {

      const roll = Math.trunc(Math.random() * 6) + 1;
      updateDice(roll);






      if (dice === 1) {
        updateCurrent(0);
        updatePlayer(playerActive === 0 ? 1 : 0);
      } else {
        updateCurrent(current + roll);

      }
    }
  };
  const Newgame = () => {
    updateScore([0, 0]);
    updateCurrent(0);
    updatePlayer(0);
    updateDice(1);
    updateGame('hello');
  }




  const btnHold = () => {
    if (game === "hello") {
      const newS = [...score];
      newS[playerActive] += current;
      updateScore(newS);
      updateCurrent(0);


      updatePlayer(playerActive === 0 ? 1 : 0);
      if (newS[playerActive] >= 21) {
        updateGame('End')
      }
    }
  }
  return (
    <div>
      {game === 'hello' ? (
        <div>
          <div className="modal hidden">
            <button className="close-modal"></button>
            <h1 className="won0 hidden">Player 1 won🎉🤩</h1>
            <h1 className="won1 hidden">Player 2 won🎉🤩</h1>



          </div>
          <div className="overlay hidden"></div>


          <section className="player player--0 player--active">
            <h2 className="name" >👲Player 1</h2>

            <p className="score" >{score[0]}</p>
            <div className="current">


              <p className="current-label">Current</p>
              <p className="current-score" id="current--0">{playerActive === 0 ? current : 0}</p>
            </div>
          </section>
          <img src={`dice-${dice}.png`} alt={`Dice ${dice}`} className='dice' />
          <section className="player player--0 player--active">
            <h2 className="name" >👲Player 2</h2>

            <p className="score" >{score[1]}</p>
            <div className="current">


              <p className="current-label">Current</p>
              <p className="current-score" id="current--0">{playerActive === 1 ? current : 0}</p>
            </div>
          </section>
          <button onClick={diceRoll}>🎲Roll Dice</button>
          <button onClick={btnHold}>📥Hold</button>
        </div>
      ) : (

        <div>
          <h2>Player👑{playerActive} won👑</h2>


          <button onClick={Newgame}>New Game</button>
        </div>
      )}
    </div>
  );
}

export default PigGame;

