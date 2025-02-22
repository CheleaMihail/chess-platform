import { useEffect, useState } from 'react';
import ChessBoard from '../components/Chessboard';
import { useAppDispatch } from '../redux';
import { useSelector } from 'react-redux';
import { selectRooms } from '../redux/rooms/selectors';
import { connectToRoom, disconnectRoom, sendMove } from '../services/rooms';
import { addMessage, setColor, setConnected, setFEN, setMessages } from '../redux/rooms/slice';
import { Button } from 'react-bootstrap';
import { selectAuthStatus } from '../redux/auth/selectors';

const Home = () => {
  const dispatch = useAppDispatch();
  const { messages, isConnected, color, fen } = useSelector(selectRooms);
  const [rooms, setRooms] = useState(['room1', 'room2']);
  const [roomId, setRoomId] = useState(rooms[0]);
  const auth = useSelector(selectAuthStatus);

  const handleMakeMove = async (fen: string) => {
    sendMove(fen);
  };

  useEffect(() => {
    if (auth.id) {
      connectToRoom({
        roomId,
        user_id: auth.id,
        onMessage: (message) => dispatch(addMessage(message)),
        onStatusChange: (status) => dispatch(setConnected(status)),
        onGetColor: (color) => dispatch(setColor(color)),
        onChangeFEN: (fen: string) => dispatch(setFEN(fen)),
      });

      return () => {
        disconnectRoom();
      };
    }
  }, [roomId, dispatch, auth.id]);

  const handleSendMessage = () => {};

  return (
    <main className="container-fluid h-100 bg-transparent">
      <h1 className="text-center my-4 text-white">Chess Game</h1>
      <div>
        <h1 className="text-white">Room ID: {roomId}</h1>
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
        </ul>

        <p className="text-white">{isConnected ? 'Connected to WebSocket' : 'Connecting to WebSocket...'}</p>

        <Button onClick={handleSendMessage} disabled={!isConnected}>
          Send Message
        </Button>

        <div>
          <h2 className="text-white">Messages:</h2>
          <ul>
            {messages.map((message, index) => (
              <li key={index} className="text-white">
                {message}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ChessBoard boardOrientation={color || 'white'} onMakeMove={handleMakeMove} fen={fen} />
    </main>
  );
};

export default Home;
