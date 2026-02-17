import { useCallback, useState } from "react";
import { useList } from ".";
import useCrud from "./useCrud";

const model = 'debts';

const useDebt = () => {
    const { setDebts } = useList();
    const { getAll, createItem, updateItem, deleteItem } = useCrud();

    const [isLoading, setIsLoading] = useState(false);

    const getDebts = useCallback(async () => {
        await getAll(model, setDebts, setIsLoading)
            .catch(() => { })
    }, [getAll, setDebts, setIsLoading])

    const createDebt = useCallback(async preparedData => {
        return createItem(model, preparedData, setIsLoading, getDebts)
            .catch(() => { })
    }, [createItem, setIsLoading, getDebts])

    const updateDebt = useCallback(async preparedData => {
        return updateItem(model, preparedData, setIsLoading, getDebts)
            .catch(() => { })
    }, [updateItem, setIsLoading, getDebts])

    const deleteDebt = useCallback(async id => {
        return deleteItem(model, id, setIsLoading, getDebts)
            .catch(() => { })
    }, [deleteItem, setIsLoading, getDebts])


    return {
        isLoading,
        setIsLoading,
        getDebts,
        createDebt,
        updateDebt,
        deleteDebt
    }
}

export default useDebt
