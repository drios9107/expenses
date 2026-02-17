import { useCallback, useState } from "react";
import { useList } from ".";
import useCrud from "./useCrud";

const model = 'roles';

const useRole = () => {
    const { setRoles } = useList();
    const { getAll, createItem, updateItem, deleteItem } = useCrud();

    const [isLoading, setIsLoading] = useState(false);

    const getRoles = useCallback(async () => {
        await getAll(model, setRoles, setIsLoading)
            .catch(() => { })
    }, [getAll, setRoles, setIsLoading])

    const createRole = useCallback(async preparedData => {
        return createItem(model, preparedData, setIsLoading, getRoles)
            .catch(() => { })
    }, [createItem, setIsLoading, getRoles])

    const updateRole = useCallback(async preparedData => {
        return updateItem(model, preparedData, setIsLoading, getRoles)
            .catch(() => { })
    }, [updateItem, setIsLoading, getRoles])

    const deleteRole = useCallback(async id => {
        return deleteItem(model, id, setIsLoading, getRoles)
            .catch(() => { })
    }, [deleteItem, setIsLoading, getRoles])


    return {
        isLoading,
        setIsLoading,
        getRoles,
        createRole,
        updateRole,
        deleteRole
    }
}

export default useRole
