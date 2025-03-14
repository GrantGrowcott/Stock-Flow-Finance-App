// This the ticker search that will likely go in the search bar

// https://financialmodelingprep.com/api/v3/search-ticker?query=AA&limit=10&apikey=qKbye2ChaZdQ6BoVhnYPGb8ZzWj45ShM


// Historical Price over the last 5 years( each day)

// https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?apikey=qKbye2ChaZdQ6BoVhnYPGb8ZzWj45ShM

// Full Company Profile ( not available on free tier)

// https://financialmodelingprep.com/api/v4/company-outlook?symbol=AAPL&apikey=qKbye2ChaZdQ6BoVhnYPGb8ZzWj45ShM

// Profile of Company 
// Includes the company image, description, market cap, current price ticker etc  

// https://financialmodelingprep.com/api/v3/profile/AAPL?apikey=qKbye2ChaZdQ6BoVhnYPGb8ZzWj45ShM

// Income Statement

// https://financialmodelingprep.com/api/v3/income-statement/AAPL?apikey=qKbye2ChaZdQ6BoVhnYPGb8ZzWj45ShM

// Balance Sheet

// https://financialmodelingprep.com/api/v3/balance-sheet-statement/AAPL?apikey=qKbye2ChaZdQ6BoVhnYPGb8ZzWj45ShM

// Cash Flow Statement

// https://financialmodelingprep.com/api/v3/cash-flow-sheet-statement/AAPL?apikey=qKbye2ChaZdQ6BoVhnYPGb8ZzWj45ShM

//  Key Ratios

// https://financialmodelingprep.com/api/v3/ratios-ttm/AAPL?apikey=qKbye2ChaZdQ6BoVhnYPGb8ZzWj45ShM


// ROIC = ROE x (1/ (1 + (debt to equity ratio) x (1 - effective tax rate))
//  Can find effective tax rate TTM in the ratios api
//  Debt to equity is calculated through the balance sheet (total debt / total shareholder equity)


//  Use checks and x's if the values(key metrics) are at appropriate ranges for values investing ( my hurdle rates)
// Graph on the left, key metrics to the right, below all of this will be the financial statements