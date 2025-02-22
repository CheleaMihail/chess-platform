import { createAsyncThunk } from '@reduxjs/toolkit';
import { IError, IUser } from '../../types/interfaces';
import $api from '../../http';

export const fetchSearchPlayers = createAsyncThunk<IUser[], string, { rejectValue: IError }>(
  'players/fetchSearchPlayers',
  async (username, { rejectWithValue }) => {
    try {
      const response = await $api.get<IUser[]>('users/search/' + username);

      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue({
        message: error.response.data.detail,
      } as IError);
    }
  }
);
