import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import auth from './auth/slice';
import rooms from './rooms/slice';
import profile from './profile/slice';

const store = configureStore({
  reducer: {
    auth,
    rooms,
    profile,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
