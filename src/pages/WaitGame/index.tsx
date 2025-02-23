// @ts-nocheck
import React from "react";
import { FaShareAlt } from "react-icons/fa";
import { FaChess, FaCopy } from "react-icons/fa6";

const WaitGame = () => {
  const game = { id: 1, mode: "public", type: "frendly", color: "random" };
  const gameUrl = process.env.REACT_APP_API_URL + "/game/" + game.id;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(gameUrl);
  };
  return (
    <div className="container mt-5 text-white d-flex justify-content-center">
      <div
        className="card p-4"
        style={{
          maxWidth: "500px",
          background: "#1a1a1a",
          borderRadius: "10px",
        }}
      >
        {game.mode === "private" && (
          <p className="text-center">
            You have created a private game. Only players with the direct link
            or an invitation can join. Share the game URL below or wait for the
            invitation to be accepted.
          </p>
        )}
        {game.mode === "public" && (
          <p className="text-center">
            This game is public and placed in the lobby. However, if no one
            joins, it might be due to a lack of players currently online. Just
            share the link below with some of your friends and enjoy chess.
          </p>
        )}

        <h4 className="text-center text-info">
          <FaChess className="me-2" />
          Blitz <span className="text-primary">3+0</span> | Friendly game
        </h4>
        <p className="text-center">Random colors</p>

        <p className="text-center fw-bold">
          Share the game URL with your friend
        </p>
        <div className="d-flex justify-content-center align-items-center">
          <a
            href={gameUrl}
            className="text-info"
            target="_blank"
            rel="noopener noreferrer"
          >
            {gameUrl}
          </a>
          <button className="btn btn-dark ms-2" onClick={copyToClipboard}>
            <FaCopy />
          </button>
          <button className="btn btn-dark ms-2">
            <FaShareAlt />
          </button>
        </div>

        <div className="text-center mt-3">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Game will be started as soon as another player joins</p>
        </div>

        <p
          className="text-center text-primary mt-2"
          style={{ cursor: "pointer" }}
        >
          Cancel
        </p>
        <p className="text-center text-muted">
          The game will be canceled if you leave or refresh this page, or if you
          lose your internet connection.
        </p>
      </div>
    </div>
  );
};

export default WaitGame;
