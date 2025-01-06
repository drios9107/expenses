import { messages } from "@/utils/messages";
import { useCallback, useEffect, useState } from "react";
import { useToast } from "./useToast";
import axios from "axios";
import useTransaction from "./useTransaction";
import { useDashboardContext, useList } from ".";

const useRecurrentTransaction = () => {
    const { recurrentTransactions, setRecurrentTransactions } = useList();
    const { getTransactions } = useTransaction();
    const { setBalance } = useDashboardContext();

    const { toastInfo, toastError } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

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
    }, [setRecurrentTransactions, toastError])

    const runTransactions = useCallback(() => {
        setIsLoading(true);
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/recurrent-transactions/runRecurrence`)
            .then(({ data }) => {
                getTransactions();
                setBalance(data?.balance);
                toastInfo(messages.finishedRecurrence)
            })
            .catch(error => toastError(error?.data?.message))
            .finally(() => setIsLoading(false))
    }, [getTransactions, setBalance, toastError, toastInfo])

    const createRecurrentTransaction = useCallback(preparedData => {
        setIsLoading(true);
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/recurrent-transactions`, preparedData)
            .then(({ data }) => {
                setRecurrentTransactions([...recurrentTransactions, data?.data])
                setIsSaved(true);
            })
            .catch(error => toastError(error?.data?.message))
            .finally(() => setIsLoading(false))
    }, [setRecurrentTransactions, recurrentTransactions, toastError])

    const updateRecurrentTransaction = useCallback(preparedData => {
        setIsLoading(true);
        axios.put(`${process.env.NEXT_PUBLIC_BACKEND}/recurrent-transactions/${preparedData?._id}`, preparedData)
            .then(({ data }) => {
                const index = recurrentTransactions.findIndex(i => i._id === preparedData?._id)
                const result = [...recurrentTransactions];
                result[index] = data?.data;
                setRecurrentTransactions(result);
                setIsSaved(true);
            })
            .catch(error => toastError(error?.data?.message))
            .finally(() => setIsLoading(false))
    }, [recurrentTransactions, setRecurrentTransactions, toastError])

    const deleteRecurrentTransaction = useCallback(id => {
        setIsLoading(true);
        axios.delete(`${process.env.NEXT_PUBLIC_BACKEND}/recurrent-transactions/${id}`)
            .then(({ data }) => {
                setRecurrentTransactions(recurrentTransactions.filter(i => i?._id !== id))
                setIsDeleted(true);
            })
            .catch(error => toastError(error?.data?.message))
            .finally(() => setIsLoading(false))
    }, [setRecurrentTransactions, recurrentTransactions, toastError])


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
