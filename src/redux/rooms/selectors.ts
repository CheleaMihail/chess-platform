import { RootState } from '..';

export const selectCreateGame = (state: RootState) => state.rooms.createGame;
export const selectGame = (state: RootState) => state.rooms.game;
