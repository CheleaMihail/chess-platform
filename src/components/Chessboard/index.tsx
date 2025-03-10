import React, { useEffect, useState } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';

interface ChessBoardProps {
  onMakeMove: (uci: string) => void;
  setFen: (fen: string) => void;
  fen: string;
  boardOrientation: string;
}

const ChessBoard: React.FC<ChessBoardProps> = ({ onMakeMove, fen, boardOrientation, setFen }) => {
  const [game, setGame] = useState(new Chess(fen));
  const [moveFrom, setMoveFrom] = useState<string | null>(null);
  const [optionSquares, setOptionSquares] = useState<Record<string, React.CSSProperties>>({});
  const [result, setResult] = useState<string>('');

  useEffect(() => {
    const newGame = new Chess(fen);
    setGame(newGame);
    setMoveFrom(null);
    updateBoardHighlights(newGame);
  }, [fen]);

  const findKingInCheck = (chessInstance: any) => {
    const board = chessInstance.board();
    const kingColor = chessInstance.turn();
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece && piece.type === 'k' && piece.color === kingColor) {
          return `${'abcdefgh'[col]}${8 - row}`;
        }
      }
    }
    return null;
  };

  const getGameResult = (chessInstance: any): string => {
    if (chessInstance.isCheckmate()) {
      const losingColor = chessInstance.turn();
      const winningColor = losingColor === 'w' ? 'Black' : 'White';
      return `Checkmate! ${winningColor} wins.`;
    } else if (chessInstance.isStalemate()) {
      return "Stalemate! It's a draw.";
    } else if (chessInstance.isInsufficientMaterial()) {
      return 'Draw due to insufficient material.';
    } else if (chessInstance.isThreefoldRepetition()) {
      return 'Draw by threefold repetition.';
    } else if (chessInstance.isGameOver()) {
      return 'Game over.';
    }
    return '';
  };

  const updateBoardHighlights = (chessInstance: any) => {
    const newSquares: Record<string, React.CSSProperties> = {};

    if (chessInstance.isCheck() || chessInstance.isCheckmate()) {
      const kingSquare = findKingInCheck(chessInstance);
      if (kingSquare) {
        newSquares[kingSquare] = {
          background: 'rgba(255, 0, 0, 0.6)',
        };
      }
    }
    setOptionSquares(newSquares);
    const gameResult = getGameResult(chessInstance);
    setResult(gameResult);
  };

  const getMoveOptions = (square: string) => {
    // @ts-ignore
    const moves = game.moves({ square, verbose: true });
    if (moves.length === 0) {
      setOptionSquares({});
      return false;
    }
    const newSquares: Record<string, React.CSSProperties> = {};
    moves.forEach((move: any) => {
      newSquares[move.to] = {
        background: 'radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)',
        borderRadius: '50%',
      };
    });
    newSquares[square] = {
      background: 'rgba(255, 255, 0, 0.4)',
    };
    setOptionSquares(newSquares);
    return true;
  };

  const onSquareClick = (square: string) => {
    if (!moveFrom) {
      const hasMoveOptions = getMoveOptions(square);
      if (hasMoveOptions) {
        setMoveFrom(square);
      }
      return;
    }
    // @ts-ignore
    const moves = game.moves({ square: moveFrom, verbose: true });
    const validMove = moves.find((move: any) => move.to === square);
    if (validMove) {
      const gameCopy = new Chess(game.fen());
      gameCopy.move(validMove);
      setGame(gameCopy);
      updateBoardHighlights(gameCopy);

      // Send updated move to parent (FEN or move string)
      setFen(gameCopy.fen());
      // @ts-ignore
      const uciMove = validMove.from + validMove.to + (validMove.promotion ? validMove.promotion : '');
      onMakeMove(uciMove);
      setMoveFrom(null);
    } else {
      setMoveFrom(null);
      setOptionSquares({});
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="d-flex justify-content-center">
        <Chessboard
          // @ts-ignore
          boardOrientation={boardOrientation}
          boardWidth={600}
          id="Chessboard"
          position={game.fen()}
          arePiecesDraggable={false}
          onSquareClick={onSquareClick}
          customSquareStyles={optionSquares}
        />
      </div>
      {result && (
        <div className="mt-3 text-center">
          <h3>{result}</h3>
        </div>
      )}
    </div>
  );
};

export default ChessBoard;
