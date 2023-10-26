import React, { useState } from "react";
export default function Player({ name, symbol, isActive, setPlayersName }) {
  const [playerName, setPlayerName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  function updatePlayerInfo() {
    setIsEditing((isEditing) => !isEditing);
    if (isEditing) {
      setPlayersName(symbol, playerName);
    }
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  return (
    <li className={isActive ? "active" : ""}>
      <span className="player">
        {isEditing ? (
          <input
            type="text"
            required
            value={playerName}
            onChange={handleChange}
          />
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={updatePlayerInfo}>{isEditing ? "save" : "Edit"}</button>
    </li>
  );
}
