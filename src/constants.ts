
import { gql } from "@apollo/client";
export const icons = {
    nav: 30,
    logoWidth: 200,
    logoHeight: 100,
    profile: 50,
    login: 50,
    settings: 35,
    theme: 40,
    auth: 40,
}

export type StatementData = IncomeStatement[] | BalanceSheet[] | CashflowStatement[] | Ratios[];

export type FieldsType =
  | { label: string; key: keyof IncomeStatement }[]
  | { label: string; key: keyof BalanceSheet }[]
  | { label: string; key: keyof CashflowStatement }[]
  | { label: string; key: keyof Ratios }[];

export interface FinancialStatementsProps {
  ratios: Ratios[]; 
  income: IncomeStatement[];
  balance:BalanceSheet[];
  cashflow: CashflowStatement[];
}

export interface NavbarProps {
    collapsed: boolean;
    toggleNavbar: () => void;
  }

export interface NewsArticle {
    title: string;
    url: string;
    author?: string;
    source: {
      name: string;
    };
    description: string;
    publishedAt?: string;
    content: string;
  }

  export interface Stock {
    symbol: string;
    name: string;
    change: number;
    price: number;
    changesPercentage: number;
  }

  export interface TickerData {
    symbol : string;
    name: string;
    currency: string;
    exchangeShortName: string
  }

  export interface SearchDropdownProps {
    activeIndex: number;
    setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
    tickerData: TickerData[];
  }

  export interface PriceHistory {
    date: string;
    close: number;
    volume: number;
  }

  export type SymbolProps = {
    symbol: string | undefined;
  }

  export interface StockInformation {
    symbol : string;
    price: number;
    mktCap: number;
    range:string;
    companyName: string;
    currency: string;
    exchangeShortName: string;
    industry: string;
    description: string;
    dcfDiff: number;
    dcf: number;
    image: string;
  }

  export const incomeStatementFields: { label: string; key: keyof IncomeStatement }[] = [
    { label: "Revenue", key: "revenue" },
    { label: "Cost of Revenue", key: "costOfRevenue" },
    { label: "Gross Profit", key: "grossProfit" },
    { label: "Gross Profit Ratio", key: "grossProfitRatio" },
    { label: "Research & Development Expenses", key: "researchAndDevelopmentExpenses" },
    { label: "General & Administrative Expenses", key: "generalAndAdministrativeExpenses" },
    { label: "Selling & Marketing Expenses", key: "sellingAndMarketingExpenses" },
    { label: "Selling, General & Administrative Expenses", key: "sellingGeneralAndAdministrativeExpenses" },
    { label: "Other Expenses", key: "otherExpenses" },
    { label: "Operating Expenses", key: "operatingExpenses" },
    { label: "Cost & Expenses", key: "costAndExpenses" },
    { label: "Interest Income", key: "interestIncome" },
    { label: "Interest Expense", key: "interestExpense" },
    { label: "Depreciation & Amortization", key: "depreciationAndAmortization" },
    { label: "EBITDA", key: "ebitda" },
    { label: "EBITDA Ratio", key: "ebitdaRatio" },
    { label: "Operating Income", key: "operatingIncome" },
    { label: "Operating Income Ratio", key: "operatingIncomeRatio" },
    { label: "Total Other Income/Expenses Net", key: "totalOtherIncomeExpensesNet" },
    { label: "Income Before Tax", key: "incomeBeforeTax" },
    { label: "Income Before Tax Ratio", key: "incomeBeforeTaxRatio" },
    { label: "Income Tax Expense", key: "incomeTaxExpense" },
    { label: "Net Income", key: "netIncome" },
    { label: "Net Income Ratio", key: "netIncomeRatio" },
    { label: "EPS", key: "eps" },
    { label: "EPS Diluted", key: "epsDiluted" },
    { label: "Weighted Average Shares Outstanding", key: "weightedAverageShsOut" },
    { label: "Weighted Average Shares Outstanding (Diluted)", key: "weightedAverageShsOutDil" },
  ];
  

  


  export interface IncomeStatement {
    date: string;
    symbol: string;
    reportedCurrency: string;
    cik: string;
    fillingDate: string;
    acceptedDate: string;
    calendarYear: string;
    period: string;
    revenue: number;
    costOfRevenue: number;
    grossProfit: number;
    grossProfitRatio: number;
    researchAndDevelopmentExpenses: number;
    generalAndAdministrativeExpenses: number;
    sellingAndMarketingExpenses: number;
    sellingGeneralAndAdministrativeExpenses: number;
    otherExpenses: number;
    operatingExpenses: number;
    costAndExpenses: number;
    interestIncome: number;
    interestExpense: number;
    depreciationAndAmortization: number;
    ebitda: number;
    ebitdaRatio: number;
    operatingIncome: number;
    operatingIncomeRatio: number;
    totalOtherIncomeExpensesNet: number;
    incomeBeforeTax: number;
    incomeBeforeTaxRatio: number;
    incomeTaxExpense: number;
    netIncome: number;
    netIncomeRatio: number;
    eps: number;
    epsDiluted: number;
    weightedAverageShsOut: number;
    weightedAverageShsOutDil: number;
    link: string;
    finalLink: string;
  }

  export const balanceSheetFields: { label: string; key: keyof BalanceSheet }[] = [
    { label: "Cash & Cash Equivalents", key: "cashAndCashEquivalents" },
    { label: "Short-Term Investments", key: "shortTermInvestments" },
    { label: "Cash & Short-Term Investments", key: "cashAndShortTermInvestments" },
    { label: "Net Receivables", key: "netReceivables" },
    { label: "Inventory", key: "inventory" },
    { label: "Other Current Assets", key: "otherCurrentAssets" },
    { label: "Total Current Assets", key: "totalCurrentAssets" },
    { label: "Property, Plant & Equipment (Net)", key: "propertyPlantEquipmentNet" },
    { label: "Goodwill", key: "goodwill" },
    { label: "Intangible Assets", key: "intangibleAssets" },
    { label: "Goodwill & Intangible Assets", key: "goodwillAndIntangibleAssets" },
    { label: "Long-Term Investments", key: "longTermInvestments" },
    { label: "Tax Assets", key: "taxAssets" },
    { label: "Other Non-Current Assets", key: "otherNonCurrentAssets" },
    { label: "Total Non-Current Assets", key: "totalNonCurrentAssets" },
    { label: "Other Assets", key: "otherAssets" },
    { label: "Total Assets", key: "totalAssets" },
    { label: "Accounts Payables", key: "accountPayables" },
    { label: "Short-Term Debt", key: "shortTermDebt" },
    { label: "Tax Payables", key: "taxPayables" },
    { label: "Deferred Revenue", key: "deferredRevenue" },
    { label: "Other Current Liabilities", key: "otherCurrentLiabilities" },
    { label: "Total Current Liabilities", key: "totalCurrentLiabilities" },
    { label: "Long-Term Debt", key: "longTermDebt" },
    { label: "Deferred Revenue (Non-Current)", key: "deferredRevenueNonCurrent" },
    { label: "Deferred Tax Liabilities (Non-Current)", key: "deferredTaxLiabilitiesNonCurrent" },
    { label: "Other Non-Current Liabilities", key: "otherNonCurrentLiabilities" },
    { label: "Total Non-Current Liabilities", key: "totalNonCurrentLiabilities" },
    { label: "Other Liabilities", key: "otherLiabilities" },
    { label: "Capital Lease Obligations", key: "capitalLeaseObligations" },
    { label: "Total Liabilities", key: "totalLiabilities" },
    { label: "Preferred Stock", key: "preferredStock" },
    { label: "Common Stock", key: "commonStock" },
    { label: "Retained Earnings", key: "retainedEarnings" },
    { label: "Accumulated Other Comprehensive Income/Loss", key: "accumulatedOtherComprehensiveIncomeLoss" },
    { label: "Other Total Stockholders' Equity", key: "othertotalStockholdersEquity" },
    { label: "Total Stockholders' Equity", key: "totalStockholdersEquity" },
    { label: "Total Equity", key: "totalEquity" },
    { label: "Total Liabilities & Stockholders' Equity", key: "totalLiabilitiesAndStockholdersEquity" },
    { label: "Minority Interest", key: "minorityInterest" },
    { label: "Total Liabilities & Total Equity", key: "totalLiabilitiesAndTotalEquity" },
    { label: "Total Investments", key: "totalInvestments" },
    { label: "Total Debt", key: "totalDebt" },
    { label: "Net Debt", key: "netDebt" },
  ];
  

  export interface BalanceSheet {
    date: string;
    symbol: string;
    reportedCurrency: string;
    cik: string;
    fillingDate: string;
    acceptedDate: string;
    calendarYear: string;
    period: string;
    cashAndCashEquivalents: number;
    shortTermInvestments: number;
    cashAndShortTermInvestments: number;
    netReceivables: number;
    inventory: number;
    otherCurrentAssets: number;
    totalCurrentAssets: number;
    propertyPlantEquipmentNet: number;
    goodwill: number;
    intangibleAssets: number;
    goodwillAndIntangibleAssets: number;
    longTermInvestments: number;
    taxAssets: number;
    otherNonCurrentAssets: number;
    totalNonCurrentAssets: number;
    otherAssets: number;
    totalAssets: number;
    accountPayables: number;
    shortTermDebt: number;
    taxPayables: number;
    deferredRevenue: number;
    otherCurrentLiabilities: number;
    totalCurrentLiabilities: number;
    longTermDebt: number;
    deferredRevenueNonCurrent: number;
    deferredTaxLiabilitiesNonCurrent: number;
    otherNonCurrentLiabilities: number;
    totalNonCurrentLiabilities: number;
    otherLiabilities: number;
    capitalLeaseObligations: number;
    totalLiabilities: number;
    preferredStock: number;
    commonStock: number;
    retainedEarnings: number;
    accumulatedOtherComprehensiveIncomeLoss: number;
    othertotalStockholdersEquity: number;
    totalStockholdersEquity: number;
    totalEquity: number;
    totalLiabilitiesAndStockholdersEquity: number;
    minorityInterest: number;
    totalLiabilitiesAndTotalEquity: number;
    totalInvestments: number;
    totalDebt: number;
    netDebt: number;
    link: string;
    finalLink: string;
  }

  export interface CashflowStatement {
    date: string;
    symbol: string;
    reportedCurrency: string;
    cik: string;
    fillingDate: string;
    acceptedDate: string;
    calendarYear: string;
    period: string;
    netIncome: number;
    depreciationAndAmortization: number;
    deferredIncomeTax: number;
    stockBasedCompensation: number;
    changeInWorkingCapital: number;
    accountsReceivables: number;
    inventory: number;
    accountsPayables: number;
    otherWorkingCapital: number;
    otherNonCashItems: number;
    netCashProvidedByOperatingActivities: number;
    investmentsInPropertyPlantAndEquipment: number;
    acquisitionsNet: number;
    purchasesOfInvestments: number;
    salesMaturitiesOfInvestments: number;
    otherInvestingActivites: number;
    netCashUsedForInvestingActivites: number;
    debtRepayment: number;
    commonStockIssued: number;
    commonStockRepurchased: number;
    dividendsPaid: number;
    otherFinancingActivites: number;
    netCashUsedProvidedByFinancingActivities: number;
    effectOfForexChangesOnCash: number;
    netChangeInCash: number;
    cashAtEndOfPeriod: number;
    cashAtBeginningOfPeriod: number;
    operatingCashFlow: number;
    capitalExpenditure: number;
    freeCashFlow: number;
    link: string;
    finalLink: string;
  }


  

  export interface Ratios  {
    date: string;
    calendarYear: string;
    period: string;
    currentRatio: number;
    quickRatio: number;
    cashRatio: number;
    daysOfSalesOutstanding: number;
    daysOfInventoryOutstanding: number;
    operatingCycle: number;
    daysOfPayablesOutstanding: number;
    cashConversionCycle: number;
    grossProfitMargin: number;
    operatingProfitMargin: number;
    pretaxProfitMargin: number;
    netProfitMargin: number;
    effectiveTaxRate: number;
    returnOnAssets: number;
    returnOnEquity: number;
    returnOnCapitalEmployed: number;
    netIncomePerEBT: number;
    ebtPerEbit: number;
    ebitPerRevenue: number;
    debtRatio: number;
    debtEquityRatio: number;
    longTermDebtToCapitalization: number;
    totalDebtToCapitalization: number;
    interestCoverage: number;
    cashFlowToDebtRatio: number;
    companyEquityMultiplier: number;
    receivablesTurnover: number;
    payablesTurnover: number;
    inventoryTurnover: number;
    fixedAssetTurnover: number;
    assetTurnover: number;
    operatingCashFlowPerShare: number;
    freeCashFlowPerShare: number;
    cashPerShare: number;
    payoutRatio: number;
    operatingCashFlowSalesRatio: number;
    freeCashFlowOperatingCashFlowRatio: number;
    cashFlowCoverageRatios: number;
    shortTermCoverageRatios: number;
    capitalExpenditureCoverageRatio: number;
    dividendPaidAndCapexCoverageRatio: number;
    dividendPayoutRatio: number;
    priceBookValueRatio: number;
    priceToBookRatio: number;
    priceToSalesRatio: number;
    priceEarningsRatio: number;
    priceToFreeCashFlowsRatio: number;
    priceToOperatingCashFlowsRatio: number;
    priceCashFlowRatio: number;
    priceEarningsToGrowthRatio: number;
    priceSalesRatio: number;
    dividendYield: number;
    enterpriseValueMultiple: number;
    priceFairValue: number;
  };
  
  
  
  
  
  


