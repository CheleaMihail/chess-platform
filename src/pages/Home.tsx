import { useEffect, useState } from 'react';
import { useAppDispatch } from '../redux';
import { useSelector } from 'react-redux';
import { connectToRoom, disconnectRoom, sendMove } from '../services/rooms';
import { Button, Col, Nav, Row } from 'react-bootstrap';
import { selectAuthStatus } from '../redux/auth/selectors';
import { FaDove, FaRocket } from 'react-icons/fa6';
import { GiJetFighter } from 'react-icons/gi';
import { EFetchStatus, EGameType } from '../types/enums';
import { IGame, setGame } from '../redux/rooms/slice';

const Home = () => {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState('quick');
  // const { messages, isConnected, color, fen } = useSelector(selectRooms);
  const auth = useSelector(selectAuthStatus);

  const handleMakeMove = async (fen: string) => {
    const roomId = localStorage.getItem('roomId');
    if (roomId) sendMove(fen, roomId);
  };

  const handleSendMessage = () => {};

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
                <span style={{ color: 'var(--text-gray)' }}>Bullet</span>
              </div>
            </Button>
          </Col>
          <Col className="md-3">
            <Button className="bg-dark text-light w-100">
              <h2>3+2s</h2>
              <div className="d-flex gap-3 justify-content-center">
                <GiJetFighter size={20} className="text-success" />
                <span style={{ color: 'var(--text-gray)' }}>Blitz</span>
              </div>
            </Button>
          </Col>
          <Col className="md-3">
            <Button className="bg-dark text-light w-100">
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
      <div>
        <Button
          variant={'outline-secondary'}
          onClick={() => {
            if (auth.id)
              connectToRoom({
                op: 'connect',
                type: EGameType.classic,
                userId: auth.id,
                onSetGame: (game: IGame) => dispatch(setGame(game)),
              });
          }}
        >
          Connect
        </Button>
        {/* <h1 className="text-white">Room ID: {roomId}</h1>
        <ul className="d-flex gap-3">
          {rooms.map((room, index) => (
            <Button
              key={index}
              variant={roomId !== room ? 'outline-secondary' : 'info'}
              onClick={() => setRoomId(room)}
            >
              {room}
            </Button>
          ))}
        </ul> */}

        {/* <p className="text-white">{isConnected ? 'Connected to WebSocket' : 'Connecting to WebSocket...'}</p>

        <Button onClick={handleSendMessage} disabled={!isConnected}>
          Send Message
        </Button> */}

        {/* <div>
          <h2 className="text-white">Messages:</h2>
          <ul>
            {messages.map((message, index) => (
              <li key={index} className="text-white">
                {message}
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    </main>
  );
};

export default Home;
