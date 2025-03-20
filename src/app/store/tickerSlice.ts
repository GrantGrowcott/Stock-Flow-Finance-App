import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TickerData } from '@/constants';

interface StockState {
  ticker: string;
  tickerData: TickerData[];
  activeTime:string
}


const initialState: StockState = {
  ticker: "",
  tickerData: [],
  activeTime: "5y"
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
    setActiveTime: (state, action: PayloadAction<string>) => {
      state.activeTime = action.payload;
    },
  },
});

export const { setTickerState, setTickerData, setActiveTime} = tickerSlice.actions;

export default tickerSlice.reducer;
