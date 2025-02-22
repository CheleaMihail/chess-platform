import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCurrentUser } from './asyncActions';
import { EFetchStatus } from '../../types/enums';
import { IError, IUser } from '../../types/interfaces';

interface IProfileState {
  user?: IUser;
  status?: EFetchStatus;
  error?: IError;
}

const initialState: IProfileState = {
  user: undefined,
  status: undefined,
  error: undefined,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  // reducers: {
  //   setUserProfile(state, action: PayloadAction<boolean>) {
  //     state.isConnected = action.payload;
  //   },
  // },
  extraReducers: (builder) => {
    //REGISTER
    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.status = EFetchStatus.PENDING;
    });
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.status = EFetchStatus.SUCCESS;
      state.user = action.payload;
      state.error = undefined;
    });
    builder.addCase(fetchCurrentUser.rejected, (state, action) => {
      state.status = EFetchStatus.ERROR;
      state.error = action.payload;
    });
  },
});

// export const { setUserProfile } = profileSlice.actions;
export default profileSlice.reducer;
