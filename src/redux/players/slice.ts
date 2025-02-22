import { createSlice } from '@reduxjs/toolkit';
import { fetchSearchPlayers } from './asyncActions';
import { EFetchStatus } from '../../types/enums';
import { IPlayersState } from './types';

const initialState: IPlayersState = {
  searchedPlayers: [],
  status: EFetchStatus.PENDING,
  error: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //REGISTER
    builder.addCase(fetchSearchPlayers.pending, (state) => {
      state.status = EFetchStatus.PENDING;
    });
    builder.addCase(fetchSearchPlayers.fulfilled, (state, action) => {
      state.status = EFetchStatus.SUCCESS;
      state.searchedPlayers = action.payload;
      state.error = undefined;
    });
    builder.addCase(fetchSearchPlayers.rejected, (state, action) => {
      state.status = EFetchStatus.ERROR;
      state.error = action.payload;
    });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
