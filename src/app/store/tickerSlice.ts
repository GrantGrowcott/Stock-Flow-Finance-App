import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TickerData } from '@/constants';

interface StockState {
  ticker: string;
  tickerData: TickerData[];
}



const initialState: StockState = {
  ticker: "",
  tickerData: [],
};

const tickerSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    setTickerState: (state, action: PayloadAction<string>) => {
      state.ticker = action.payload;
    },
    setTickerData: (state, action: PayloadAction<TickerData[]>) => {
      state.tickerData = action.payload;
    },
  },
});

export const { setTickerState, setTickerData} = tickerSlice.actions;

export default tickerSlice.reducer;
