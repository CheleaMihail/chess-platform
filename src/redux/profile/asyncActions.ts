import { createAsyncThunk } from '@reduxjs/toolkit';
import { IError, IUser } from '../../types/interfaces';
import $api from '../../http';

export const fetchCurrentUser = createAsyncThunk<IUser, undefined, { rejectValue: IError }>(
  'profile/fetchCurrentUser',
  async (undefined, { rejectWithValue }) => {
    try {
      const response = await $api.get<IUser>('users/current/');

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
