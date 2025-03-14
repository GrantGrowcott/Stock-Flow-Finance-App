
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import tickerReducer from './tickerSlice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    ticker: tickerReducer
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
