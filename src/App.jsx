import React, { useState } from "react";
import Player from "./Player";
import GameBoard from "./GameBoard";
import Log from "./Log";
import { winingCombinations } from "./winingCombination.js";
import GameOver from "./GameOver";

const initailGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deActivePlayer(games) {
  let currentPlayer = "X";
  if (games.length > 0 && games[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [playersName, setPlayersName] = useState({
    X: "Player1",
    O: "Player2",
  });
  const activePlayer = deActivePlayer(gameTurns);

  let winner;
  let gameBoard = [...initailGameBoard.map((array) => [...array])];

  for (let turn of gameTurns) {
    let { player, square } = turn;
    let { row, col } = square;
    gameBoard[row][col] = player;
  }

  for (let combination of winingCombinations) {
    const firstSquareCell =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareCell =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareCell =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareCell &&
      firstSquareCell === secondSquareCell &&
      firstSquareCell === thirdSquareCell
    ) {
      winner = playersName[firstSquareCell];
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    //setActivePlayer((currentPlayer) => (currentPlayer === "X" ? "O" : "X"));
    setGameTurns((prevTurns) => {
      let currentPlayer = deActivePlayer(prevTurns);
      const updatedTurns = {
        player: currentPlayer,
        square: {
          row: rowIndex,
          col: colIndex,
        },
      };
      return [updatedTurns, ...prevTurns];
    });
  }

  function handlePlayerName(symbol, newName) {
    setPlayersName((prevPlayer) => {
      return {
        ...prevPlayer,
        [symbol]: newName,
      };
    });
  }

  console.log("my game board", gameBoard);
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name="player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            setPlayersName={setPlayersName}
          />
          <Player
            name="player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            setPlayersName={setPlayersName}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver
            winner={winner}
            setGameTurns={setGameTurns}
            playersName={playersName}
          />
        )}
        <GameBoard
          handleSelectSquare={handleSelectSquare}
          gameBoard={gameBoard}
        />
        <Log list={gameTurns} />
      </div>
    </main>
  );
}

export default App;
