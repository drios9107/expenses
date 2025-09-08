import { messages } from "@/utils/messages";
import { useCallback, useState } from "react";
import { useToast } from "./useToast";
import { useList } from ".";
import axiosInstance from "@/utils/AxiosInterceptor";

const useDebt = () => {
    const { debts, setDebts } = useList();

    const { toastInfo } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const getDebts = useCallback(() => {
        setIsLoading(true);
        axiosInstance.get(`/debts`)
            .then(({ data }) => setDebts(data?.data ?? []))
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [setDebts])

    const createDebt = useCallback(async preparedData => {
        setIsLoading(true);
        return axiosInstance.post(`/debts`, preparedData)
            .then(({ data }) => {
                setDebts([...debts, data?.data])
                toastInfo(messages.saved);
                return true
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [debts, setDebts, toastInfo])

    const updateDebt = useCallback(async preparedData => {
        setIsLoading(true);
        return axiosInstance.put(`/debts/${preparedData?._id}`, preparedData)
            .then(({ data }) => {
                const index = debts.findIndex(i => i._id === preparedData?._id)
                const result = [...debts];
                result[index] = data?.data;
                setDebts(result);
                toastInfo(messages.saved);
                return true
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [debts, setDebts, toastInfo])

    const deleteDebt = useCallback(id => {
        setIsLoading(true);
        axiosInstance.delete(`/debts/${id}`)
            .then(({ data }) => {
                setDebts(debts.filter(i => i?._id !== id))
                toastInfo(messages.deleted);
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [debts, setDebts, toastInfo])


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
