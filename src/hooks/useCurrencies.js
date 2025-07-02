import { messages } from "@/utils/messages";
import { useCallback, useState } from "react";
import { useToast } from "./useToast";
import axiosInstance from "@/utils/AxiosInterceptor";
import { useList } from ".";

const useCurrenciess = () => {
    const { toastInfo } = useToast();
    const { setTransactions } = useList();
    const [isLoading, setIsLoading] = useState(false);

    const convertCurrency = useCallback(async preparedData => {
        setIsLoading(true);
        return axiosInstance.post(`/functions/convert-currency`, preparedData)
            .then(({ data }) => {
                if (Array.isArray(data?.data))
                    setTransactions(prev => [...data.data, ...prev])
                toastInfo(messages.convertedCurrency);
                return true
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [setTransactions, toastInfo])

    return {
        isLoading,
        setIsLoading,
        convertCurrency
    }
}

export default useCurrenciess
