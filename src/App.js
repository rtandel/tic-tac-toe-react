import React, { useState } from 'react'
import logo from './logo.svg';
import './App.css';
import Board from './components/Board';
import Header from './components/Header';

function App() {
  const [playerNum, setPlayerNum] = useState();

  const playerSelection = num  => {
    console.log(num);
    setPlayerNum(num);
  };

  return (
    <div className="App">
      { !playerNum ? (
        <React.Fragment>
          <button onClick={() => playerSelection(1)}>Single Player</button>
          <button onClick={() => playerSelection(2)}>Two Players</button>
        </React.Fragment>
      ) : null}
      {playerNum ? (
        <React.Fragment>
          <Board players={playerNum} />
        </React.Fragment>
      ): null}
      
    </div>
  );
}

export default App;
