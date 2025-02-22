let socket: WebSocket | null = null;

const wsUrl = process.env.REACT_APP_API_URL;

type RoomProps = {
  roomId: string;
  user_id?: number;
  onMessage: (message: string) => void;
  onStatusChange: (status: boolean) => void;
  onGetColor: (color: 'white' | 'black') => void;
  onChangeFEN: (fen: string) => void;
};

export const connectToRoom = ({ roomId, onMessage, onStatusChange, onGetColor, user_id, onChangeFEN }: RoomProps) => {
  if (socket) {
    socket.close();
  }

  socket = new WebSocket(wsUrl + `rooms/${roomId}/${user_id ? user_id : ''}`);

  socket.onopen = () => onStatusChange(true);
  socket.onmessage = (event: MessageEvent) => {
    const message: string = event.data;
    console.log('Received:', message);

    if (message.includes('FEN')) {
      const fen: string = message.split('FEN: ')[1];
      console.log('Game started. FEN:', fen);
      onChangeFEN(fen);
    } else if (message.startsWith('You joined as')) {
      const color: string = message.split('You joined as ')[1];
      onGetColor(color === 'WHITE' ? 'white' : 'black');
      console.log('Player color:', color);
    }
  };
  socket.onclose = () => onStatusChange(false);
};

export const sendMove = (move: string) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(move);
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
