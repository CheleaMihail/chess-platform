import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WebSocketState {
  messages: string[];
  isConnected: boolean;
  color: 'white' | 'black';
  fen: string;
}

const initialState: WebSocketState = {
  messages: [],
  isConnected: false,
  color: 'white',
  fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
};

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setConnected(state, action: PayloadAction<boolean>) {
      state.isConnected = action.payload;
    },
    addMessage(state, action: PayloadAction<string>) {
      state.messages.push(action.payload);
    },
    setMessages(state, action: PayloadAction<string[]>) {
      state.messages = action.payload;
    },
    setColor(state, action: PayloadAction<'white' | 'black'>) {
      state.color = action.payload;
    },
    setFEN(state, action: PayloadAction<string>) {
      state.fen = action.payload;
    },
  },
});

export const { setConnected, addMessage, setMessages, setColor, setFEN } = roomsSlice.actions;
export default roomsSlice.reducer;
