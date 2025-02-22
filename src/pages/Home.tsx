import { useEffect, useState } from 'react';
import ChessBoard from '../components/Chessboard';
import { useAppDispatch } from '../redux';
import { useSelector } from 'react-redux';
import { selectRooms } from '../redux/rooms/selectors';
import { connectToRoom, disconnectRoom, sendMessage } from '../services/rooms';
import { addMessage, setConnected, setMessages } from '../redux/rooms/slice';
import { Button } from 'react-bootstrap';

const Home = () => {
  const dispatch = useAppDispatch();
  const { messages, isConnected } = useSelector(selectRooms);
  const [rooms, setRooms] = useState(['room1', 'room2']);
  const [roomId, setRoomId] = useState(rooms[0]);

  useEffect(() => {
    connectToRoom(
      roomId,
      (message) => dispatch(addMessage(message)),
      // (messages) => dispatch(setMessages(messages)),
      (status) => dispatch(setConnected(status))
    );

    return () => {
      disconnectRoom();
    };
  }, [roomId, dispatch]);

  const handleSendMessage = () => {
    sendMessage('Hello World');
  };

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
      <ChessBoard />
    </main>
  );
};

export default Home;
