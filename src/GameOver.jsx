export default function GameOver({ winner, setGameTurns }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      <p>{winner ? `${winner} won! ` : "It is draw"} </p>
      <p>
        <button onClick={() => setGameTurns([])}>Play Again!</button>
      </p>
    </div>
  );
}
