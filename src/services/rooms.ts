import { ICreateGame, IGame } from '../redux/rooms/slice';
import { EGameType } from '../types/enums';

let socket: WebSocket | null = null;

const wsUrl = process.env.REACT_APP_API_URL;

type RoomProps = {
  op: 'connect' | 'create' | 'search';
  type?: EGameType;
  userId: string | number;
  roomId?: string;
  newGame?: ICreateGame;
  onSetGame: (game: IGame) => void;
  onSetMove?: (fen: string) => void;
};

export const connectToRoom = ({ roomId, op, type, userId, newGame, onSetGame, onSetMove }: RoomProps) => {
  let url = '';
  if (op === 'search' && type) url = wsUrl + `rooms/${userId}?op=${op}&game_type=${type}`;
  if (op === 'connect' && roomId) url = wsUrl + `rooms/${userId}?op=${op}&room_id=${roomId}`;

  if (op === 'create' && newGame)
    url =
      wsUrl +
      `rooms/${userId}?op=${op}&game_type=${newGame.type}&is_rating=${newGame.isRating}` +
      `&games_count=${newGame.gamesCount}&player_time=${newGame.playerTime}` +
      `&player_increment=${newGame.playerIncrement}&opponent_time=${newGame.opponentTime}` +
      `&opponent_increment=${newGame.opponentIncrement}&color_attach_mode=${newGame.colorAttachMode}` +
      `&with_armaghedon=${newGame.withArmaghedon}&fen=${newGame.fen}`;

  socket = new WebSocket(url);

  // socket.onopen = () => onStatusChange(true);
  socket.onmessage = (event: MessageEvent) => {
    // console.log('Event', event);
    const response = JSON.parse(event.data);
    console.log('Event', response);
    switch (response.op) {
      case 'created':
        if (response.game) onSetGame(response.game);
        break;

      case 'connected':
        if (response.game) onSetGame(response.game);
        break;

      case 'game':
        onSetGame(response.game);
        break;

      case 'move':
        onSetMove?.(response.fen);
        break;

      case 'message':
        onSetGame(response.game);
        break;
    }
    // if (response.room_id) localStorage.setItem('roomId', response.room_id);
    // if (response.message?.includes('not available')) localStorage.removeItem('roomId');
    // if (response.fen) onChangeFEN(response.fen);
    // if (response.color) onGetColor(response.color);
    // const message: string = event.data;
    // console.log('Received:', message);
    // if (message.includes('FEN')) {
    //   const fen: string = message.split('FEN: ')[1];
    //   console.log('Game started. FEN:', fen);
    //   onChangeFEN(fen);
    // } else if (message.startsWith('You joined as')) {
    //   const color: string = message.split('You joined as ')[1];
    //   onGetColor(color === 'WHITE' ? 'white' : 'black');
    //   console.log('Player color:', color);
    // }
  };
  // socket.onclose = () => onStatusChange(false);
};

export const sendMove = (uci: string, room_id: string) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    console.log(uci, room_id);

    socket.send(JSON.stringify({ move: uci, room_id }));
  }
};

export const disconnectRoom = () => {
  if (socket) {
    socket.close();
    socket = null;
  }
};
