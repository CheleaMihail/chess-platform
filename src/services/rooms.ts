import { ICreateGame, IGame, TMove } from '../redux/rooms/slice';
import { EGameType } from '../types/enums';

let socket: WebSocket | null = null;

const wsUrl = process.env.REACT_APP_API_URL;

type RoomProps = {
  op: 'connect' | 'create' | 'search' | 'remove';
  type?: EGameType;
  userId: string | number;
  roomId?: string;
  newGame?: ICreateGame;
  onSetGame: (game: IGame) => void;
  onSetMove?: (fen: string, moves: TMove[]) => void;
};

export const connectToRoom = ({ roomId, op, type, userId, newGame, onSetGame, onSetMove }: RoomProps) => {
  let url = '';
  switch (op) {
    case 'search':
      if (type) url = wsUrl + `rooms/${userId}?op=${op}&game_type=${type}`;
      break;
    case 'connect':
      if (roomId) url = wsUrl + `rooms/${userId}?op=${op}&room_id=${roomId}`;
      break;
    case 'remove':
      if (roomId) url = wsUrl + `rooms/${userId}?op=${op}&room_id=${roomId}`;
      break;
    case 'create':
      if (newGame)
        url =
          wsUrl +
          `rooms/${userId}?op=${op}&game_type=${newGame.type}&is_rating=${newGame.isRating}` +
          `&games_count=${newGame.gamesCount}&player_time=${newGame.playerTime}` +
          `&player_increment=${newGame.playerIncrement}&opponent_time=${newGame.opponentTime}` +
          `&opponent_increment=${newGame.opponentIncrement}&color_attach_mode=${newGame.colorAttachMode}` +
          `&with_armaghedon=${newGame.withArmaghedon}&fen=${newGame.fen}`;
  }

  socket = new WebSocket(url);

  // socket.onopen = () => onStatusChange(true);
  socket.onmessage = (event: MessageEvent) => {
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
        onSetMove?.(response.fen, response.moves);
        break;

      case 'message':
        onSetGame(response.game);
        break;
    }
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
