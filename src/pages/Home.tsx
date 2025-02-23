import { useEffect, useState } from 'react';
import { useAppDispatch } from '../redux';
import { useSelector } from 'react-redux';
import { connectToRoom, disconnectRoom } from '../services/rooms';
import { Button, Col, Nav, Row } from 'react-bootstrap';
import { selectAuthStatus } from '../redux/auth/selectors';
import { FaDove, FaRocket } from 'react-icons/fa6';
import { GiJetFighter } from 'react-icons/gi';
import { EFetchStatus, EGameType } from '../types/enums';
import { IGame, setGame, setMove } from '../redux/rooms/slice';
import { selectGame } from '../redux/rooms/selectors';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState('quick');
  // const { messages, isConnected, color, fen } = useSelector(selectRooms);
  const auth = useSelector(selectAuthStatus);
  const game = useSelector(selectGame);
  const navigate = useNavigate();

  const handleQuickConnect = (type: EGameType) => {
    if (auth.id)
      connectToRoom({
        op: 'search',
        type,
        userId: auth.id,
        onSetGame: (game: IGame) => dispatch(setGame(game)),
      });
  };

  useEffect(() => {
    dispatch(setGame(undefined));
  }, []);

  useEffect(() => {
    if (game?.opponentId) {
      navigate('/game/' + game.roomId);
    }

    return () => disconnectRoom();
  }, [game]);

  return (
    <main className="container-fluid h-100 bg-transparent">
      <h1 className="text-center my-4 text-white">Chess Game</h1>
      {/* Navigation Tabs */}
      <Nav variant="underline" className="bg-transparent w-100">
        <Nav.Item>
          <Nav.Link active={activeTab === 'quick'} onClick={() => setActiveTab('quick')}>
            Quick start
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active={activeTab === 'lobby'} onClick={() => setActiveTab('lobby')}>
            Lobby
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {activeTab === 'quick' && (
        <Row className="md-9 mt-3">
          <Col className="md-3">
            <Button className="bg-dark text-light w-100">
              <h2>1 min</h2>
              <div className="d-flex gap-3 justify-content-center">
                <FaRocket size={20} className="text-success" />
                <span style={{ color: 'var(--text-gray)' }} onClick={() => handleQuickConnect(EGameType.ultra)}>
                  Bullet
                </span>
              </div>
            </Button>
          </Col>
          <Col className="md-3">
            <Button className="bg-dark text-light w-100" onClick={() => handleQuickConnect(EGameType.blitz)}>
              <h2>3+2s</h2>
              <div className="d-flex gap-3 justify-content-center">
                <GiJetFighter size={20} className="text-success" />
                <span style={{ color: 'var(--text-gray)' }}>Blitz</span>
              </div>
            </Button>
          </Col>
          <Col className="md-3">
            <Button className="bg-dark text-light w-100" onClick={() => handleQuickConnect(EGameType.rapid)}>
              <h2>10 min</h2>
              <div className="d-flex gap-3 justify-content-center">
                <FaDove size={20} className="text-success" />
                <span style={{ color: 'var(--text-gray)' }}>Rapid</span>
              </div>
            </Button>
          </Col>
        </Row>
      )}
      {activeTab === 'lobby' && <Row>Lobby</Row>}
    </main>
  );
};

export default Home;
