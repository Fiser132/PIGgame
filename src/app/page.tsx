import React from 'react';





function PigGame() {
  return (
    <div>
      <div className="modal hidden">
        <button className="close-modal">&times;</button>
        <h1 className="won0 hidden">Player 1 won🎉🤩</h1>
        <h1 className="won1 hidden">Player 2 won🎉🤩</h1>

        vercel

      </div>
      <div className="overlay hidden"></div>


      <section className="player player--0 player--active">
        <h2 className="name" id="name--0">Player 1</h2>

        <p className="score" id="score--0">43</p>
        <div className="current">


          <p className="current-label">Current</p>
          <p className="current-score" id="current--0">0</p>
        </div>
      </section>
      <img src="./dice-1.png" alt="Playing dice" className="dice" />
      <section className="player player--1">

        <h2 className="name" id="name--1">Player 2</h2>

        <p className="score" id="score--1" >24</p>
        <div className="current">
          <p className="current-label">Current</p>
          <p className="current-score" id="current--1">0</p>
        </div>
      </section>


      <button className="btn btn--new">🔄 New game</button>
      <button className="btn btn--roll">🎲 Roll dice</button>
      <button className="btn btn--hold">📥 Hold</button>
    </div>
  );
}

export default PigGame;