export const GET_PRICE_HISTORY = gql`
  query GetPriceHistory($symbol: String! ) {
    getPriceHistory(symbol: $symbol) {
      date
      close
      volume
    }
  }
`;

export const GET_STOCK_INFORMATION = gql`
  query GetStockInformation($symbol: String!) {
    getStockInformation(symbol: $symbol) {
      symbol
      price
      mktCap
      range
      companyName
      currency
      exchangeShortName
      industry
      description
      dcfDiff
      dcf
      image
    }
  }
`;

export const GET_INCOME_STATEMENT = gql`
  query GetIncomeStatement($symbol: String!) {
    getIncomeStatement(symbol: $symbol) {
    date 
    symbol
    reportedCurrency
    cik
    fillingDate
    acceptedDate
    calendarYear
    period
    revenue
    costOfRevenue
    grossProfit
    grossProfitRatio
    researchAndDevelopmentExpenses
    generalAndAdministrativeExpenses
    sellingAndMarketingExpenses
    sellingGeneralAndAdministrativeExpenses
    otherExpenses
    operatingExpenses
    costAndExpenses
    interestIncome
    interestExpense
    depreciationAndAmortization
    ebitda
    ebitdaRatio
    operatingIncome
    operatingIncomeRatio
    totalOtherIncomeExpensesNet
    incomeBeforeTax
    incomeBeforeTaxRatio
    incomeTaxExpense
    netIncome
    netIncomeRatio
    eps
    epsDiluted
    weightedAverageShsOut
    weightedAverageShsOutDil
    link
    finalLink
    }
  }
`;

