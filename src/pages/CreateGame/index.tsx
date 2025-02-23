import { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import CreateGamePanel from '../../components/CreateGamePanel';
import CreateBattlePanel from '../../components/CreateBattlePanel';
import { useAppDispatch } from '../../redux';
import { useSelector } from 'react-redux';
import { selectCreateGame } from '../../redux/rooms/selectors';
import { ICreateGame, IGame, setCreateGame, setGame } from '../../redux/rooms/slice';
import { connectToRoom, disconnectRoom } from '../../services/rooms';
import { selectAuthStatus } from '../../redux/auth/selectors';

const CreateGame = () => {
  const [activeTab, setActiveTab] = useState('game');
  const dispatch = useAppDispatch();
  const newGame = useSelector(selectCreateGame);
  const auth = useSelector(selectAuthStatus);

  const setNewGame = (game: ICreateGame) => {
    dispatch(setCreateGame(game));
  };

  const hanldeCreateGame = () => {
    const userId = auth.id || auth.guestId;

    if (userId)
      connectToRoom({
        op: 'create',
        userId,
        newGame,
        onSetGame: (game: IGame) => dispatch(setGame(game)),
      });
  };

  useEffect(() => {
    return () => disconnectRoom();
  }, []);

  const hanldeCreatePrivateGame = () => {
    // connectToRoom({
    //   newGame,
    //   onSetGame: (game: IGame) => {},
    //   // onMessage: (message) => dispatch(addMessage(message)),
    //   // onStatusChange: (status) => dispatch(setConnected(status)),
    //   // onGetColor: (color) => dispatch(setColor(color)),
    //   // onChangeFEN: (fen: string) => {
    //   //   dispatch(setFEN(fen));
    //   // },
    // });
    // return () => {
    //   disconnectRoom();
    // };
  };

  return (
    <div
      className="container mt-5 p-4"
      style={{
        maxWidth: '500px',
        background: '#1a1a1a',
        borderRadius: '10px',
        color: 'var(--text-gray)',
      }}
    >
      <Nav variant="underline" className="bg-transparent w-100">
        <Nav.Item>
          <Nav.Link active={activeTab === 'game'} onClick={() => setActiveTab('game')}>
            Game
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active={activeTab === 'battle'} onClick={() => setActiveTab('battle')}>
            Battle
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {activeTab === 'game' && (
        <CreateGamePanel
          newGame={newGame}
          setNewGame={setNewGame}
          onCreate={hanldeCreateGame}
          onCreatePrivate={hanldeCreatePrivateGame}
        />
      )}
      {activeTab === 'battle' && (
        <CreateBattlePanel
          newGame={newGame}
          setNewGame={setNewGame}
          onCreate={hanldeCreateGame}
          onCreatePrivate={hanldeCreatePrivateGame}
        />
      )}
    </div>
  );
};

export default CreateGame;
