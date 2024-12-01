// ** React Imports
import { useToast } from "@/hooks/useToast";
import axios from "axios";
import { createContext, useCallback, useState } from "react";

const defaultProvider = {
  balance: 0,
  setBalance: () => Number,
  getBalance: () => Number,
  isLoading: false,
  labels: [],
  setLabels: () => [],
  dataset1: [],
  setDataset1: () => [],
  setIsLoading: () => Boolean,
  getDashboard: () => { }
};
const DashboardContext = createContext(defaultProvider);

const DashboardProvider = ({ children }) => {
  const { toastInfo, toastError } = useToast();
  const [isLoading, setIsLoading] = useState(defaultProvider.isLoading);
  const [labels, setLabels] = useState(defaultProvider.labels);
  const [dataset1, setDataset1] = useState(defaultProvider.dataset1);
  const [balance, setBalance] = useState(defaultProvider.balance);

  const getDashboard = useCallback(params => {
    setIsLoading(true);
    axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/dashboard`, params)
      .then(({ data }) => {
        // console.log('****data', data?.data)
        setLabels(data?.data?.labels);
        setDataset1(data?.data?.values);
      })
      .catch(error => toastError(error?.data?.message))
      .finally(() => setIsLoading(false))
  }, [toastError])

  const getBalance = useCallback(() => {
    setIsLoading(true);
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/balance`)
      .then(({ data }) => setBalance(data?.data))
      .catch(error => toastError(error?.data?.message))
      .finally(() => setIsLoading(false))
  }, [toastError])

  const values = {
    balance,
    setBalance,
    getBalance,
    isLoading,
    setIsLoading,
    getDashboard,
    labels,
    setLabels,
    dataset1,
    setDataset1,
  };

  return (
    <DashboardContext.Provider value={values}>{children}</DashboardContext.Provider>
  );
};

export { DashboardContext, DashboardProvider };
