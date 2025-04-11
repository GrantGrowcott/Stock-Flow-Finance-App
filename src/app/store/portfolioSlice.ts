import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the PortfolioItem type
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

// Define the state structure, which contains portfolioData as an array of PortfolioItem
interface PortfolioState {
  portfolioData: PortfolioItem[];
}

const initialState: PortfolioState = {
  portfolioData: [] // Start with an empty array for portfolioData
};

// Create the portfolioSlice
const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    // Reducer to set portfolio data into portfolioData
    setPortfolioInfo: (state, action: PayloadAction<PortfolioItem[]>) => {
      state.portfolioData = action.payload; // Assign the payload to portfolioData
    },
  },
});

// Export the action for setting portfolio data
export const { setPortfolioInfo } = portfolioSlice.actions;

// Export the reducer
export default portfolioSlice.reducer;
