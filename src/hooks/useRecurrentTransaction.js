import { messages } from "@/utils/messages";
import { useCallback, useState } from "react";
import { useToast } from "./useToast";
import axios from "axios";
import useTransaction from "./useTransaction";
import { useDashboardContext, useList } from ".";
import axiosInstance from "@/utils/AxiosInterceptor";

const useRecurrentTransaction = () => {
    const { recurrentTransactions, setRecurrentTransactions } = useList();
    const { getTransactions } = useTransaction();
    const { setBalance, setBalanceMLC, setBalanceUSD, setBalanceUSDT } = useDashboardContext();

    const { toastInfo } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const getRecurrentTransactions = useCallback(() => {
        setIsLoading(true);
        axiosInstance.get(`/recurrent-transactions`)
            .then(({ data }) => setRecurrentTransactions(data?.data ?? []))
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [setRecurrentTransactions])

    const runTransactions = useCallback(() => {
        setIsLoading(true);
        axiosInstance.get(`/recurrent-transactions/runRecurrence`)
            .then(({ data }) => {
                getTransactions();
                if (data?.balance)
                    setBalance(data?.balance);
                if (data?.balanceMLC)
                    setBalanceMLC(data?.balanceMLC)
                if (data?.balanceUSD)
                    setBalanceUSD(data?.balanceUSD)
                if (data?.balanceUSDT)
                    setBalanceUSDT(data?.balanceUSDT)
                toastInfo(messages.finishedRecurrence)
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [getTransactions, setBalance, setBalanceMLC, setBalanceUSD, setBalanceUSDT, toastInfo])

    const createRecurrentTransaction = useCallback(preparedData => {
        setIsLoading(true);
        axiosInstance.post(`/recurrent-transactions`, preparedData)
            .then(({ data }) => {
                setRecurrentTransactions([...recurrentTransactions, data?.data])
                toastInfo(messages.saved);
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [setRecurrentTransactions, recurrentTransactions, toastInfo])

    const updateRecurrentTransaction = useCallback(preparedData => {
        setIsLoading(true);
        axiosInstance.put(`/recurrent-transactions/${preparedData?._id}`, preparedData)
            .then(({ data }) => {
                const index = recurrentTransactions.findIndex(i => i._id === preparedData?._id)
                const result = [...recurrentTransactions];
                result[index] = data?.data;
                setRecurrentTransactions(result);
                toastInfo(messages.saved);
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [recurrentTransactions, setRecurrentTransactions, toastInfo])

    const deleteRecurrentTransaction = useCallback(id => {
        setIsLoading(true);
        axiosInstance.delete(`/recurrent-transactions/${id}`)
            .then(({ data }) => {
                setRecurrentTransactions(recurrentTransactions.filter(i => i?._id !== id))
                toastInfo(messages.deleted);
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [setRecurrentTransactions, recurrentTransactions, toastInfo])


    return {
        isLoading,
        setIsLoading,
        getRecurrentTransactions,
        createRecurrentTransaction,
        updateRecurrentTransaction,
        deleteRecurrentTransaction,
        runTransactions
    }
}

export default useRecurrentTransaction
