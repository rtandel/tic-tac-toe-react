import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Cell from "./Cell";
import Player from "./Player";
import Header from "./Header";

const BoardWrapper = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  font-size: calc(10px + 2vmin);
  color: white;

  &.single {
    flex-direction: column;
  }
`;

const GameBoard = styled.div`
  display: grid;
  grid-gap: 1px;
  grid-template-columns: repeat(3, 1fr);
`;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const array = [];
for (let i = 0; i < 9; i++) {
  array.push('');
}

let turn = false;
let value = 0;
// true = X
// false = O
const Board = ({ players }) => {
  console.log(players);
  const [gameProgress, setProgress] = useState(array);
  const [winner, setWinner] = useState('')

  useEffect(() => {
    console.log(gameProgress);
    checkWinner(value)
  })

  const selection = (val) => {
    const array = [...gameProgress];
    if (array[val] === '') {
      if (turn) {
        array[val] = 'X';
      } else {
        array[val] = 'O';
      }

      value = array[val];


      turn = !turn

      setProgress(array);
    }
  };

  const reset = (val) => {
    let txt = '';
    if (window.confirm("Are you sure you'd like to reset?")) {
        txt = "You pressed OK!";
      } else {
        txt = "You pressed Cancel!";
        return;
    }
    const array = [];
    for (let i = 0; i < 9; i++) {
        array.push('');
    }
    setWinner(null);
    setProgress(array);
  };

  const checkWinner = (val) => {
    let count = 0;
    for (let i = 0; i < winningCombinations.length; i++) {
      for (let y = 0; y < 3; y++) {
        if (gameProgress[winningCombinations[i][y]] === val) {
          count++;
        }
        if (count == 3) {
          console.log("Winner");
          setWinner(val)
        }
      }
      count = 0;
    }

    return false;
  }

  const generateBoard = () => {
    return (
      <GameBoard>
        <Cell index={0} value={gameProgress[0]} select={winner ? null: selection} />
        <Cell index={1} value={gameProgress[1]} select={winner ? null: selection} />
        <Cell index={2} value={gameProgress[2]} select={winner ? null: selection}  />
        <Cell index={3} value={gameProgress[3]} select={winner ? null: selection}  />
        <Cell index={4} value={gameProgress[4]} select={winner ? null: selection} />
        <Cell index={5} value={gameProgress[5]} select={winner ? null: selection} />
        <Cell index={6} value={gameProgress[6]} select={winner ? null: selection}  />
        <Cell index={7} value={gameProgress[7]} select={winner ? null: selection}  />
        <Cell index={8} value={gameProgress[8]} select={winner ? null: selection}  />
      </GameBoard>
    );
  };

  if (players == 1) {
    return (
      <BoardWrapper className={"single"}>
        <Player name={"Player 1"} />
        {generateBoard()}
      </BoardWrapper>
    );
  }

  if (players == 2) {
    return (
      <React.Fragment>
        <Header />
        {winner ? <p>The Winner is {winner} </p> : null }
        <button onClick={reset}>Reset</button>
        <BoardWrapper>
          <Player name={"Player 1"} />
          {generateBoard()}
          <Player name={"Player 2"} />
        </BoardWrapper>
      </React.Fragment>
    );
  }
};

export default Board;
