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

export type TMove = {
  move: string;
  color: string;
  time: number;
};

export interface IActiveBoard {
  fen: string;
  playerColor: EPlayerColor;
  moves: TMove[];
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
    playerTime: 15,
    playerIncrement: 5,
    opponentTime: 15,
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
    setGame(state, action: PayloadAction<IGame | undefined>) {
      state.game = action.payload;
    },
    setMove(state, action: PayloadAction<{ fen: string; moves: TMove[] }>) {
      if (state.game)
        state.game.activeBoard = { ...state.game.activeBoard, fen: action.payload.fen, moves: action.payload.moves };
    },
    setGameFen(state, action: PayloadAction<string>) {
      if (state.game) state.game.activeBoard.fen = action.payload;
    },
  },
});

export const { setCreateGame, setGame, setMove, setGameFen } = roomsSlice.actions;
export default roomsSlice.reducer;
