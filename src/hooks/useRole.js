import { messages } from "@/utils/messages";
import { useCallback, useState } from "react";
import { useToast } from "./useToast";
import { useList } from ".";
import axiosInstance from "@/utils/AxiosInterceptor";

const useRole = () => {
    const { roles, setRoles } = useList();

    const { toastInfo } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const getRoles = useCallback(() => {
        setIsLoading(true);
        axiosInstance.get(`/roles`)
            .then(({ data }) => setRoles(data?.data ?? []))
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [setRoles])

    const createRole = useCallback(async preparedData => {
        setIsLoading(true);
        return axiosInstance.post(`/roles`, preparedData)
            .then(({ data }) => {
                setRoles([...roles, data?.data])
                toastInfo(messages.saved);
                return true
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [roles, setRoles, toastInfo])

    const updateRole = useCallback(async preparedData => {
        setIsLoading(true);
        return axiosInstance.put(`/roles/${preparedData?._id}`, preparedData)
            .then(({ data }) => {
                const index = roles.findIndex(i => i._id === preparedData?._id)
                const result = [...roles];
                result[index] = data?.data;
                setRoles(result);
                toastInfo(messages.saved);
                return true
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [roles, setRoles, toastInfo])

    const deleteRole = useCallback(id => {
        setIsLoading(true);
        axiosInstance.delete(`/roles/${id}`)
            .then(({ data }) => {
                setRoles(roles.filter(i => i?._id !== id))
                toastInfo(messages.deleted);
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [roles, setRoles, toastInfo])


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
