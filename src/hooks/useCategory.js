import { useCallback, useState } from "react";
import { useList } from ".";
import useCrud from "./useCrud";

const model = 'categories';

const useCategory = () => {
    const { setCategories } = useList();
    const { getAll, createItem, updateItem, deleteItem } = useCrud();

    const [isLoading, setIsLoading] = useState(false);

    const getCategories = useCallback(async () => {
        await getAll(model, setCategories, setIsLoading)
            .catch(() => { })
    }, [getAll, setCategories, setIsLoading])

    const createCategory = useCallback(async preparedData => {
        return createItem(model, preparedData, setIsLoading, getCategories)
            .catch(() => { })
    }, [createItem, setIsLoading, getCategories])

    const updateCategory = useCallback(async preparedData => {
        return updateItem(model, preparedData, setIsLoading, getCategories)
            .catch(() => { })
    }, [updateItem, setIsLoading, getCategories])

    const deleteCategory = useCallback(async id => {
        return deleteItem(model, id, setIsLoading, getCategories)
            .catch(() => { })
    }, [deleteItem, setIsLoading, getCategories])


    return {
        isLoading,
        setIsLoading,
        getCategories,
        createCategory,
        updateCategory,
        deleteCategory
    }
}

export default useCategory
