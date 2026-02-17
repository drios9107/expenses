import { useCallback, useState } from "react";
import { useList } from ".";
import axiosInstance from "@/utils/AxiosInterceptor";
import useCrud from "./useCrud";

const model = 'transactions'

const useTransaction = () => {
    const { setTransactions, setCurrentMonthTransactions, setCategories, setSubCategories } = useList();
    const { getAll, createItem, updateItem, deleteItem } = useCrud();

    const [isLoading, setIsLoading] = useState(false);

    const getCurrentMonthTransactions = useCallback(() => {
        setIsLoading(true);
        axiosInstance.get(`/${model}/currentMonth`)
            .then(({ data }) => setCurrentMonthTransactions(data?.data ?? []))
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [setCurrentMonthTransactions])

    const getTransactionsByCategory = useCallback(async (categoryName, currentMonth, currentYear) => {
        setIsLoading(true);
        return axiosInstance.get(`/${model}/by-category-in-period/${encodeURIComponent(categoryName)}/${encodeURIComponent(currentMonth)}/${currentYear}`)
            .then(({ data }) => data?.data ?? [])
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [])

    const getTransactionsByCategoryAndSubCategory = useCallback(async (categoryName, subCategoryName, currentMonth, currentYear) => {
        setIsLoading(true);
        return axiosInstance.get(`/${model}/by-category-and-subcategory-in-period/${encodeURIComponent(categoryName)}/${encodeURIComponent(subCategoryName)}/${currentMonth}/${currentYear}`)
            .then(({ data }) => data?.data ?? [])
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [])

    const updateCategoryAndSubcategory = useCallback((preparedData) => {
        if (preparedData?.newCategory)
            setCategories(previous => [...previous, preparedData?.newCategory]);
        if (preparedData?.newSubCategory)
            setSubCategories(previous => [...previous, { ...preparedData?.newSubCategory, category: preparedData?.newCategory?._id }]);
    }, [setCategories, setSubCategories])

    const getTransactions = useCallback(async () => {
        await getAll(model, setTransactions, setIsLoading)
            .catch(() => { })
    }, [getAll, setTransactions, setIsLoading])

    const createTransaction = useCallback(async preparedData => {
        return createItem(model, preparedData, setIsLoading, getTransactions)
            .then(res => {
                updateCategoryAndSubcategory(preparedData)
                return true
            })
            .catch(() => { })
    }, [createItem, getTransactions, updateCategoryAndSubcategory])

    const updateTransaction = useCallback(async preparedData => {
        return updateItem(model, preparedData, setIsLoading, getTransactions)
            .then(res => {
                updateCategoryAndSubcategory(preparedData)
                return true
            })
            .catch(() => { })
    }, [updateItem, getTransactions, updateCategoryAndSubcategory])

    const deleteTransaction = useCallback(async id => {
        return deleteItem(model, id, setIsLoading, getTransactions)
            .catch(() => { })
    }, [deleteItem, setIsLoading, getTransactions])


    return {
        isLoading,
        setIsLoading,
        getCurrentMonthTransactions,
        getTransactions,
        getTransactionsByCategory,
        getTransactionsByCategoryAndSubCategory,
        createTransaction,
        updateTransaction,
        deleteTransaction
    }
}

export default useTransaction
