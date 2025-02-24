import { messages } from "@/utils/messages";
import { useCallback, useState } from "react";
import { useToast } from "./useToast";
import axios from "axios";
import { useList } from ".";
import axiosInstance from "@/utils/AxiosInterceptor";

const useTransaction = () => {
    const { transactions, setTransactions, setCurrentMonthTransactions } = useList();

    const { toastInfo } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const getCurrentMonthTransactions = useCallback(() => {
        setIsLoading(true);
        axiosInstance.get(`/transactions/currentMonth`)
            .then(({ data }) => setCurrentMonthTransactions(data?.data ?? []))
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [setCurrentMonthTransactions])

    const getTransactions = useCallback(() => {
        setIsLoading(true);
        axiosInstance.get(`/transactions`)
            .then(({ data }) => setTransactions(data?.data ?? []))
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [setTransactions])

    const createTransaction = useCallback(preparedData => {
        setIsLoading(true);
        axiosInstance.post(`/transactions`, preparedData)
            .then(({ data }) => {
                setTransactions([...transactions, data?.data])
                toastInfo(messages.saved);
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [setTransactions, toastInfo, transactions])

    const updateTransaction = useCallback(preparedData => {
        setIsLoading(true);
        axiosInstance.put(`/transactions/${preparedData?._id}`, preparedData)
            .then(({ data }) => {
                const index = transactions.findIndex(i => i._id === preparedData?._id)
                if (index > -1) {
                    const result = [...transactions];
                    result[index] = data?.data;
                    setTransactions(result);
                }
                toastInfo(messages.saved);
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [setTransactions, toastInfo, transactions])

    const deleteTransaction = useCallback(id => {
        setIsLoading(true);
        axiosInstance.delete(`/transactions/${id}`)
            .then(({ data }) => {
                setTransactions(transactions.filter(i => i?._id !== id))
                toastInfo(messages.deleted);
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [setTransactions, toastInfo, transactions])


    return {
        isLoading,
        setIsLoading,
        getCurrentMonthTransactions,
        getTransactions,
        createTransaction,
        updateTransaction,
        deleteTransaction
    }
}

export default useTransaction
