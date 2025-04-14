import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { PriceHistory } from "@/constants";
import { StockInformation, typeDefs, IncomeStatement, BalanceSheet, CashflowStatement, Ratios } from "@/constants";

const resolvers = {
    Query: {
      getPriceHistory: async (_: unknown, { symbol }: { symbol: string }) => {
        if (!symbol) {
          throw new Error("Symbol is required");
        }
        const response = await fetch(
          `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=${process.env.NEXT_PUBLIC_FINANCIAL_API_KEY}`
        );
        const data = await response.json();
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
          getIncomeStatement: async (_: unknown, { symbol }: { symbol: string }): Promise<IncomeStatement[] | null> => {
            try {
              const response = await fetch(
                `https://financialmodelingprep.com/api/v3/income-statement/${symbol}?apikey=${process.env.NEXT_PUBLIC_FINANCIAL_API_KEY}`
              );
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              const data = await response.json();
              if (!Array.isArray(data) || data.length === 0) {
                throw new Error(`No income statement data found for ${symbol}`);
              }
              return data.map(stock => ({
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
                ebitdaRatio: stock.ebitdaRatio,
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
                finalLink: stock.finalLink,
              }));
            } catch (error) {
              console.error("Error fetching income statement:", error);
              return null;
            }
          },
          
          getBalanceSheet: async (_: unknown, { symbol }: { symbol: string }): Promise<BalanceSheet[]> => {
            try {
              const response = await fetch(
                `https://financialmodelingprep.com/api/v3/balance-sheet-statement/${symbol}?apikey=${process.env.NEXT_PUBLIC_FINANCIAL_API_KEY}`
              );
          
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
          
              const data = await response.json();
      
              if (!Array.isArray(data) || data.length === 0) {
                throw new Error(`No balance sheet data found for ${symbol}`);
              }
          
              return data.map((item) => ({
                date: item.date,
                symbol: item.symbol,
                reportedCurrency: item.reportedCurrency,
                cik: item.cik,
                fillingDate: item.fillingDate,
                acceptedDate: item.acceptedDate,
                calendarYear: item.calendarYear,
                period: item.period,
                cashAndCashEquivalents: item.cashAndCashEquivalents,
                shortTermInvestments: item.shortTermInvestments,
                cashAndShortTermInvestments: item.cashAndShortTermInvestments,
                netReceivables: item.netReceivables,
                inventory: item.inventory,
                otherCurrentAssets: item.otherCurrentAssets,
                totalCurrentAssets: item.totalCurrentAssets,
                propertyPlantEquipmentNet: item.propertyPlantEquipmentNet,
                goodwill: item.goodwill,
                intangibleAssets: item.intangibleAssets,
                goodwillAndIntangibleAssets: item.goodwillAndIntangibleAssets,
                longTermInvestments: item.longTermInvestments,
                taxAssets: item.taxAssets,
                otherNonCurrentAssets: item.otherNonCurrentAssets,
                totalNonCurrentAssets: item.totalNonCurrentAssets,
                otherAssets: item.otherAssets,
                totalAssets: item.totalAssets,
                accountPayables: item.accountPayables,
                shortTermDebt: item.shortTermDebt,
                taxPayables: item.taxPayables,
                deferredRevenue: item.deferredRevenue,
                otherCurrentLiabilities: item.otherCurrentLiabilities,
                totalCurrentLiabilities: item.totalCurrentLiabilities,
                longTermDebt: item.longTermDebt,
                deferredRevenueNonCurrent: item.deferredRevenueNonCurrent,
                deferredTaxLiabilitiesNonCurrent: item.deferredTaxLiabilitiesNonCurrent,
                otherNonCurrentLiabilities: item.otherNonCurrentLiabilities,
                totalNonCurrentLiabilities: item.totalNonCurrentLiabilities,
                otherLiabilities: item.otherLiabilities,
                capitalLeaseObligations: item.capitalLeaseObligations,
                totalLiabilities: item.totalLiabilities,
                preferredStock: item.preferredStock,
                commonStock: item.commonStock,
                retainedEarnings: item.retainedEarnings,
                accumulatedOtherComprehensiveIncomeLoss: item.accumulatedOtherComprehensiveIncomeLoss,
                othertotalStockholdersEquity: item.othertotalStockholdersEquity,
                totalStockholdersEquity: item.totalStockholdersEquity,
                totalEquity: item.totalEquity,
                totalLiabilitiesAndStockholdersEquity: item.totalLiabilitiesAndStockholdersEquity,
                minorityInterest: item.minorityInterest,
                totalLiabilitiesAndTotalEquity: item.totalLiabilitiesAndTotalEquity,
                totalInvestments: item.totalInvestments,
                totalDebt: item.totalDebt,
                netDebt: item.netDebt,
                link: item.link,
                finalLink: item.finalLink
              }));
            } catch (error) {
              console.error('Error fetching balance sheet:', error);
              return [];
            }
          },
          getCashflow: async (_: unknown, { symbol }: { symbol: string }): Promise<CashflowStatement[] | null> => {
            try {
              const response = await fetch(
                `https://financialmodelingprep.com/api/v3/cash-flow-statement/${symbol}?apikey=${process.env.NEXT_PUBLIC_FINANCIAL_API_KEY}`
              );
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              const data = await response.json();
          
              if (!Array.isArray(data) || data.length === 0) {
                throw new Error(`No cashflow data found for ${symbol}`);
              }
              return data.map(entry => ({
                date: entry.date,
                symbol: entry.symbol,
                reportedCurrency: entry.reportedCurrency,
                cik: entry.cik,
                fillingDate: entry.fillingDate,
                acceptedDate: entry.acceptedDate,
                calendarYear: entry.calendarYear,
                period: entry.period,
                netIncome: entry.netIncome,
                depreciationAndAmortization: entry.depreciationAndAmortization,
                deferredIncomeTax: entry.deferredIncomeTax,
                stockBasedCompensation: entry.stockBasedCompensation,
                changeInWorkingCapital: entry.changeInWorkingCapital,
                accountsReceivables: entry.accountsReceivables,
                inventory: entry.inventory,
                accountsPayables: entry.accountsPayables,
                otherWorkingCapital: entry.otherWorkingCapital,
                otherNonCashItems: entry.otherNonCashItems,
                netCashProvidedByOperatingActivities: entry.netCashProvidedByOperatingActivities,
                investmentsInPropertyPlantAndEquipment: entry.investmentsInPropertyPlantAndEquipment,
                acquisitionsNet: entry.acquisitionsNet,
                purchasesOfInvestments: entry.purchasesOfInvestments,
                salesMaturitiesOfInvestments: entry.salesMaturitiesOfInvestments,
                otherInvestingActivites: entry.otherInvestingActivites,
                netCashUsedForInvestingActivites: entry.netCashUsedForInvestingActivites,
                debtRepayment: entry.debtRepayment,
                commonStockIssued: entry.commonStockIssued,
                commonStockRepurchased: entry.commonStockRepurchased,
                dividendsPaid: entry.dividendsPaid,
                otherFinancingActivites: entry.otherFinancingActivites,
                netCashUsedProvidedByFinancingActivities: entry.netCashUsedProvidedByFinancingActivities,
                effectOfForexChangesOnCash: entry.effectOfForexChangesOnCash,
                netChangeInCash: entry.netChangeInCash,
                cashAtEndOfPeriod: entry.cashAtEndOfPeriod,
                cashAtBeginningOfPeriod: entry.cashAtBeginningOfPeriod,
                operatingCashFlow: entry.operatingCashFlow,
                capitalExpenditure: entry.capitalExpenditure,
                freeCashFlow: entry.freeCashFlow,
                link: entry.link,
                finalLink: entry.finalLink
              }));
            } catch (error) {
              console.error("Error fetching cashflow statement:", error);
              return null;
            }
          },
          
          getRatios: async (_: unknown, { symbol }: { symbol: string }): Promise<Ratios[] | null> => {
            try {
              const response = await fetch(
                `https://financialmodelingprep.com/api/v3/ratios/${symbol}?apikey=${process.env.NEXT_PUBLIC_FINANCIAL_API_KEY}`
              );
          
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
          
              const data = await response.json();
          
              if (!Array.isArray(data) || data.length === 0) {
                throw new Error(`No cashflow data found for ${symbol}`);
              }
          
              return data.map(item => ({
                date: item.date,
                calendarYear: item.calendarYear,
                period: item.period,
                currentRatio: item.currentRatio,
                quickRatio: item.quickRatio,
                cashRatio: item.cashRatio,
                daysOfSalesOutstanding: item.daysOfSalesOutstanding,
                daysOfInventoryOutstanding: item.daysOfInventoryOutstanding,
                operatingCycle: item.operatingCycle,
                daysOfPayablesOutstanding: item.daysOfPayablesOutstanding,
                cashConversionCycle: item.cashConversionCycle,
                grossProfitMargin: item.grossProfitMargin,
                operatingProfitMargin: item.operatingProfitMargin,
                pretaxProfitMargin: item.pretaxProfitMargin,
                netProfitMargin: item.netProfitMargin,
                effectiveTaxRate: item.effectiveTaxRate,
                returnOnAssets: item.returnOnAssets,
                returnOnEquity: item.returnOnEquity,
                returnOnCapitalEmployed: item.returnOnCapitalEmployed,
                netIncomePerEBT: item.netIncomePerEBT,
                ebtPerEbit: item.ebtPerEbit,
                ebitPerRevenue: item.ebitPerRevenue,
                debtRatio: item.debtRatio,
                debtEquityRatio: item.debtEquityRatio,
                longTermDebtToCapitalization: item.longTermDebtToCapitalization,
                totalDebtToCapitalization: item.totalDebtToCapitalization,
                interestCoverage: item.interestCoverage,
                cashFlowToDebtRatio: item.cashFlowToDebtRatio,
                companyEquityMultiplier: item.companyEquityMultiplier,
                receivablesTurnover: item.receivablesTurnover,
                payablesTurnover: item.payablesTurnover,
                inventoryTurnover: item.inventoryTurnover,
                fixedAssetTurnover: item.fixedAssetTurnover,
                assetTurnover: item.assetTurnover,
                operatingCashFlowPerShare: item.operatingCashFlowPerShare,
                freeCashFlowPerShare: item.freeCashFlowPerShare,
                cashPerShare: item.cashPerShare,
                payoutRatio: item.payoutRatio,
                operatingCashFlowSalesRatio: item.operatingCashFlowSalesRatio,
                freeCashFlowOperatingCashFlowRatio: item.freeCashFlowOperatingCashFlowRatio,
                cashFlowCoverageRatios: item.cashFlowCoverageRatios,
                shortTermCoverageRatios: item.shortTermCoverageRatios,
                capitalExpenditureCoverageRatio: item.capitalExpenditureCoverageRatio,
                dividendPaidAndCapexCoverageRatio: item.dividendPaidAndCapexCoverageRatio,
                dividendPayoutRatio: item.dividendPayoutRatio,
                priceBookValueRatio: item.priceBookValueRatio,
                priceToBookRatio: item.priceToBookRatio,
                priceToSalesRatio: item.priceToSalesRatio,
                priceEarningsRatio: item.priceEarningsRatio,
                priceToFreeCashFlowsRatio: item.priceToFreeCashFlowsRatio,
                priceToOperatingCashFlowsRatio: item.priceToOperatingCashFlowsRatio,
                priceCashFlowRatio: item.priceCashFlowRatio,
                priceEarningsToGrowthRatio: item.priceEarningsToGrowthRatio,
                priceSalesRatio: item.priceSalesRatio,
                dividendYield: item.dividendYield,
                enterpriseValueMultiple: item.enterpriseValueMultiple,
                priceFairValue: item.priceFairValue
              }));
            } catch (error) {
              console.error('Error fetching ratios:', error);
              return null;
            }
          }
            
    },
  };
  

const server = new ApolloServer({ typeDefs, resolvers });
const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };
