// ** React Imports
import { useDashboard, useTransaction } from "@/hooks";
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
  recurrentTransactions: [],
  setRecurrentTransactions: () => [],
  getRecurrentTransactions: () => Promise.resolve(),
  createRecurrentTransaction: () => Promise.resolve(),
  updateRecurrentTransaction: () => Promise.resolve(),
  deleteRecurrentTransaction: () => Promise.resolve(),
  runTransactions: () => Promise.resolve()
};
const RecurrentTransactionContext = createContext(defaultProvider);

const RecurrentTransactionProvider = ({ children }) => {
  const { toastInfo, toastError } = useToast();
  const { getTransactions } = useTransaction();
  const { setBalance } = useDashboard();
  const [isLoading, setIsLoading] = useState(defaultProvider.isLoading);
  const [isSaved, setIsSaved] = useState(defaultProvider.isSaved);
  const [isDeleted, setIsDeleted] = useState(defaultProvider.isDeleted);
  const [recurrentTransactions, setRecurrentTransactions] = useState(defaultProvider.recurrentTransactions);

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

  const getRecurrentTransactions = useCallback(() => {
    setIsLoading(true);
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/recurrent-transactions`)
      .then(({ data }) => setRecurrentTransactions(data?.data ?? []))
      .catch(error => toastError(error?.data?.message))
      .finally(() => setIsLoading(false))
  }, [toastError])

  const runTransactions = useCallback(() => {
    setIsLoading(true);
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/recurrent-transactions/runRecurrence`)
      .then(({ data }) => {
        getTransactions();
        setBalance(data?.balance);
      })
      .catch(error => toastError(error?.data?.message))
      .finally(() => setIsLoading(false))
  }, [getTransactions, setBalance, toastError])

  const createRecurrentTransaction = useCallback(preparedData => {
    setIsLoading(true);
    axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/recurrent-transactions`, preparedData)
      .then(({ data }) => {
        console.log('***submit', data?.data)
        setRecurrentTransactions([...recurrentTransactions, data?.data])
      })
      .catch(error => toastError(error?.data?.message))
      .finally(() => setIsLoading(false))
  }, [toastError, recurrentTransactions])

  const updateRecurrentTransaction = useCallback(preparedData => {
    setIsLoading(true);
    axios.put(`${process.env.NEXT_PUBLIC_BACKEND}/recurrent-transactions/${preparedData?._id}`, preparedData)
      .then(({ data }) => {
        console.log('***submit', data?.data)
        const index = recurrentTransactions.findIndex(i => i._id === preparedData?._id)
        const result = [...recurrentTransactions];
        result[index] = data?.data;
        setRecurrentTransactions(result);
      })
      .catch(error => toastError(error?.data?.message))
      .finally(() => setIsLoading(false))
  }, [toastError, recurrentTransactions])

  const deleteRecurrentTransaction = useCallback(id => {
    setIsLoading(true);
    axios.delete(`${process.env.NEXT_PUBLIC_BACKEND}/recurrent-transactions/${id}`)
      .then(({ data }) => {
        console.log('***delete', data?.id)
        setRecurrentTransactions(recurrentTransactions.filter(i => i?._id !== id))
      })
      .catch(error => toastError(error?.data?.message))
      .finally(() => setIsLoading(false))
  }, [toastError, recurrentTransactions])

  const values = {
    isLoading,
    setIsLoading,
    recurrentTransactions,
    setRecurrentTransactions,
    getRecurrentTransactions,
    createRecurrentTransaction,
    updateRecurrentTransaction,
    deleteRecurrentTransaction,
    runTransactions
  };

  return (
    <RecurrentTransactionContext.Provider value={values}>{children}</RecurrentTransactionContext.Provider>
  );
};

export { RecurrentTransactionContext, RecurrentTransactionProvider };
