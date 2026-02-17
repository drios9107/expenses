import { useCallback, useState } from "react";
import { useList } from ".";
import useCrud from "./useCrud";

const model = 'persons';

const usePerson = () => {
    const { setPersons } = useList();
    const { getAll, createItem, updateItem, deleteItem } = useCrud();

    const [isLoading, setIsLoading] = useState(false);

    const getPersons = useCallback(async () => {
        await getAll(model, setPersons, setIsLoading)
            .catch(() => { })
    }, [getAll, setPersons, setIsLoading])

    const createPerson = useCallback(async preparedData => {
        return createItem(model, preparedData, setIsLoading, getPersons)
            .catch(() => { })
    }, [createItem, setIsLoading, getPersons])

    const updatePerson = useCallback(async preparedData => {
        return updateItem(model, preparedData, setIsLoading, getPersons)
            .catch(() => { })
    }, [updateItem, setIsLoading, getPersons])

    const deletePerson = useCallback(async id => {
        return deleteItem(model, id, setIsLoading, getPersons)
            .catch(() => { })
    }, [deleteItem, setIsLoading, getPersons])


    return {
        isLoading,
        setIsLoading,
        getPersons,
        createPerson,
        updatePerson,
        deletePerson
    }
}

export default usePerson
