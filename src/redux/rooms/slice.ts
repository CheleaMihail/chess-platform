import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EColorAttachMode, EConnectStatus, EGameType, EPlayerColor } from '../../types/enums';

export interface ICreateGame {
  type: EGameType;
  isRating: boolean;
  gamesCount: number;
  playerTime: number;
  playerIncrement: number;
  opponentTime?: number;
  opponentIncrement?: number;
  colorAttachMode: EColorAttachMode;
  withArmaghedon: boolean;
  fen?: string;
}

export interface IActiveBoard {
  fen: string;
  playerColor: EPlayerColor;
  moves: [];
}

export interface IGame {
  roomId: string;

  connectStatus: EConnectStatus;
  battleId: string;
  gameId: string;

  type: EGameType;
  isRating: boolean;
  gamesCount: number;
  playerTime: number;
  playerIncrement: number;
  opponentTime: number;
  opponentIncrement: number;
  withArmaghedon: boolean;

  messages: [];
  opponentId: string | number;

  activeBoard: IActiveBoard;
}

interface WebSocketState {
  createGame: ICreateGame;
  game?: IGame;
}

const initialState: WebSocketState = {
  createGame: {
    type: EGameType.blitz,
    isRating: false,
    gamesCount: 1,
    playerTime: 180,
    playerIncrement: 5,
    opponentTime: 180,
    opponentIncrement: 5,
    colorAttachMode: EColorAttachMode.random,
    withArmaghedon: false,
    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  },

  game: undefined,
};

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setCreateGame(state, action: PayloadAction<ICreateGame>) {
      state.createGame = action.payload;
    },
    setGame(state, action: PayloadAction<IGame>) {
      state.game = action.payload;
    },
    // setGameStatus(state, action: PayloadAction<EConnectStatus>) {
    //   IF
    //   state.game?.connectStatus = action.payload;
    // },
  },
});

export const { setCreateGame, setGame } = roomsSlice.actions;
export default roomsSlice.reducer;
