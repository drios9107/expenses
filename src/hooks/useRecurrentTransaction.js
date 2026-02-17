import { messages } from "@/utils/messages";
import { useCallback, useState } from "react";
import { useToast } from "./useToast";
import useTransaction from "./useTransaction";
import { useDashboardContext, useList } from ".";
import axiosInstance from "@/utils/AxiosInterceptor";
import GetStorage from "@/utils/GetStorage";
import moment from "moment";
import { useRouter } from "next/navigation";
import useCrud from "./useCrud";

const model = 'recurrent-transactions'

const useRecurrentTransaction = () => {
    const { setRecurrentTransactions, setCategories, setSubCategories } = useList();
    const { getAll, createItem, updateItem, deleteItem } = useCrud();

    const { getTransactions } = useTransaction();
    const { setInStorage } = GetStorage();
    const { setBalance, setBalanceMLC, setBalanceUSD, setBalanceUSDT } = useDashboardContext();
    const router = useRouter();

    const { toastInfo } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const runTransactions = useCallback(async () => {
        setIsLoading(true);
        return axiosInstance.get(`/${model}/runRecurrence`)
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

                setInStorage('lastRecurrenceDate', moment().valueOf());
                toastInfo(messages.finishedRecurrence);
                router.refresh()
                return true;
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [getTransactions, router, setBalance, setBalanceMLC, setBalanceUSD, setBalanceUSDT, setInStorage, toastInfo])

    const updateCategoryAndSubcategory = useCallback((preparedData) => {
        if (preparedData?.newCategory)
            setCategories(previous => [...previous, preparedData?.newCategory]);
        if (preparedData?.newSubCategory)
            setSubCategories(previous => [...previous, { ...preparedData?.newSubCategory, category: preparedData?.newCategory?._id }]);
    }, [setCategories, setSubCategories])

    const getRecurrentTransactions = useCallback(async () => {
        await getAll(model, setRecurrentTransactions, setIsLoading)
            .catch(() => { })
    }, [getAll, setRecurrentTransactions, setIsLoading])

    const createRecurrentTransaction = useCallback(async preparedData => {
        return createItem(model, preparedData, setIsLoading, getRecurrentTransactions)
            .then(res => {
                updateCategoryAndSubcategory(preparedData)
                return true
            })
            .catch(() => { })
    }, [createItem, getRecurrentTransactions, updateCategoryAndSubcategory])

    const updateRecurrentTransaction = useCallback(async preparedData => {
        return updateItem(model, preparedData, setIsLoading, getRecurrentTransactions)
            .then(res => {
                updateCategoryAndSubcategory(preparedData)
                return true
            })
            .catch(() => { })
    }, [updateItem, getRecurrentTransactions, updateCategoryAndSubcategory])

    const deleteRecurrentTransaction = useCallback(async id => {
        return deleteItem(model, id, setIsLoading, getRecurrentTransactions)
            .catch(() => { })
    }, [deleteItem, setIsLoading, getRecurrentTransactions])

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
