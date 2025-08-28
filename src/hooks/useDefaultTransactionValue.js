import { messages } from "@/utils/messages";
import { useCallback, useState } from "react";
import { useToast } from "./useToast";
import { useList } from ".";
import axiosInstance from "@/utils/AxiosInterceptor";

const useDefaultTransactionValue = () => {
    const { defaultTransactionValues, setDefaultTransactionValues } = useList();

    const { toastInfo } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const getDefaultTransactionValues = useCallback(() => {
        setIsLoading(true);
        axiosInstance.get(`/default-transaction-values`)
            .then(({ data }) => setDefaultTransactionValues(data?.data ?? []))
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [setDefaultTransactionValues])

    const createDefaultTransactionValues = useCallback(async preparedData => {
        setIsLoading(true);
        return axiosInstance.post(`/default-transaction-values`, preparedData)
            .then(({ data }) => {
                setDefaultTransactionValues([data?.data, ...defaultTransactionValues])
                toastInfo(messages.saved);

                return true;
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [setDefaultTransactionValues, toastInfo, defaultTransactionValues])

    const updateDefaultTransactionValues = useCallback(async preparedData => {
        setIsLoading(true);
        return axiosInstance.put(`/default-transaction-values/${preparedData?._id}`, preparedData)
            .then(({ data }) => {
                const index = defaultTransactionValues.findIndex(i => i._id === preparedData?._id)
                if (index > -1) {
                    const result = [...defaultTransactionValues];
                    result[index] = data?.data;
                    setDefaultTransactionValues(result);
                }
                toastInfo(messages.saved);

                return true;
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [setDefaultTransactionValues, toastInfo, defaultTransactionValues])

    const deleteDefaultTransactionValues = useCallback(id => {
        setIsLoading(true);
        axiosInstance.delete(`/default-transaction-values/${id}`)
            .then(({ data }) => {
                setDefaultTransactionValues(defaultTransactionValues.filter(i => i?._id !== id))
                toastInfo(messages.deleted);
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [setDefaultTransactionValues, toastInfo, defaultTransactionValues])


    return {
        isLoading,
        setIsLoading,
        getDefaultTransactionValues,
        createDefaultTransactionValues,
        updateDefaultTransactionValues,
        deleteDefaultTransactionValues
    }
}

export default useDefaultTransactionValue
