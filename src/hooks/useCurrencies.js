import { messages } from "@/utils/messages";
import { useCallback, useState } from "react";
import { useToast } from "./useToast";
import axiosInstance from "@/utils/AxiosInterceptor";

const useCurrenciess = () => {
    const { toastInfo } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const convertCurrency = useCallback(async preparedData => {
        setIsLoading(true);
        axiosInstance.post(`/functions/convert-currency`, preparedData)
            .then(({ data }) => toastInfo(messages.convertedCurrency))
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [toastInfo])

    return {
        isLoading,
        setIsLoading,
        convertCurrency
    }
}

export default useCurrenciess
