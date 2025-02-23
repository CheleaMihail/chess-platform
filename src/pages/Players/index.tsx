import React from "react";
import { Button } from "react-bootstrap";
import { useAppDispatch } from "../../redux";
import { fetchSearchPlayers } from "../../redux/players/asyncActions";
import { FaSearch } from "react-icons/fa";

import "./style.scss";

const Players = () => {
  const dispatch = useAppDispatch();

  const handleSearchPlayers = () => {
    dispatch(fetchSearchPlayers("jo"));
  };

  return (
    <main className="container-fluid h-100 bg-transparent">
      <div className="d-flex align-items-center mb-3">
        <FaSearch className="text-warning me-2" size={20} />
        <span className="text-light fs-5">Search players</span>
      </div>
      <input
        type="text"
        className="form-control search-input"
        placeholder="Type to search..."
      />
    </main>
  );
};

export default Players;
