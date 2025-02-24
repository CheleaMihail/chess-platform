import React, { useState } from "react";
import { FaLandmark } from "react-icons/fa6";
import { FaRocket } from "react-icons/fa6";
import { GiJetFighter } from "react-icons/gi";
import { FaDove } from "react-icons/fa6";
import { FaMeteor } from "react-icons/fa6";
import { FaChessKing } from "react-icons/fa6";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ICreateGame, IGame } from "../../redux/rooms/slice";
import { EColorAttachMode, EGameType } from "../../types/enums";
import { connectToRoom } from "../../services/rooms";

interface CreateBattlePanelProps {
  newGame: ICreateGame;
  setNewGame: (game: ICreateGame) => void;
  onCreate: () => void;
  onCreatePrivate: () => void;
}

const CreateBattlePanel: React.FC<CreateBattlePanelProps> = ({
  newGame,
  setNewGame,
  onCreate,
  onCreatePrivate,
}) => {
  const getGameType = (minutes: number) => {
    if (minutes <= 1) return EGameType.ultra;
    if (minutes <= 3) return EGameType.bullet;
    if (minutes <= 10) return EGameType.blitz;
    if (minutes <= 30) return EGameType.rapid;
    return EGameType.classic;
  };

  const getGameTypeIcon = () => {
    switch (newGame.type) {
      case EGameType.ultra:
        return <FaMeteor size={20} className="text-success" />;
      case EGameType.bullet:
        return <FaRocket size={20} className="text-success" />;
      case EGameType.blitz:
        return <GiJetFighter size={20} className="text-success" />;
      case EGameType.rapid:
        return <FaDove size={20} className="text-success" />;
      case EGameType.classic:
        return <FaLandmark size={20} className="text-success" />;
    }
  };

  return (
    <div className="gamePane">
      <div className="mt-3 d-flex justify-content-between align-content-center">
        <div className="v-flex align-content-center">Number of games</div>
        <div className="v-flex w-50 gap-1">
          <div className="text-center">
            <span className="text-primary fw-bold">{newGame.gamesCount}</span>{" "}
            games
          </div>
          <input
            type="range"
            className="form-rang w-100"
            min="1"
            max="42"
            value={newGame.gamesCount}
            onChange={(e) =>
              setNewGame({ ...newGame, gamesCount: parseInt(e.target.value) })
            }
          />
        </div>
      </div>
      <div className="mt-3">
        <label className="d-flex gap-2 align-content-center text-capitalize">
          {getGameTypeIcon()}
          {getGameType(newGame.playerTime)}
        </label>
        <input
          type="range"
          className="form-range"
          min="1"
          max="60"
          value={newGame.playerTime}
          onChange={(e) =>
            setNewGame({
              ...newGame,
              playerTime: parseInt(e.target.value),
              type: getGameType(parseInt(e.target.value)),
            })
          }
        />
        <p>
          <span className="text-primary fw-bold">{newGame.playerTime}</span>{" "}
          minutes
        </p>
        <input
          type="range"
          className="form-range"
          min="0"
          max="60"
          value={newGame.playerIncrement}
          onChange={(e) =>
            setNewGame({
              ...newGame,
              playerIncrement: parseInt(e.target.value),
            })
          }
        />
        <p>
          <span className="text-primary fw-bold">
            + {newGame.playerIncrement}
          </span>{" "}
          seconds
        </p>
      </div>
      <div className="my-4">
        <label className="form-label">Your color</label>
        <div className="btn-group w-100">
          <Button
            onClick={() =>
              setNewGame({
                ...newGame,
                colorAttachMode: EColorAttachMode.white,
              })
            }
            className={`bg-transparent border-0 rounded-0 border-bottom border-2 ${
              newGame.colorAttachMode === "white"
                ? "border-success"
                : "border-transparent"
            }`}
          >
            <FaChessKing className="text-light" size={25} /> White
          </Button>
          <Button
            onClick={() =>
              setNewGame({
                ...newGame,
                colorAttachMode: EColorAttachMode.random,
              })
            }
            className={`bg-transparent border-0 rounded-0 border-bottom border-2 ${
              newGame.colorAttachMode === "random"
                ? "border-success"
                : "border-transparent"
            }`}
          >
            Random
          </Button>
          <Button
            onClick={() =>
              setNewGame({
                ...newGame,
                colorAttachMode: EColorAttachMode.black,
              })
            }
            className={`bg-transparent border-0 rounded-0 border-bottom border-2 ${
              newGame.colorAttachMode === "black"
                ? "border-success"
                : "border-transparent"
            }`}
          >
            <FaChessKing size={25} className="text-secondary" /> Black
          </Button>
        </div>
      </div>
      <div className="d-flex gap-2 mt-3">
        <span className="text-primary fw-bold">{newGame.gamesCount}</span> games
        <div className="vr" style={{ width: "1.5px" }}></div>
        <span className="text-primary fw-bold">
          {Math.round(newGame.gamesCount / 2)}
        </span>
        points to win
      </div>
      <div className="mt-3">
        <div className="btn-group w-100">
          <button
            className={`btn ${
              newGame.isRating ? "btn-success" : "btn-secondary"
            }`}
            onClick={() => setNewGame({ ...newGame, isRating: true })}
          >
            Rating game
          </button>
          <button
            className={`btn ${
              !newGame.isRating ? "btn-success" : "btn-secondary"
            }`}
            onClick={() => setNewGame({ ...newGame, isRating: false })}
          >
            Friendly game
          </button>
        </div>
      </div>
      <Link to={`/game/${1}`}>
        <button className="btn btn-primary w-100 mt-3" onClick={onCreate}>
          START
        </button>
      </Link>
      <Link to={`/game/${1}`}>
        <button
          className="btn btn-link mt-2 text-decoration-none w-100"
          onClick={onCreatePrivate}
        >
          Start private game
        </button>
      </Link>
    </div>
  );
};

export default CreateBattlePanel;
