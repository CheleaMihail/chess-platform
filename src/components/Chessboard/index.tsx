// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';

interface ChessBoardProps {
  onMakeMove: (fen: string) => void; // Callback function for sending FEN to the server
  fen: string; // Initial or updated FEN to set the board state
  boardOrientation: string;
}

const ChessBoard: React.FC<ChessBoardProps> = ({ onMakeMove, fen, boardOrientation }) => {
  const [game, setGame] = useState(new Chess());
  const [moveFrom, setMoveFrom] = useState<string | null>(null);
  const [optionSquares, setOptionSquares] = useState<Record<string, React.CSSProperties>>({});

  useEffect(() => {
    setGame(new Chess(fen));
    setMoveFrom(null);
    setOptionSquares({});
  }, [fen]);

  // Reset the game to a new instance
  const resetGame = () => {
    setGame(new Chess());
    setMoveFrom(null);
    setOptionSquares({});
  };

  // Get possible moves for a piece at a given square
  const getMoveOptions = (square: string) => {
    const moves = game.moves({ square, verbose: true });
    if (moves.length === 0) {
      setOptionSquares({});
      return false;
    }
    const newSquares: Record<string, React.CSSProperties> = {};
    moves.forEach((move) => {
      newSquares[move.to] = {
        background: 'radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)',
        borderRadius: '50%',
      };
    });
    newSquares[square] = {
      background: 'rgba(255, 255, 0, 0.4)', // Highlight the piece being moved
    };
    setOptionSquares(newSquares);
    return true;
  };

  // Handle square click
  const onSquareClick = (square: string) => {
    if (!moveFrom) {
      const hasMoveOptions = getMoveOptions(square);
      if (hasMoveOptions) {
        setMoveFrom(square);
      }
      return;
    }

    const moves = game.moves({ square: moveFrom, verbose: true });
    const validMove = moves.find((move) => move.to === square);
    if (validMove) {
      const gameCopy = new Chess(game.fen());
      gameCopy.move(validMove);
      setGame(gameCopy);

      // Send updated FEN to parent component (and to server)
      onMakeMove(moveFrom + validMove.san.slice(-2));

      setMoveFrom(null);
      setOptionSquares({});
    } else {
      setMoveFrom(null);
      setOptionSquares({});
    }
  };

  return (
    <div className="flex-vertical justify-content-center align-items-center vh-100">
      <Chessboard
        boardOrientation={boardOrientation}
        boardWidth={600}
        id="Chessboard"
        position={game.fen()}
        arePiecesDraggable={false}
        onSquareClick={onSquareClick}
        customSquareStyles={optionSquares}
      />
      <button onClick={resetGame}>Reset</button>
    </div>
  );
};

export default ChessBoard;
