import { useCallback, useState } from "react";
import { useList } from ".";
import useCrud from "./useCrud";

const model = 'subCategories';

const useSubCategory = () => {
    const { setCategories, setSubCategories } = useList();
    const { getAll, createItem, updateItem, deleteItem } = useCrud();

    const [isLoading, setIsLoading] = useState(false);

    const getSubCategories = useCallback(async () => {
        await getAll(model, setSubCategories, setIsLoading)
            .catch(() => { })
    }, [getAll, setSubCategories, setIsLoading])

    const createSubCategory = useCallback(async preparedData => {
        return createItem(model, preparedData, setIsLoading, getSubCategories)
            .then(() => {
                if (preparedData?.newCategory)
                    setCategories(previous => [...previous, preparedData?.newCategory]);

                return true
            })
            .catch(() => { })
    }, [createItem, getSubCategories, setCategories])

    const updateSubCategory = useCallback(async preparedData => {
        return updateItem(model, preparedData, setIsLoading, getSubCategories)
            .then(() => {
                if (preparedData?.newCategory)
                    setCategories(previous => [...previous, preparedData?.newCategory]);

                return true
            })
            .catch(() => { })
    }, [updateItem, getSubCategories, setCategories])

    const deleteSubCategory = useCallback(async id => {
        return deleteItem(model, id, setIsLoading, getSubCategories)
            .catch(() => { })
    }, [deleteItem, setIsLoading, getSubCategories])


    return {
        isLoading,
        setIsLoading,
        getSubCategories,
        createSubCategory,
        updateSubCategory,
        deleteSubCategory
    }
}

export default useSubCategory