export const GET_BALANCE_SHEET = gql`
  query GetBalanceSheet($symbol: String!) {
    getBalanceSheet(symbol: $symbol) {
      date
      symbol
      reportedCurrency
      cik
      fillingDate
      acceptedDate
      calendarYear
      period
      cashAndCashEquivalents
      shortTermInvestments
      cashAndShortTermInvestments
      netReceivables
      inventory
      otherCurrentAssets
      totalCurrentAssets
      propertyPlantEquipmentNet
      goodwill
      intangibleAssets
      goodwillAndIntangibleAssets
      longTermInvestments
      taxAssets
      otherNonCurrentAssets
      totalNonCurrentAssets
      otherAssets
      totalAssets
      accountPayables
      shortTermDebt
      taxPayables
      deferredRevenue
      otherCurrentLiabilities
      totalCurrentLiabilities
      longTermDebt
      deferredRevenueNonCurrent
      deferredTaxLiabilitiesNonCurrent
      otherNonCurrentLiabilities
      totalNonCurrentLiabilities
      otherLiabilities
      capitalLeaseObligations
      totalLiabilities
      preferredStock
      commonStock
      retainedEarnings
      accumulatedOtherComprehensiveIncomeLoss
      othertotalStockholdersEquity
      totalStockholdersEquity
      totalEquity
      totalLiabilitiesAndStockholdersEquity
      minorityInterest
      totalLiabilitiesAndTotalEquity
      totalInvestments
      totalDebt
      netDebt
      link
      finalLink
    }
  }
`;

