import axios from "axios";
import React, { useState } from "react";

function Search() {
  const [search, setSearch] = useState("");

  async function searchData(id) {
    try {
      const response = await axios.get(
        "https://in.global.nba.com/stats2/league/playerlist.json?locale=en",
        { params: { id: id } }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={() => searchData(search)}>Search</button>
    </div>
  );
}

export default Search;
