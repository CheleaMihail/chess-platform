import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAuthLogin, fetchAuthRefresh, fetchAuthRegister } from './asyncActions';
import { IAuthState } from './types';
import { EFetchStatus } from '../../types/enums';

const initialState: IAuthState = {
  id: undefined,
  guestId: undefined,
  status: EFetchStatus.PENDING,
  error: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      state.error = undefined;
      state.id = undefined;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
    setGuestId: (state, action: PayloadAction<string>) => {
      state.guestId = action.payload;
    },
  },
  extraReducers: (builder) => {
    //REGISTER
    builder.addCase(fetchAuthRegister.pending, (state) => {
      state.status = EFetchStatus.PENDING;
    });
    builder.addCase(fetchAuthRegister.fulfilled, (state, action) => {
      state.status = EFetchStatus.SUCCESS;
      state.error = undefined;
    });
    builder.addCase(fetchAuthRegister.rejected, (state, action) => {
      state.status = EFetchStatus.ERROR;
      state.error = action.payload;
    });
    //LOGIN
    builder.addCase(fetchAuthLogin.pending, (state) => {
      state.status = EFetchStatus.PENDING;
    });
    builder.addCase(fetchAuthLogin.fulfilled, (state, action) => {
      state.status = EFetchStatus.SUCCESS;
      state.id = action.payload;
      state.error = undefined;
    });
    builder.addCase(fetchAuthLogin.rejected, (state, action) => {
      state.status = EFetchStatus.ERROR;
      state.id = undefined;
      state.error = action.payload;
    });
    //REFRESH
    builder.addCase(fetchAuthRefresh.pending, (state) => {
      state.status = EFetchStatus.PENDING;
    });
    builder.addCase(fetchAuthRefresh.fulfilled, (state, action) => {
      state.status = EFetchStatus.SUCCESS;
      state.id = action.payload;
      state.error = undefined;
    });
    builder.addCase(fetchAuthRefresh.rejected, (state, action) => {
      state.status = EFetchStatus.ERROR;
      state.id = undefined;
      state.error = action.payload;
    });
  },
});

export const { logOut, setGuestId } = authSlice.actions;

export default authSlice.reducer;
