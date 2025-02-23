import React, { useState } from "react";
import { FaChessKing, FaLandmark } from "react-icons/fa6";
import { FaRocket } from "react-icons/fa6";
import { GiJetFighter } from "react-icons/gi";
import { FaDove } from "react-icons/fa6";
import { FaMeteor } from "react-icons/fa6";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CreateGamePanel = () => {
  const [minutes, setMinutes] = useState(3);
  const [increment, setIncrement] = useState(3);
  const [color, setColor] = useState("random");
  const [isRated, setIsRated] = useState(true);

  const getGameSpeed = () => {
    if (minutes <= 1)
      return (
        <div className="d-flex gap-2 align-content-center">
          <FaMeteor size={20} className="text-success" />
          Ultra
        </div>
      );
    if (minutes <= 3)
      return (
        <div className="d-flex gap-2 align-content-center">
          <FaRocket size={20} className="text-success" />
          Bullet
        </div>
      );
    if (minutes <= 10)
      return (
        <div className="d-flex gap-2 align-content-center">
          <GiJetFighter size={20} className="text-success" />
          Blitz
        </div>
      );
    if (minutes <= 30)
      return (
        <div className="d-flex gap-2 align-content-center">
          <FaDove size={20} className="text-success" />
          Rapid
        </div>
      );
    return (
      <div className="d-flex gap-2 align-content-center">
        <FaLandmark size={20} className="text-success" />
        Classic
      </div>
    );
  };

  return (
    <div className="gamePane">
      <div className="mt-3">
        <label className="form-label">{getGameSpeed()}</label>
        <input
          type="range"
          className="form-range"
          min="1"
          max="60"
          value={minutes}
          onChange={(e) => setMinutes(parseInt(e.target.value))}
        />
        <p>
          <span className="text-primary fw-bold">{minutes}</span> minutes
        </p>
        <input
          type="range"
          className="form-range"
          min="0"
          max="60"
          value={increment}
          onChange={(e) => setIncrement(parseInt(e.target.value))}
        />
        <p>
          <span className="text-primary fw-bold">+ {increment}</span> seconds
        </p>
      </div>
      <div className="my-4">
        <label className="form-label">Your color</label>
        <div className="btn-group w-100">
          <Button
            onClick={() => setColor("white")}
            className={`bg-transparent border-0 rounded-0 border-bottom border-2 ${
              color === "white" ? "border-success" : "border-transparent"
            }`}
          >
            <FaChessKing className="text-light" size={25} /> White
          </Button>
          <Button
            onClick={() => setColor("random")}
            className={`bg-transparent border-0 rounded-0 border-bottom border-2 ${
              color === "random" ? "border-success" : "border-transparent"
            }`}
          >
            Random
          </Button>
          <Button
            onClick={() => setColor("black")}
            className={`bg-transparent border-0 rounded-0 border-bottom border-2 ${
              color === "black" ? "border-success" : "border-transparent"
            }`}
          >
            <FaChessKing size={25} className="text-secondary" /> Black
          </Button>
        </div>
      </div>
      <div className="mt-3">
        <div className="btn-group w-100">
          <button
            className={`btn ${isRated ? "btn-success" : "btn-secondary"}`}
            onClick={() => setIsRated(true)}
          >
            Rating game
          </button>
          <button
            className={`btn ${!isRated ? "btn-success" : "btn-secondary"}`}
            onClick={() => setIsRated(false)}
          >
            Friendly game
          </button>
        </div>
      </div>
      <Link to={`/game/${1}`}>
        <button className="btn btn-primary w-100 mt-3">START</button>
      </Link>
      <Link to={`/game/${1}`}>
        <button className="btn btn-link mt-2 text-decoration-none w-100">
          Start private game
        </button>
      </Link>
    </div>
  );
};

export default CreateGamePanel;
