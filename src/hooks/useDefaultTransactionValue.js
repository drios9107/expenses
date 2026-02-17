import { useCallback, useState } from "react";
import { useList } from ".";
import axiosInstance from "@/utils/AxiosInterceptor";
import useCrud from "./useCrud";

const model = 'default-transaction-values';

const useDefaultTransactionValue = () => {
    const { setDefaultTransactionValues } = useList();
    const { getAll, createItem, updateItem, deleteItem } = useCrud();

    const [isLoading, setIsLoading] = useState(false);

    const getDefaultTransactionValuesByCategoryAndSubCategory = useCallback(async (categoryId, subCategoryId) => {
        setIsLoading(true);
        return axiosInstance.get(`/default-transaction-values/defaults?category=${categoryId}&subcategory=${subCategoryId}`)
            .then(({ data }) => data?.data)
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [])

    const getDefaultTransactionValues = useCallback(async () => {
        await getAll(model, setDefaultTransactionValues, setIsLoading)
            .catch(() => { })
    }, [getAll, setDefaultTransactionValues, setIsLoading])

    const createDefaultTransactionValue = useCallback(async preparedData => {
        return createItem(model, preparedData, setIsLoading, getDefaultTransactionValues)
            .catch(() => { })
    }, [createItem, setIsLoading, getDefaultTransactionValues])

    const updateDefaultTransactionValue = useCallback(async preparedData => {
        return updateItem(model, preparedData, setIsLoading, getDefaultTransactionValues)
            .catch(() => { })
    }, [updateItem, setIsLoading, getDefaultTransactionValues])

    const deleteDefaultTransactionValue = useCallback(async id => {
        return deleteItem(model, id, setIsLoading, getDefaultTransactionValues)
            .catch(() => { })
    }, [deleteItem, setIsLoading, getDefaultTransactionValues])


    return {
        isLoading,
        setIsLoading,
        getDefaultTransactionValues,
        createDefaultTransactionValue,
        updateDefaultTransactionValue,
        deleteDefaultTransactionValue,
        getDefaultTransactionValuesByCategoryAndSubCategory
    }
}

export default useDefaultTransactionValue
