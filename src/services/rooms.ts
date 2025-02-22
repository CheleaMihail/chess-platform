let socket: WebSocket | null = null;

export const connectToRoom = (
  roomId: string,
  onMessage: (message: string) => void,
  onStatusChange: (status: boolean) => void
) => {
  if (socket) {
    socket.close();
  }

  socket = new WebSocket(`ws://localhost:8000/rooms/${roomId}`);

  socket.onopen = () => onStatusChange(true);
  socket.onmessage = (event) => onMessage(event.data);
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
