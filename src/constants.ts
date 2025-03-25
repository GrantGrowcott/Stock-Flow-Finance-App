
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
    netCashUsedForInvestingActivities: number;
    debtRepayment: number;
    commonStockIssued: number;
    commonStockRepurchased: number;
    dividendsPaid: number;
    otherFinancingActivities: number;
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

  export interface Ratios {
    dividendYielTTM: number;
    dividendYielPercentageTTM: number;
    peRatioTTM: number;
    pegRatioTTM: number;
    payoutRatioTTM: number;
    currentRatioTTM: number;
    quickRatioTTM: number;
    cashRatioTTM: number;
    daysOfSalesOutstandingTTM: number;
    daysOfInventoryOutstandingTTM: number;
    operatingCycleTTM: number;
    daysOfPayablesOutstandingTTM: number;
    cashConversionCycleTTM: number;
    grossProfitMarginTTM: number;
    operatingProfitMarginTTM: number;
    pretaxProfitMarginTTM: number;
    netProfitMarginTTM: number;
    effectiveTaxRateTTM: number;
    returnOnAssetsTTM: number;
    returnOnEquityTTM: number;
    returnOnCapitalEmployedTTM: number;
    netIncomePerEBTTTM: number;
    ebtPerEbitTTM: number;
    ebitPerRevenueTTM: number;
    debtRatioTTM: number;
    debtEquityRatioTTM: number;
    longTermDebtToCapitalizationTTM: number;
    totalDebtToCapitalizationTTM: number;
    interestCoverageTTM: number;
    cashFlowToDebtRatioTTM: number;
    companyEquityMultiplierTTM: number;
    receivablesTurnoverTTM: number;
    payablesTurnoverTTM: number;
    inventoryTurnoverTTM: number;
    fixedAssetTurnoverTTM: number;
    assetTurnoverTTM: number;
    operatingCashFlowPerShareTTM: number;
    freeCashFlowPerShareTTM: number;
    cashPerShareTTM: number;
    operatingCashFlowSalesRatioTTM: number;
    freeCashFlowOperatingCashFlowRatioTTM: number;
    cashFlowCoverageRatiosTTM: number;
    shortTermCoverageRatiosTTM: number;
    capitalExpenditureCoverageRatioTTM: number;
    dividendPaidAndCapexCoverageRatioTTM: number;
    priceBookValueRatioTTM: number;
    priceToBookRatioTTM: number;
    priceToSalesRatioTTM: number;
    priceEarningsRatioTTM: number;
    priceToFreeCashFlowsRatioTTM: number;
    priceToOperatingCashFlowsRatioTTM: number;
    priceCashFlowRatioTTM: number;
    priceEarningsToGrowthRatioTTM: number;
    priceSalesRatioTTM: number;
    enterpriseValueMultipleTTM: number;
    priceFairValueTTM: number;
    dividendPerShareTTM: number;
  }
  
  
  


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
      netCashUsedForInvestingActivities
      debtRepayment
      commonStockIssued
      commonStockRepurchased
      dividendsPaid
      otherFinancingActivities
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
      dividendYielTTM
      dividendYielPercentageTTM
      peRatioTTM
      pegRatioTTM
      payoutRatioTTM
      currentRatioTTM
      quickRatioTTM
      cashRatioTTM
      daysOfSalesOutstandingTTM
      daysOfInventoryOutstandingTTM
      operatingCycleTTM
      daysOfPayablesOutstandingTTM
      cashConversionCycleTTM
      grossProfitMarginTTM
      operatingProfitMarginTTM
      pretaxProfitMarginTTM
      netProfitMarginTTM
      effectiveTaxRateTTM
      returnOnAssetsTTM
      returnOnEquityTTM
      returnOnCapitalEmployedTTM
      netIncomePerEBTTTM
      ebtPerEbitTTM
      ebitPerRevenueTTM
      debtRatioTTM
      debtEquityRatioTTM
      longTermDebtToCapitalizationTTM
      totalDebtToCapitalizationTTM
      interestCoverageTTM
      cashFlowToDebtRatioTTM
      companyEquityMultiplierTTM
      receivablesTurnoverTTM
      payablesTurnoverTTM
      inventoryTurnoverTTM
      fixedAssetTurnoverTTM
      assetTurnoverTTM
      operatingCashFlowPerShareTTM
      freeCashFlowPerShareTTM
      cashPerShareTTM
      operatingCashFlowSalesRatioTTM
      freeCashFlowOperatingCashFlowRatioTTM
      cashFlowCoverageRatiosTTM
      shortTermCoverageRatiosTTM
      capitalExpenditureCoverageRatioTTM
      dividendPaidAndCapexCoverageRatioTTM
      priceBookValueRatioTTM
      priceToBookRatioTTM
      priceToSalesRatioTTM
      priceEarningsRatioTTM
      priceToFreeCashFlowsRatioTTM
      priceToOperatingCashFlowsRatioTTM
      priceCashFlowRatioTTM
      priceEarningsToGrowthRatioTTM
      priceSalesRatioTTM
      enterpriseValueMultipleTTM
      priceFairValueTTM
      dividendPerShareTTM
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
    netCashUsedForInvestingActivities: Float
    debtRepayment: Float!
    commonStockIssued: Float!
    commonStockRepurchased: Float!
    dividendsPaid: Float!
    otherFinancingActivities: Float
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
  dividendYielTTM: Float!
  dividendYielPercentageTTM: Float!
  peRatioTTM: Float!
  pegRatioTTM: Float!
  payoutRatioTTM: Float!
  currentRatioTTM: Float!
  quickRatioTTM: Float!
  cashRatioTTM: Float!
  daysOfSalesOutstandingTTM: Float!
  daysOfInventoryOutstandingTTM: Float!
  operatingCycleTTM: Float!
  daysOfPayablesOutstandingTTM: Float!
  cashConversionCycleTTM: Float!
  grossProfitMarginTTM: Float!
  operatingProfitMarginTTM: Float!
  pretaxProfitMarginTTM: Float!
  netProfitMarginTTM: Float!
  effectiveTaxRateTTM: Float!
  returnOnAssetsTTM: Float!
  returnOnEquityTTM: Float!
  returnOnCapitalEmployedTTM: Float!
  netIncomePerEBTTTM: Float!
  ebtPerEbitTTM: Float!
  ebitPerRevenueTTM: Float!
  debtRatioTTM: Float!
  debtEquityRatioTTM: Float!
  longTermDebtToCapitalizationTTM: Float!
  totalDebtToCapitalizationTTM: Float!
  interestCoverageTTM: Float!
  cashFlowToDebtRatioTTM: Float!
  companyEquityMultiplierTTM: Float!
  receivablesTurnoverTTM: Float!
  payablesTurnoverTTM: Float!
  inventoryTurnoverTTM: Float!
  fixedAssetTurnoverTTM: Float!
  assetTurnoverTTM: Float!
  operatingCashFlowPerShareTTM: Float!
  freeCashFlowPerShareTTM: Float!
  cashPerShareTTM: Float!
  operatingCashFlowSalesRatioTTM: Float!
  freeCashFlowOperatingCashFlowRatioTTM: Float!
  cashFlowCoverageRatiosTTM: Float!
  shortTermCoverageRatiosTTM: Float!
  capitalExpenditureCoverageRatioTTM: Float!
  dividendPaidAndCapexCoverageRatioTTM: Float!
  priceBookValueRatioTTM: Float!
  priceToBookRatioTTM: Float
}


  type Query {
    getStockInformation(symbol: String!): StockInformation
    getIncomeStatement(symbol: String!): IncomeStatement
    getPriceHistory(symbol: String!): [PriceHistory]
    getBalanceSheet(symbol: String!): BalanceSheet
    getCashflow(symbol: String!): CashflowStatement
    getRatios(symbol: String!): Ratios
  }
`;






