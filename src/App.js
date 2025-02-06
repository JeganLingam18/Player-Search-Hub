import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    playercall();
  }, []);

  function playercall() {
    fetch("/playerlist.json")
      .then((response) => response.json())
      .then((values) => setData(values.payload.players));
  }

  const alphabets = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  const [searchTerm, setSearchTerm] = useState(""); // Search input state
  const [selectedLetter, setSelectedLetter] = useState(""); // Alphabet selected state

  // Handle input change for search box
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle button click (for alphabet buttons)
  const handleClick = (letter) => {
    setSelectedLetter(letter); // Update the selected letter
  };

  // Filter players based on both selected letter (for first name) and search term (for last name)
  const filteredPlayers = data.filter((player) => {
    const matchesFirstName = selectedLetter
      ? player.playerProfile.lastName.startsWith(selectedLetter)
      : true;
    const matchesLastName = searchTerm
      ? player.playerProfile.firstName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        player.playerProfile.lastName
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      : true;

    return matchesFirstName && matchesLastName;
  });

  return (
    <div className="container">
      {/* Alphabet Buttons */}
      <div className="alphabet-buttons">
        {alphabets.map((letter) => (
          <button
            key={letter}
            onClick={() => handleClick(letter)}
            className="alphabet-button"
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Search Box */}
      <div className="search-box">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by name..."
          className="search-input"
        />
      </div>

      {/* Player Table */}
      <table className="player-table">
        <thead>
          <tr>
            <th>Player</th>
            <th>Experience</th>
            <th>Draft Year</th>
            <th>Height</th>
            <th>Weight</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlayers.length > 0 ? (
            filteredPlayers.map((player) => (
              <tr key={player.playerId}>
                <td className="player-info">
                  <img
                    src={`https://cdn.nba.com/headshots/nba/latest/260x190/${data.playerId}.png`}
                    alt="Player"
                    className="player-image"
                  />
                  {player.playerProfile.firstName} <br />
                  {player.playerProfile.lastName}
                </td>
                <td>{player.playerProfile.experience}</td>
                <td>{player.playerProfile.draftYear}</td>
                <td>{player.playerProfile.height}</td>
                <td>{player.playerProfile.weight}</td>
                <td>{player.playerProfile.countryEn}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-players">
                No players found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
