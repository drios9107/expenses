import { useCallback, useState } from "react";
import { useList } from ".";
import useCrud from "./useCrud";

const model = 'users';

const useUser = () => {
    const { setUsers } = useList();
    const { getAll, createItem, updateItem, deleteItem } = useCrud();

    const [isLoading, setIsLoading] = useState(false);

    const getUsers = useCallback(async () => {
        await getAll(model, setUsers, setIsLoading)
            .catch(() => { })
    }, [getAll, setUsers, setIsLoading])

    const createUser = useCallback(async preparedData => {
        return createItem(model, preparedData, setIsLoading, getUsers)
            .catch(() => { })
    }, [createItem, setIsLoading, getUsers])

    const updateUser = useCallback(async preparedData => {
        return updateItem(model, preparedData, setIsLoading, getUsers)
            .catch(() => { })
    }, [updateItem, setIsLoading, getUsers])

    const deleteUser = useCallback(async id => {
        return deleteItem(model, id, setIsLoading, getUsers)
            .catch(() => { })
    }, [deleteItem, setIsLoading, getUsers])


    return {
        isLoading,
        setIsLoading,
        getUsers,
        createUser,
        updateUser,
        deleteUser
    }
}

export default useUser
