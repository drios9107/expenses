import { messages } from "@/utils/messages";
import { useCallback, useState } from "react";
import { useToast } from "./useToast";
import { useList } from ".";
import axiosInstance from "@/utils/AxiosInterceptor";

const useUser = () => {
    const { users, setUsers } = useList();

    const { toastInfo } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const getUsers = useCallback(() => {
        setIsLoading(true);
        axiosInstance.get(`/users`)
            .then(({ data }) => setUsers(data?.data ?? []))
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [setUsers])

    const createUser = useCallback(async preparedData => {
        setIsLoading(true);
        return axiosInstance.post(`/users`, preparedData)
            .then(({ data }) => {
                setUsers([...users, data?.data])
                toastInfo(messages.saved);
                return true
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [users, setUsers, toastInfo])

    const updateUser = useCallback(async preparedData => {
        setIsLoading(true);
        return axiosInstance.put(`/users/${preparedData?._id}`, preparedData)
            .then(({ data }) => {
                const index = users.findIndex(i => i._id === preparedData?._id)
                const result = [...users];
                result[index] = data?.data;
                setUsers(result);
                toastInfo(messages.saved);
                return true
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [users, setUsers, toastInfo])

    const deleteUser = useCallback(id => {
        setIsLoading(true);
        axiosInstance.delete(`/users/${id}`)
            .then(({ data }) => {
                setUsers(users.filter(i => i?._id !== id))
                toastInfo(messages.deleted);
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [users, setUsers, toastInfo])


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
