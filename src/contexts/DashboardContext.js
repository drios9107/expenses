// ** React Imports
import { useToast } from "@/hooks/useToast";
import axios from "axios";
import { createContext, useCallback, useState } from "react";

const defaultProvider = {
  balance: 0,
  setBalance: () => Number,
  lastIncome: 0,
  setLastIncome: () => Number,
  lastIncomeDate: 0,
  setLastIncomeDate: () => Number,
  getBalanceData: () => Number,
  isLoading: false,
  categoryLabels: [],
  setCategoryLabels: () => [],
  categoryValues: [],
  setCategoryValues: () => [],

  subCategoryLabels: [],
  setSubCategoryLabels: () => [],
  subCategoryValues: [],
  setSubCategoryValues: () => [],

  setIsLoading: () => Boolean,
  getDashboard: () => { }
};
const DashboardContext = createContext(defaultProvider);

const DashboardProvider = ({ children }) => {
  const { toastInfo, toastError } = useToast();
  const [isLoading, setIsLoading] = useState(defaultProvider.isLoading);
  const [categoryLabels, setCategoryLabels] = useState(defaultProvider.categoryLabels);
  const [categoryValues, setCategoryValues] = useState(defaultProvider.categoryValues);
  const [subCategoryLabels, setSubCategoryLabels] = useState(defaultProvider.subCategoryLabels);
  const [subCategoryValues, setSubCategoryValues] = useState(defaultProvider.subCategoryValues);
  const [balance, setBalance] = useState(defaultProvider.balance);
  const [lastIncome, setLastIncome] = useState(defaultProvider.lastIncome);
  const [lastIncomeDate, setLastIncomeDate] = useState(defaultProvider.lastIncomeDate);

  const getDashboard = useCallback(params => {
    setIsLoading(true);
    axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/dashboard`, params)
      .then(({ data }) => {
        // console.log('****data', data?.data)
        setCategoryLabels(data?.categoryData?.labels);
        setCategoryValues(data?.categoryData?.values);

        setSubCategoryLabels(data?.subCategoryData?.labels);
        setSubCategoryValues(data?.subCategoryData?.values);
      })
      .catch(error => toastError(error?.data?.message))
      .finally(() => setIsLoading(false))
  }, [toastError])

  const getBalanceData = useCallback(() => {
    setIsLoading(true);
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/balance`)
      .then(({ data }) => {
        setBalance(data?.balance)
        if (data?.lastIncome)
          setLastIncome(data.lastIncome)
        if (data?.lastIncomeDate)
          setLastIncomeDate(data.lastIncomeDate)
      })
      .catch(error => toastError(error?.data?.message))
      .finally(() => setIsLoading(false))
  }, [toastError])

  const values = {
    balance,
    setBalance,
    lastIncome,
    lastIncomeDate,
    getBalanceData,
    isLoading,
    setIsLoading,
    getDashboard,

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