export const GET_CASHFLOW = gql`
  query GetCashflow($symbol: String!) {
    getCashflow(symbol: $symbol) {
      date
      symbol
      reportedCurrency
      cik
      fillingDate
      acceptedDate
      calendarYear
      period
      netIncome
      depreciationAndAmortization
      deferredIncomeTax
      stockBasedCompensation
      changeInWorkingCapital
      accountsReceivables
      inventory
      accountsPayables
      otherWorkingCapital
      otherNonCashItems
      netCashProvidedByOperatingActivities
      investmentsInPropertyPlantAndEquipment
      acquisitionsNet
      purchasesOfInvestments
      salesMaturitiesOfInvestments
      otherInvestingActivites
      netCashUsedForInvestingActivites
      debtRepayment
      commonStockIssued
      commonStockRepurchased
      dividendsPaid
      otherFinancingActivites
      netCashUsedProvidedByFinancingActivities
      effectOfForexChangesOnCash
      netChangeInCash
      cashAtEndOfPeriod
      cashAtBeginningOfPeriod
      operatingCashFlow
      capitalExpenditure
      freeCashFlow
      link
      finalLink
    }
  }
`;


export const GET_RATIOS = gql`
  query GetRatios($symbol: String!) {
    getRatios(symbol: $symbol) {
      date
      calendarYear
      period
      currentRatio
      quickRatio
      cashRatio
      daysOfSalesOutstanding
      daysOfInventoryOutstanding
      operatingCycle
      daysOfPayablesOutstanding
      cashConversionCycle
      grossProfitMargin
      operatingProfitMargin
      pretaxProfitMargin
      netProfitMargin
      effectiveTaxRate
      returnOnAssets
      returnOnEquity
      returnOnCapitalEmployed
      netIncomePerEBT
      ebtPerEbit
      ebitPerRevenue
      debtRatio
      debtEquityRatio
      longTermDebtToCapitalization
      totalDebtToCapitalization
      interestCoverage
      cashFlowToDebtRatio
      companyEquityMultiplier
      receivablesTurnover
      payablesTurnover
      inventoryTurnover
      fixedAssetTurnover
      assetTurnover
      operatingCashFlowPerShare
      freeCashFlowPerShare
      cashPerShare
      payoutRatio
      operatingCashFlowSalesRatio
      freeCashFlowOperatingCashFlowRatio
      cashFlowCoverageRatios
      shortTermCoverageRatios
      capitalExpenditureCoverageRatio
      dividendPaidAndCapexCoverageRatio
      dividendPayoutRatio
      priceBookValueRatio
      priceToBookRatio
      priceToSalesRatio
      priceEarningsRatio
      priceToFreeCashFlowsRatio
      priceToOperatingCashFlowsRatio
      priceCashFlowRatio
      priceEarningsToGrowthRatio
      priceSalesRatio
      dividendYield
      enterpriseValueMultiple
      priceFairValue
    }
  }
`;



