import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { PriceHistory } from "@/constants";
import { StockInformation, typeDefs, IncomeStatement, BalanceSheet, CashflowStatement, Ratios } from "@/constants";

const resolvers = {
    Query: {
      getPriceHistory: async (_: unknown, { symbol }: { symbol: string }) => {
        // Ensure the symbol is valid before making the request
        if (!symbol) {
          throw new Error("Symbol is required");
        }
  
        const response = await fetch(
          `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=${process.env.NEXT_PUBLIC_FINANCIAL_API_KEY}`
        );
        const data = await response.json();
  
        // Ensure that the response contains the historical data
        if (!data || !data.historical) {
          throw new Error("No historical data found for symbol: " + symbol);
        }
  
        return data.historical.map((item: PriceHistory) => ({
          date: item.date,
          close: item.close,
          volume: item.volume,
        }));
      },getStockInformation: async (_: unknown, { symbol }: { symbol: string }): Promise<StockInformation | null> => {
            try {
          
              const response = await fetch(
                `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${process.env.NEXT_PUBLIC_FINANCIAL_API_KEY}`
              );
          
              // Check for HTTP errors
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
          
              const data = await response.json();
              const stock = data[0];
          
              return {
                symbol : stock.symbol,
                price: Number(stock.price),
                mktCap: Number(stock.mktCap),
                range: stock.range,
                companyName: stock.companyName,
                currency: stock.currency || '',
                exchangeShortName: stock.exchangeShortName || '',
                industry: stock.industry || '',
                description: stock.description || '',
                dcfDiff: Number(stock.dcfDiff || 0),
                dcf: Number(stock.dcf || 0),
                image: stock.image || ''
              };
            } catch (error) {
              console.error('Error fetching stock information:', error);
              return null;
            }
          },
          getIncomeStatement: async (_: unknown, { symbol }: { symbol: string }): Promise<IncomeStatement | null> => {
            try {
              const response = await fetch(
                `https://financialmodelingprep.com/api/v3/income-statement/${symbol}?apikey=${process.env.NEXT_PUBLIC_FINANCIAL_API_KEY}`
              );
          
              // Check for HTTP errors
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
          
              const data = await response.json();
          
              // Ensure data is not empty
              if (!data || data.length === 0) {
                throw new Error(`No income statement data found for ${symbol}`);
              }
          
              const stock = data[0]; // Assuming the API returns an array of historical income statements
          
              return {
                date: stock.date,
                symbol: stock.symbol,
                reportedCurrency: stock.reportedCurrency,
                cik: stock.cik,
                fillingDate: stock.fillingDate,
                acceptedDate: stock.acceptedDate,
                calendarYear: stock.calendarYear,
                period: stock.period,
                revenue: stock.revenue,
                costOfRevenue: stock.costOfRevenue,
                grossProfit: stock.grossProfit,
                grossProfitRatio: stock.grossProfitRatio,
                researchAndDevelopmentExpenses: stock.researchAndDevelopmentExpenses,
                generalAndAdministrativeExpenses: stock.generalAndAdministrativeExpenses,
                sellingAndMarketingExpenses: stock.sellingAndMarketingExpenses,
                sellingGeneralAndAdministrativeExpenses: stock.sellingGeneralAndAdministrativeExpenses,
                otherExpenses: stock.otherExpenses,
                operatingExpenses: stock.operatingExpenses,
                costAndExpenses: stock.costAndExpenses,
                interestIncome: stock.interestIncome,
                interestExpense: stock.interestExpense,
                depreciationAndAmortization: stock.depreciationAndAmortization,
                ebitda: stock.ebitda,
                ebitdaRatio: stock.ebitdaRatio ,
                operatingIncome: stock.operatingIncome,
                operatingIncomeRatio: stock.operatingIncomeRatio,
                totalOtherIncomeExpensesNet: stock.totalOtherIncomeExpensesNet,
                incomeBeforeTax: stock.incomeBeforeTax,
                incomeBeforeTaxRatio: stock.incomeBeforeTaxRatio,
                incomeTaxExpense: stock.incomeTaxExpense,
                netIncome: stock.netIncome,
                netIncomeRatio: stock.netIncomeRatio,
                eps: stock.eps,
                epsDiluted: stock.epsDiluted,
                weightedAverageShsOut: stock.weightedAverageShsOut,
                weightedAverageShsOutDil: stock.weightedAverageShsOutDil,
                link: stock.link,
                finalLink: stock.finalLink
              };
            } catch (error) {
              console.error('Error fetching income statement:', error);
              return null;
            }
          },
          getBalanceSheet: async (_: unknown, { symbol }: { symbol: string }): Promise<BalanceSheet | null> => {
            try {
              const response = await fetch(
                `https://financialmodelingprep.com/api/v3/balance-sheet-statement/${symbol}?apikey=${process.env.NEXT_PUBLIC_FINANCIAL_API_KEY}`
              );
          
              // Check for HTTP errors
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
          
              const data = await response.json();
          
              // Ensure data is not empty
              if (!data || data.length === 0) {
                throw new Error(`No balance sheet data found for ${symbol}`);
              }
          
              const stock = data[0]; // Assuming the API returns an array of balance sheet statements
          
              return {
                date: stock.date,
                symbol: stock.symbol,
                reportedCurrency: stock.reportedCurrency,
                cik: stock.cik,
                fillingDate: stock.fillingDate,
                acceptedDate: stock.acceptedDate,
                calendarYear: stock.calendarYear,
                period: stock.period,
                cashAndCashEquivalents: stock.cashAndCashEquivalents,
                shortTermInvestments: stock.shortTermInvestments,
                cashAndShortTermInvestments: stock.cashAndShortTermInvestments,
                netReceivables: stock.netReceivables,
                inventory: stock.inventory,
                otherCurrentAssets: stock.otherCurrentAssets,
                totalCurrentAssets: stock.totalCurrentAssets,
                propertyPlantEquipmentNet: stock.propertyPlantEquipmentNet,
                goodwill: stock.goodwill,
                intangibleAssets: stock.intangibleAssets,
                goodwillAndIntangibleAssets: stock.goodwillAndIntangibleAssets,
                longTermInvestments: stock.longTermInvestments,
                taxAssets: stock.taxAssets,
                otherNonCurrentAssets: stock.otherNonCurrentAssets,
                totalNonCurrentAssets: stock.totalNonCurrentAssets,
                otherAssets: stock.otherAssets,
                totalAssets: stock.totalAssets,
                accountPayables: stock.accountPayables,
                shortTermDebt: stock.shortTermDebt,
                taxPayables: stock.taxPayables,
                deferredRevenue: stock.deferredRevenue,
                otherCurrentLiabilities: stock.otherCurrentLiabilities,
                totalCurrentLiabilities: stock.totalCurrentLiabilities,
                longTermDebt: stock.longTermDebt,
                deferredRevenueNonCurrent: stock.deferredRevenueNonCurrent,
                deferredTaxLiabilitiesNonCurrent: stock.deferredTaxLiabilitiesNonCurrent,
                otherNonCurrentLiabilities: stock.otherNonCurrentLiabilities,
                totalNonCurrentLiabilities: stock.totalNonCurrentLiabilities,
                otherLiabilities: stock.otherLiabilities,
                capitalLeaseObligations: stock.capitalLeaseObligations,
                totalLiabilities: stock.totalLiabilities,
                preferredStock: stock.preferredStock,
                commonStock: stock.commonStock,
                retainedEarnings: stock.retainedEarnings,
                accumulatedOtherComprehensiveIncomeLoss: stock.accumulatedOtherComprehensiveIncomeLoss,
                othertotalStockholdersEquity: stock.othertotalStockholdersEquity,
                totalStockholdersEquity: stock.totalStockholdersEquity,
                totalEquity: stock.totalEquity,
                totalLiabilitiesAndStockholdersEquity: stock.totalLiabilitiesAndStockholdersEquity,
                minorityInterest: stock.minorityInterest,
                totalLiabilitiesAndTotalEquity: stock.totalLiabilitiesAndTotalEquity,
                totalInvestments: stock.totalInvestments,
                totalDebt: stock.totalDebt,
                netDebt: stock.netDebt,
                link: stock.link,
                finalLink: stock.finalLink
              };
            } catch (error) {
              console.error('Error fetching balance sheet:', error);
              return null;
            }
          },
          getCashflow: async (_: unknown, { symbol }: { symbol: string }): Promise<CashflowStatement | null> => {
            try {
              const response = await fetch(
                `https://financialmodelingprep.com/api/v3/cash-flow-statement/${symbol}?apikey=${process.env.NEXT_PUBLIC_FINANCIAL_API_KEY}`
              );
          
              // Check for HTTP errors
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
          
              const data = await response.json();
          
              // Ensure data is not empty
              if (!data || data.length === 0) {
                throw new Error(`No cashflow data found for ${symbol}`);
              }
          
              const cashflow = data[0]; // Assuming the API returns an array of cash flow statements
          
              return {
                date: cashflow.date,
                symbol: cashflow.symbol,
                reportedCurrency: cashflow.reportedCurrency,
                cik: cashflow.cik,
                fillingDate: cashflow.fillingDate,
                acceptedDate: cashflow.acceptedDate,
                calendarYear: cashflow.calendarYear,
                period: cashflow.period,
                netIncome: cashflow.netIncome,
                depreciationAndAmortization: cashflow.depreciationAndAmortization,
                deferredIncomeTax: cashflow.deferredIncomeTax,
                stockBasedCompensation: cashflow.stockBasedCompensation,
                changeInWorkingCapital: cashflow.changeInWorkingCapital,
                accountsReceivables: cashflow.accountsReceivables,
                inventory: cashflow.inventory,
                accountsPayables: cashflow.accountsPayables,
                otherWorkingCapital: cashflow.otherWorkingCapital,
                otherNonCashItems: cashflow.otherNonCashItems,
                netCashProvidedByOperatingActivities: cashflow.netCashProvidedByOperatingActivities,
                investmentsInPropertyPlantAndEquipment: cashflow.investmentsInPropertyPlantAndEquipment,
                acquisitionsNet: cashflow.acquisitionsNet,
                purchasesOfInvestments: cashflow.purchasesOfInvestments,
                salesMaturitiesOfInvestments: cashflow.salesMaturitiesOfInvestments,
                otherInvestingActivites: cashflow.otherInvestingActivites,
                netCashUsedForInvestingActivities: cashflow.netCashUsedForInvestingActivities,
                debtRepayment: cashflow.debtRepayment,
                commonStockIssued: cashflow.commonStockIssued,
                commonStockRepurchased: cashflow.commonStockRepurchased,
                dividendsPaid: cashflow.dividendsPaid,
                otherFinancingActivities: cashflow.otherFinancingActivities,
                netCashUsedProvidedByFinancingActivities: cashflow.netCashUsedProvidedByFinancingActivities,
                effectOfForexChangesOnCash: cashflow.effectOfForexChangesOnCash,
                netChangeInCash: cashflow.netChangeInCash,
                cashAtEndOfPeriod: cashflow.cashAtEndOfPeriod,
                cashAtBeginningOfPeriod: cashflow.cashAtBeginningOfPeriod,
                operatingCashFlow: cashflow.operatingCashFlow,
                capitalExpenditure: cashflow.capitalExpenditure,
                freeCashFlow: cashflow.freeCashFlow,
                link: cashflow.link,
                finalLink: cashflow.finalLink
              };
            } catch (error) {
              console.error('Error fetching cashflow statement:', error);
              return null;
            }
          },
          getRatios: async (_: unknown, { symbol }: { symbol: string }): Promise<Ratios | null> => {
            try {
              const response = await fetch(
                `https://financialmodelingprep.com/api/v3/ratios-ttm/${symbol}?apikey=${process.env.NEXT_PUBLIC_FINANCIAL_API_KEY}`
              );
          
              // Check for HTTP errors
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
          
              const data = await response.json();
          
              // Ensure data is not empty
              if (!data || !data[0]) {
                throw new Error(`No ratio data found for ${symbol}`);
              }
          
              const ratios = data[0]; // Assuming the API returns an array of ratios
          
              return {
                dividendYielTTM: ratios.dividendYielTTM,
                dividendYielPercentageTTM: ratios.dividendYielPercentageTTM,
                peRatioTTM: ratios.peRatioTTM,
                pegRatioTTM: ratios.pegRatioTTM,
                payoutRatioTTM: ratios.payoutRatioTTM,
                currentRatioTTM: ratios.currentRatioTTM,
                quickRatioTTM: ratios.quickRatioTTM,
                cashRatioTTM: ratios.cashRatioTTM,
                daysOfSalesOutstandingTTM: ratios.daysOfSalesOutstandingTTM,
                daysOfInventoryOutstandingTTM: ratios.daysOfInventoryOutstandingTTM,
                operatingCycleTTM: ratios.operatingCycleTTM,
                daysOfPayablesOutstandingTTM: ratios.daysOfPayablesOutstandingTTM,
                cashConversionCycleTTM: ratios.cashConversionCycleTTM,
                grossProfitMarginTTM: ratios.grossProfitMarginTTM,
                operatingProfitMarginTTM: ratios.operatingProfitMarginTTM,
                pretaxProfitMarginTTM: ratios.pretaxProfitMarginTTM,
                netProfitMarginTTM: ratios.netProfitMarginTTM,
                effectiveTaxRateTTM: ratios.effectiveTaxRateTTM,
                returnOnAssetsTTM: ratios.returnOnAssetsTTM,
                returnOnEquityTTM: ratios.returnOnEquityTTM,
                returnOnCapitalEmployedTTM: ratios.returnOnCapitalEmployedTTM,
                netIncomePerEBTTTM: ratios.netIncomePerEBTTTM,
                ebtPerEbitTTM: ratios.ebtPerEbitTTM,
                ebitPerRevenueTTM: ratios.ebitPerRevenueTTM,
                debtRatioTTM: ratios.debtRatioTTM,
                debtEquityRatioTTM: ratios.debtEquityRatioTTM,
                longTermDebtToCapitalizationTTM: ratios.longTermDebtToCapitalizationTTM,
                totalDebtToCapitalizationTTM: ratios.totalDebtToCapitalizationTTM,
                interestCoverageTTM: ratios.interestCoverageTTM,
                cashFlowToDebtRatioTTM: ratios.cashFlowToDebtRatioTTM,
                companyEquityMultiplierTTM: ratios.companyEquityMultiplierTTM,
                receivablesTurnoverTTM: ratios.receivablesTurnoverTTM,
                payablesTurnoverTTM: ratios.payablesTurnoverTTM,
                inventoryTurnoverTTM: ratios.inventoryTurnoverTTM,
                fixedAssetTurnoverTTM: ratios.fixedAssetTurnoverTTM,
                assetTurnoverTTM: ratios.assetTurnoverTTM,
                operatingCashFlowPerShareTTM: ratios.operatingCashFlowPerShareTTM,
                freeCashFlowPerShareTTM: ratios.freeCashFlowPerShareTTM,
                cashPerShareTTM: ratios.cashPerShareTTM,
                operatingCashFlowSalesRatioTTM: ratios.operatingCashFlowSalesRatioTTM,
                freeCashFlowOperatingCashFlowRatioTTM: ratios.freeCashFlowOperatingCashFlowRatioTTM,
                cashFlowCoverageRatiosTTM: ratios.cashFlowCoverageRatiosTTM,
                shortTermCoverageRatiosTTM: ratios.shortTermCoverageRatiosTTM,
                capitalExpenditureCoverageRatioTTM: ratios.capitalExpenditureCoverageRatioTTM,
                dividendPaidAndCapexCoverageRatioTTM: ratios.dividendPaidAndCapexCoverageRatioTTM,
                priceBookValueRatioTTM: ratios.priceBookValueRatioTTM,
                priceToBookRatioTTM: ratios.priceToBookRatioTTM,
                priceToSalesRatioTTM: ratios.priceToSalesRatioTTM,
                priceEarningsRatioTTM: ratios.priceEarningsRatioTTM,
                priceToFreeCashFlowsRatioTTM: ratios.priceToFreeCashFlowsRatioTTM,
                priceToOperatingCashFlowsRatioTTM: ratios.priceToOperatingCashFlowsRatioTTM,
                priceCashFlowRatioTTM: ratios.priceCashFlowRatioTTM,
                priceEarningsToGrowthRatioTTM: ratios.priceEarningsToGrowthRatioTTM,
                priceSalesRatioTTM: ratios.priceSalesRatioTTM,
                enterpriseValueMultipleTTM: ratios.enterpriseValueMultipleTTM,
                priceFairValueTTM: ratios.priceFairValueTTM,
                dividendPerShareTTM: ratios.dividendPerShareTTM,
              };
            } catch (error) {
              console.error('Error fetching ratios:', error);
              return null;
            }
          }     
    },
  };
  

// Create Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });
const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };
