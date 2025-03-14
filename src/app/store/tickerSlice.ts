import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StockState {
  ticker: string;
}

const initialState: StockState = {
  ticker: "",
};

const tickerSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    setTickerState: (state, action: PayloadAction<string>) => {
      state.ticker = action.payload;
    },
  },
});

export const { setTickerState} = tickerSlice.actions;

export default tickerSlice.reducer;
