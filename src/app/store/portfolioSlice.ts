import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type PortfolioItem = {
  id: string;
  user_id: string;
  symbol: string;
  company_name: string;
  price: number;
  sector: string;
  industry: string;
  description: string;
};
interface PortfolioState {
  portfolioData: PortfolioItem[];
}

const initialState: PortfolioState = {
  portfolioData: [] 
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    
    setPortfolioInfo: (state, action: PayloadAction<PortfolioItem[]>) => {
      state.portfolioData = action.payload; 
    },
  },
});

export const { setPortfolioInfo } = portfolioSlice.actions;

export default portfolioSlice.reducer;
