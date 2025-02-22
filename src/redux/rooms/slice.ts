import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WebSocketState {
  messages: string[];
  isConnected: boolean;
}

const initialState: WebSocketState = {
  messages: [],
  isConnected: false,
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
  },
});

export const { setConnected, addMessage, setMessages } = roomsSlice.actions;
export default roomsSlice.reducer;
