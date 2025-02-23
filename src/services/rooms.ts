let socket: WebSocket | null = null;

const wsUrl = process.env.REACT_APP_API_URL;

type RoomProps = {
  roomId?: string;
  user_id?: string;
  // room_type?: string;
  onChangeFEN: (fen: string) => void;
  onMessage: (message: string) => void;
  onStatusChange: (status: boolean) => void;
  onGetColor: (color: 'white' | 'black') => void;
};

export const connectToRoom = ({ roomId, onMessage, onStatusChange, onGetColor, user_id, onChangeFEN }: RoomProps) => {
  console.log('User Id ' + user_id + ' room_id ' + roomId);
  if (socket) {
    socket.close();
  }

  const game_type = 'rapid';
  const color_type = 'white';

  socket = new WebSocket(
    wsUrl +
      `rooms/${user_id}?room_id=${roomId ? roomId : ''}${game_type ? '&game_type=' + game_type : ''}${
        color_type ? '&color_type=' + color_type : ''
      }`
  );

  socket.onopen = () => onStatusChange(true);
  socket.onmessage = (event: MessageEvent) => {
    console.log('Event', event);

    const response = JSON.parse(event.data);

    if (response.room_id) localStorage.setItem('roomId', response.room_id);
    if (response.message?.includes('not available')) localStorage.removeItem('roomId');
    if (response.fen) onChangeFEN(response.fen);
    if (response.color) onGetColor(response.color);

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
  socket.onclose = () => onStatusChange(false);
};

export const sendMove = (move: string, room_id: string) => {
  console.log('Room_id ' + room_id);

  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ move, room_id }));
  }
};

export const disconnectRoom = () => {
  if (socket) {
    socket.close();
    socket = null;
  }
};

/*


let socket: WebSocket | null = null;

export const connectToRoom = (
  roomId: string,
  onMessage: (message: string) => void,
  onLoadMessages: (messages: string[]) => void,
  onStatusChange: (status: boolean) => void
) => {
  if (socket) {
    socket.close();
  }

  socket = new WebSocket(`ws://localhost:8000/rooms/${roomId}`);

  socket.onopen = () => onStatusChange(true);

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'message') {
      onMessage(data.content);
    } else if (data.type === 'message_history') {
      onLoadMessages(data.messages);
    }
  };

  socket.onclose = () => onStatusChange(false);
};

export const sendMessage = (message: string) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(message);
  }
};

export const disconnectRoom = () => {
  if (socket) {
    socket.close();
    socket = null;
  }
};

*/
