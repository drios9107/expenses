import { createContext, useState } from "react";

const defaultProvider = {
  balance: 0,
  balanceMLC: 0,
  setBalanceMLC: () => Number,
  balanceUSD: 0,
  setBalanceUSD: () => Number,
  balanceUSDT: 0,
  setBalanceUSDT: () => Number,
  setBalance: () => Number,
  monthExpenses: 0,
  setMonthExpenses: () => Number,
  lastIncome: 0,
  setLastIncome: () => Number,
  lastIncomeDate: 0,
  setLastIncomeDate: () => Number,
  categoryLabels: [],
  setCategoryLabels: () => [],
  categoryValues: [],
  setCategoryValues: () => [],

  subCategoryLabels: [],
  setSubCategoryLabels: () => [],
  subCategoryValues: [],
  setSubCategoryValues: () => [],
};
const DashboardContext = createContext(defaultProvider);

const DashboardProvider = ({ children }) => {
  const [categoryLabels, setCategoryLabels] = useState(defaultProvider.categoryLabels);
  const [categoryValues, setCategoryValues] = useState(defaultProvider.categoryValues);
  const [subCategoryLabels, setSubCategoryLabels] = useState(defaultProvider.subCategoryLabels);
  const [subCategoryValues, setSubCategoryValues] = useState(defaultProvider.subCategoryValues);
  const [balance, setBalance] = useState(defaultProvider.balance);
  const [balanceMLC, setBalanceMLC] = useState(defaultProvider.balanceMLC);
  const [balanceUSD, setBalanceUSD] = useState(defaultProvider.balanceUSD);
  const [balanceUSDT, setBalanceUSDT] = useState(defaultProvider.balanceUSDT);
  const [lastIncome, setLastIncome] = useState(defaultProvider.lastIncome);
  const [lastIncomeDate, setLastIncomeDate] = useState(defaultProvider.lastIncomeDate);
  const [monthExpenses, setMonthExpenses] = useState(defaultProvider.monthExpenses);

  const values = {
    balance,
    setBalance,
    balanceMLC,
    setBalanceMLC,
    balanceUSD,
    setBalanceUSD,
    balanceUSDT,
    setBalanceUSDT,
    monthExpenses,
    setMonthExpenses,
    lastIncome,
    setLastIncome,
    lastIncomeDate,
    setLastIncomeDate,

    categoryLabels,
    setCategoryLabels,
    categoryValues,
    setCategoryValues,

    subCategoryLabels,
    setSubCategoryLabels,
    subCategoryValues,
    setSubCategoryValues,
  };

  return (
    <DashboardContext.Provider value={values}>{children}</DashboardContext.Provider>
  );
};

export { DashboardContext, DashboardProvider };
