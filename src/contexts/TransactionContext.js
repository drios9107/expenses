// ** React Imports
import { useToast } from "@/hooks/useToast";
import { messages } from "@/utils/messages";
import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";

const defaultProvider = {
  isLoading: false,
  setIsLoading: () => Boolean,
  isSaved: false,
  setIsSaved: () => Boolean,
  isDeleted: false,
  setIsDeleted: () => Boolean,
  transactions: [],
  setTransactions: () => [],
  getTransactions: () => Promise.resolve(),
  createTransaction: () => Promise.resolve(),
  updateTransaction: () => Promise.resolve(),
  deleteTransaction: () => Promise.resolve(),
};
const TransactionContext = createContext(defaultProvider);

const TransactionProvider = ({ children }) => {
  const { toastInfo, toastError } = useToast();
  const [isLoading, setIsLoading] = useState(defaultProvider.isLoading);
  const [isSaved, setIsSaved] = useState(defaultProvider.isSaved);
  const [isDeleted, setIsDeleted] = useState(defaultProvider.isDeleted);
  const [transactions, setTransactions] = useState(defaultProvider.transactions);

  useEffect(() => {
    if (isSaved) {
      toastInfo(messages.saved);
      setIsSaved(false);
    }
    if (isDeleted) {
      toastInfo(messages.deleted);
      setIsDeleted(false);
    }
  }, [isDeleted, isSaved, toastInfo]);

  const getTransactions = useCallback(() => {
    setIsLoading(true);
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/transactions`)
      .then(({ data }) => setTransactions(data?.data ?? []))
      .catch(error => toastError(error?.data?.message))
      .finally(() => setIsLoading(false))
  }, [toastError])

  const createTransaction = useCallback(preparedData => {
    setIsLoading(true);
    axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/transactions`, preparedData)
      .then(({ data }) => {
        setTransactions([...transactions, data?.data])
        setIsSaved(true);
      })
      .catch(error => toastError(error?.data?.message))
      .finally(() => setIsLoading(false))
  }, [toastError, transactions])

  const updateTransaction = useCallback(preparedData => {
    setIsLoading(true);
    axios.put(`${process.env.NEXT_PUBLIC_BACKEND}/transactions/${preparedData?._id}`, preparedData)
      .then(({ data }) => {
        const index = transactions.findIndex(i => i._id === preparedData?._id)
        const result = [...transactions];
        result[index] = data?.data;
        setTransactions(result);
        setIsSaved(true);
      })
      .catch(error => toastError(error?.data?.message))
      .finally(() => setIsLoading(false))
  }, [toastError, transactions])

  const deleteTransaction = useCallback(id => {
    setIsLoading(true);
    axios.delete(`${process.env.NEXT_PUBLIC_BACKEND}/transactions/${id}`)
      .then(({ data }) => {
        setTransactions(transactions.filter(i => i?._id !== id))
        setIsDeleted(true);
      })
      .catch(error => toastError(error?.data?.message))
      .finally(() => setIsLoading(false))
  }, [toastError, transactions])

  const values = {
    isLoading,
    setIsLoading,
    transactions,
    setTransactions,
    getTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction
  };

  return (
    <TransactionContext.Provider value={values}>{children}</TransactionContext.Provider>
  );
};

export { TransactionContext, TransactionProvider };
