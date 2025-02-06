import axios from "axios";
import React, { useState } from "react";

function Alpha() {
  const [find, setFind] = useState({});

  async function fetchPlayers(id) {
    try {
      const response = await axios.get(
        "https://in.global.nba.com/stats2/league/playerlist.json?locale=en",
        { params: { id: id } }
      );
      setFind(response.data);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  }

  return (
    <div>
      <button onClick={() => fetchPlayers("a")}>Show Players with 'a'</button>
      <ul>
        {find.payload &&
          find.payload.players
            .filter(
              (player) =>
                player.playerProfile.firstName.includes("a") ||
                player.playerProfile.lastName.includes("a")
            )
            .map((player) => (
              <li key={player.playerProfile.playerId}>
                {player.playerProfile.firstName} {player.playerProfile.lastName}
              </li>
            ))}
      </ul>
    </div>
  );
}

export default Alpha;
