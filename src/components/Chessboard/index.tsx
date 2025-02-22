// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Chess, Move } from "chess.js"; // Import Move type
import { Chessboard } from "react-chessboard";

const ChessBoard: React.FC = () => {
  const [game, setGame] = useState(new Chess()); // Initialize the game
  const [position, setPosition] = useState(game.fen()); // Store the current position
  const [validMoves, setValidMoves] = useState<string[]>([]);

  useEffect(() => {
    // Whenever the game state changes, update the position
    setPosition(game.fen());
    console.log(game.fen());
  }, [game]);

  // Function to check and apply the move
  const handleMove = (sourceSquare: string, targetSquare: string) => {
    const newGame = new Chess(game.fen());

    // Check if the move is valid for the current player
    const move = newGame.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    if (move) {
      // If the move is valid, update the game and reset the valid moves
      setGame(newGame);
      setValidMoves([]);
      return true;
    } else {
      // If the move is invalid, show an alert and return false
      alert("Invalid move!");
      return false;
    }
  };

  // Function to get valid moves
  const getValidMoves = (square: string) => {
    const moves = game.moves({
      square: square as any,
      verbose: true,
    }) as Move[];
    setValidMoves(moves.map((move) => move.to)); // Save only the destination squares
  };

  const boardOptions = {
    customSquareStyles: validMoves.reduce((acc: any, square) => {
      acc[square] = { background: "rgba(255, 255, 0, 0.5)" }; // Highlight valid moves in yellow
      return acc;
    }, {}),
    draggable: (square: string) => {
      // Disable dragging for pieces not belonging to the current player
      const piece = game.get(square);
      return piece && piece.color === game.turn(); // Only allow the current player's pieces to be draggable
    },
  };

  // Reset the game
  const resetGame = () => {
    const newGame = new Chess();
    setGame(newGame);
    setValidMoves([]);
  };

  return (
    <div className="flex-vertical justify-content-center align-items-center vh-100">
      <Chessboard
        position={position}
        onPieceDrop={handleMove} // Handle piece drop
        onSquareClick={getValidMoves} // Show valid moves for a square
        {...boardOptions}
        boardWidth={600}
      />
      <button className="btn btn-danger mt-3" onClick={resetGame}>
        Reset
      </button>
    </div>
  );
};

export default ChessBoard;
