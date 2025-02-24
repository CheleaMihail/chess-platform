import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoDotFill } from 'react-icons/go';
import { useAppDispatch } from '../../redux';
import { useSelector } from 'react-redux';
import { selectAuthStatus } from '../../redux/auth/selectors';
import { connectToRoom, disconnectRoom, sendMove } from '../../services/rooms';
import ChessBoard from '../../components/Chessboard';
import { Col, Row, Stack } from 'react-bootstrap';
import { FaLandmark } from 'react-icons/fa6';
import { selectGame } from '../../redux/rooms/selectors';
import { IGame, setGame, setGameFen, setMove, TMove } from '../../redux/rooms/slice';

const ChessGameScreen = () => {
  const dispatch = useAppDispatch();
  const game = useSelector(selectGame);
  const auth = useSelector(selectAuthStatus);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const handleConnect = () => {
      if (game?.roomId && auth.id)
        connectToRoom({
          op: "connect",
          userId: auth.id,
          roomId: game.roomId,
          onSetGame: (game: IGame) => dispatch(setGame(game)),
          onSetMove: (fen: string, moves: TMove[]) => dispatch(setMove({ fen, moves })),
        });
    };

    handleConnect();

    return () => disconnectRoom();
  }, []);

  useEffect(() => {
    setIsRunning(true);
  }, [game]);

  const handleSetFen = async (fen: string) => {
    dispatch(setGameFen(fen));
  };

  const handleMakeMove = async (uci: string) => {
    if (game?.roomId) sendMove(uci, game.roomId);
  };

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]); // Rulează doar când `isRunning` se schimbă

  const getTme = (t: number) => {
    const m = Math.floor((t - seconds) / 60);
    const s = (t - seconds) % 60;
    return m + ':' + (s > 9 ? s : '0' + s);
  };

  if (!game) return <></>;

  return (
    <div className="container-fluid text-white border-3 border-success">
      <Row className="md-9">
        <Col className="md-6 p-3">
          <div className="d-flex justify-content-between">
            <div style={{ lineHeight: '42px' }}>oponent id • {game.opponentId}</div>
            <div className="fs-3">{getTme(game.opponentTime * 60 - seconds)}</div>
          </div>
          <ChessBoard
            boardOrientation={game.activeBoard.playerColor}
            onMakeMove={handleMakeMove}
            fen={game.activeBoard.fen}
            setFen={handleSetFen}
          />
          <div className="d-flex justify-content-between">
            <div style={{ lineHeight: '42px' }}>me • {auth.id || auth.guestId}</div>
            <div className="fs-3">{getTme(game.playerTime * 60 - seconds)}</div>
          </div>
        </Col>
        <Col className="md-3 p-3 v-flex gap-3">
          <div className="bg-dark p-3">
            <div className="d-flex justify-content-between align-content-center">
              <div className="d-flex gap-2 h-100 align-content-center">
                <FaLandmark size={20} />
                <span className="text-primary fw-bold text-capitalize">{game.type}</span>
                <div className="vr" style={{ width: '1.5px' }}></div>
                <span className="text-primary fw-bold">{game.isRating ? 'Rating' : 'Friendly'}</span>
              </div>
              <div className="h-100">
                {game.playerTime}+{game.playerIncrement}
              </div>
            </div>
            <div className="text-center">Game in progress</div>
          </div>
          <h6 className="mt-3">Moves History</h6>
          <div className="bg-dark">
            <ul className="list-unstyled px-2" style={{ fontSize: '12px' }}>
              {game?.activeBoard?.moves?.map((i, index) => {
                if (index % 2 == 0)
                  return (
                    <li className="bg-transparent text-white my-1 d-flex justify-content-between align-content-center border-1 border-bottom">
                      <div className="v-flex align-content-center">{index % 2 === 0 && (index + 2) / 2}</div>
                      <div className="v-flex align-content-center">{game.activeBoard.moves[index].move}</div>
                      <div className="v-flex align-content-center">{game.activeBoard.moves[index + 1]?.move || ''}</div>
                      <div className="v-flex">
                        <div className="d-flex gap-2 justify-content-center align-content-center">
                          <div>
                            <GoDotFill size={10} className="text-light" />
                          </div>{' '}
                          0.97s
                        </div>
                        <div className="d-flex gap-2 justify-content-center align-content-center">
                          <div>
                            <GoDotFill size={10} style={{ color: 'black' }} />
                          </div>
                          0.91s
                        </div>
                      </div>
                    </li>
                  );
              })}
            </ul>
          </div>
        </Col>
      </Row>
      <div>
        <button className="btn btn-primary">New Game</button>
        <button className="btn btn-primary">Cancel Game</button>
      </div>
    </div>
  );
};

export default ChessGameScreen;
