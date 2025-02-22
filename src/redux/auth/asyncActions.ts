import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ILoginResponse, IRefreshResponse } from './types';
import { IError } from '../../types/interfaces';

const apiUrl = process.env.REACT_APP_API_URL;

export const fetchAuthLogin = createAsyncThunk<number, Record<string, string>, { rejectValue: IError }>(
  'auth/fetchAuthLogin',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post<ILoginResponse>(apiUrl + 'auth/login/', params);
      localStorage.setItem('accessToken', response.data.access_token);
      localStorage.setItem('refreshToken', response.data.refresh_token);
      return response.data.id;
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

export const fetchAuthRegister = createAsyncThunk<{}, Record<string, string>, { rejectValue: IError }>(
  'auth/fetchAuthRegister',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post<ILoginResponse>(apiUrl + 'users/', params);

      localStorage.setItem('accessToken', response.data.access_token);
      localStorage.setItem('refreshToken', response.data.refresh_token);
      return response.data.id;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue({
        message: error.response.data.detail || '',
        errors: error.response.data,
      } as IError);
    }
  }
);

export const fetchAuthRefresh = createAsyncThunk<number, {}, { rejectValue: IError }>(
  'auth/fetchAuthRefresh',
  async (params, { rejectWithValue }) => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await axios.post<IRefreshResponse>(apiUrl + 'api/token/refresh/', {
        refresh: refreshToken,
      });

      localStorage.setItem('accessToken', response.data.access_token);
      return response.data.id;
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