export const typeDefs = gql`
  type PriceHistory {
    date: String!
    close: Float!
    volume: Int!
  }

  type StockInformation {
    symbol: String!
    price: Float!
    mktCap: Float!
    range: String!
    companyName: String!
    currency: String!
    exchangeShortName: String!
    industry: String!
    description: String!
    dcfDiff: Float!
    dcf: Float!
    image: String!
  }

  type IncomeStatement {
    date: String!
    symbol: String!
    reportedCurrency: String!
    cik: String!
    fillingDate: String!
    acceptedDate: String!
    calendarYear: String!
    period: String!
    revenue: Float!
    costOfRevenue: Float!
    grossProfit: Float!
    grossProfitRatio: Float!
    researchAndDevelopmentExpenses: Float!
    generalAndAdministrativeExpenses: Float!
    sellingAndMarketingExpenses: Float!
    sellingGeneralAndAdministrativeExpenses: Float!
    otherExpenses: Float!
    operatingExpenses: Float!
    costAndExpenses: Float!
    interestIncome: Float!
    interestExpense: Float!
    depreciationAndAmortization: Float!
    ebitda: Float!
    ebitdaRatio: Float
    operatingIncome: Float!
    operatingIncomeRatio: Float!
    totalOtherIncomeExpensesNet: Float!
    incomeBeforeTax: Float!
    incomeBeforeTaxRatio: Float!
    incomeTaxExpense: Float!
    netIncome: Float!
    netIncomeRatio: Float!
    eps: Float!
    epsDiluted: Float
    weightedAverageShsOut: Float!
    weightedAverageShsOutDil: Float!
    link: String!
    finalLink: String!
  }

  type BalanceSheet {
    date: String!
    symbol: String!
    reportedCurrency: String!
    cik: String!
    fillingDate: String!
    acceptedDate: String!
    calendarYear: String!
    period: String!
    cashAndCashEquivalents: Float!
    shortTermInvestments: Float!
    cashAndShortTermInvestments: Float!
    netReceivables: Float!
    inventory: Float!
    otherCurrentAssets: Float!
    totalCurrentAssets: Float!
    propertyPlantEquipmentNet: Float!
    goodwill: Float!
    intangibleAssets: Float!
    goodwillAndIntangibleAssets: Float!
    longTermInvestments: Float!
    taxAssets: Float!
    otherNonCurrentAssets: Float!
    totalNonCurrentAssets: Float!
    otherAssets: Float!
    totalAssets: Float!
    accountPayables: Float!
    shortTermDebt: Float!
    taxPayables: Float!
    deferredRevenue: Float!
    otherCurrentLiabilities: Float!
    totalCurrentLiabilities: Float!
    longTermDebt: Float!
    deferredRevenueNonCurrent: Float!
    deferredTaxLiabilitiesNonCurrent: Float!
    otherNonCurrentLiabilities: Float!
    totalNonCurrentLiabilities: Float!
    otherLiabilities: Float!
    capitalLeaseObligations: Float!
    totalLiabilities: Float!
    preferredStock: Float!
    commonStock: Float!
    retainedEarnings: Float!
    accumulatedOtherComprehensiveIncomeLoss: Float!
    othertotalStockholdersEquity: Float!
    totalStockholdersEquity: Float!
    totalEquity: Float!
    totalLiabilitiesAndStockholdersEquity: Float!
    minorityInterest: Float!
    totalLiabilitiesAndTotalEquity: Float!
    totalInvestments: Float!
    totalDebt: Float!
    netDebt: Float!
    link: String!
    finalLink: String!
  }

  type CashflowStatement {
    date: String!
    symbol: String!
    reportedCurrency: String!
    cik: String!
    fillingDate: String!
    acceptedDate: String!
    calendarYear: String!
    period: String!
    netIncome: Float!
    depreciationAndAmortization: Float!
    deferredIncomeTax: Float!
    stockBasedCompensation: Float!
    changeInWorkingCapital: Float!
    accountsReceivables: Float!
    inventory: Float!
    accountsPayables: Float!
    otherWorkingCapital: Float!
    otherNonCashItems: Float!
    netCashProvidedByOperatingActivities: Float!
    investmentsInPropertyPlantAndEquipment: Float!
    acquisitionsNet: Float!
    purchasesOfInvestments: Float!
    salesMaturitiesOfInvestments: Float!
    otherInvestingActivites: Float!
    netCashUsedForInvestingActivites: Float
    debtRepayment: Float!
    commonStockIssued: Float!
    commonStockRepurchased: Float!
    dividendsPaid: Float!
    otherFinancingActivites: Float
    netCashUsedProvidedByFinancingActivities: Float!
    effectOfForexChangesOnCash: Float!
    netChangeInCash: Float!
    cashAtEndOfPeriod: Float!
    cashAtBeginningOfPeriod: Float!
    operatingCashFlow: Float!
    capitalExpenditure: Float!
    freeCashFlow: Float!
    link: String!
    finalLink: String!
  }

 type Ratios {
  date: String!
  calendarYear: String!
  period: String!
  currentRatio: Float!
  quickRatio: Float!
  cashRatio: Float!
  daysOfSalesOutstanding: Float!
  daysOfInventoryOutstanding: Float!
  operatingCycle: Float!
  daysOfPayablesOutstanding: Float!
  cashConversionCycle: Float!
  grossProfitMargin: Float!
  operatingProfitMargin: Float!
  pretaxProfitMargin: Float!
  netProfitMargin: Float!
  effectiveTaxRate: Float!
  returnOnAssets: Float!
  returnOnEquity: Float!
  returnOnCapitalEmployed: Float!
  netIncomePerEBT: Float!
  ebtPerEbit: Float!
  ebitPerRevenue: Float!
  debtRatio: Float!
  debtEquityRatio: Float!
  longTermDebtToCapitalization: Float!
  totalDebtToCapitalization: Float!
  interestCoverage: Float!
  cashFlowToDebtRatio: Float!
  companyEquityMultiplier: Float!
  receivablesTurnover: Float!
  payablesTurnover: Float!
  inventoryTurnover: Float!
  fixedAssetTurnover: Float!
  assetTurnover: Float!
  operatingCashFlowPerShare: Float!
  freeCashFlowPerShare: Float!
  cashPerShare: Float!
  payoutRatio: Float!
  operatingCashFlowSalesRatio: Float!
  freeCashFlowOperatingCashFlowRatio: Float!
  cashFlowCoverageRatios: Float!
  shortTermCoverageRatios: Float!
  capitalExpenditureCoverageRatio: Float!
  dividendPaidAndCapexCoverageRatio: Float!
  dividendPayoutRatio: Float!
  priceBookValueRatio: Float!
  priceToBookRatio: Float!
  priceToSalesRatio: Float!
  priceEarningsRatio: Float!
  priceToFreeCashFlowsRatio: Float!
  priceToOperatingCashFlowsRatio: Float!
  priceCashFlowRatio: Float!
  priceEarningsToGrowthRatio: Float!
  priceSalesRatio: Float!
  dividendYield: Float!
  enterpriseValueMultiple: Float!
  priceFairValue: Float!
}



  type Query {
    getStockInformation(symbol: String!): StockInformation
    getIncomeStatement(symbol: String!): [IncomeStatement]
    getPriceHistory(symbol: String!): [PriceHistory]
    getBalanceSheet(symbol: String!): [BalanceSheet]
    getCashflow(symbol: String!): [CashflowStatement]
    getRatios(symbol: String!): [Ratios]
  }
`;






