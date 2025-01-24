import { messages } from "@/utils/messages";
import { useCallback, useEffect, useState } from "react";
import { useToast } from "./useToast";
import axios from "axios";
import { useList } from ".";

const useTransaction = () => {
    const { transactions, setTransactions, setCurrentMonthTransactions } = useList();

    const { toastInfo, toastError } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    useEffect(() => {
        if (isSaved) {
            console.log('***is saved', messages.saved);
            toastInfo(messages.saved);
            setIsSaved(false);
        }
        if (isDeleted) {
            toastInfo(messages.deleted);
            setIsDeleted(false);
        }
    }, [isDeleted, isSaved, toastInfo]);

    const getCurrentMonthTransactions = useCallback(() => {
        setIsLoading(true);
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/transactions/currentMonth`)
            .then(({ data }) => setCurrentMonthTransactions(data?.data ?? []))
            .catch(error => toastError(error?.data?.message))
            .finally(() => setIsLoading(false))
    }, [setCurrentMonthTransactions, toastError])

    const getTransactions = useCallback(() => {
        setIsLoading(true);
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/transactions`)
            .then(({ data }) => setTransactions(data?.data ?? []))
            .catch(error => toastError(error?.data?.message))
            .finally(() => setIsLoading(false))
    }, [setTransactions, toastError])

    const createTransaction = useCallback(preparedData => {
        setIsLoading(true);
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/transactions`, preparedData)
            .then(({ data }) => {
                setTransactions([...transactions, data?.data])
                setIsSaved(true);
            })
            .catch(error => toastError(error?.data?.message))
            .finally(() => setIsLoading(false))
    }, [setTransactions, toastError, transactions])

    const updateTransaction = useCallback(preparedData => {
        setIsLoading(true);
        axios.put(`${process.env.NEXT_PUBLIC_BACKEND}/transactions/${preparedData?._id}`, preparedData)
            .then(({ data }) => {
                const index = transactions.findIndex(i => i._id === preparedData?._id)
                if (index > -1) {
                    const result = [...transactions];
                    result[index] = data?.data;
                    setTransactions(result);
                }
                setIsSaved(true);
            })
            .catch(error => toastError(error?.data?.message))
            .finally(() => setIsLoading(false))
    }, [setTransactions, toastError, transactions])

    const deleteTransaction = useCallback(id => {
        setIsLoading(true);
        axios.delete(`${process.env.NEXT_PUBLIC_BACKEND}/transactions/${id}`)
            .then(({ data }) => {
                setTransactions(transactions.filter(i => i?._id !== id))
                setIsDeleted(true);
            })
            .catch(error => toastError(error?.data?.message))
            .finally(() => setIsLoading(false))
    }, [setTransactions, toastError, transactions])


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
