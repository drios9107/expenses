import { messages } from "@/utils/messages";
import { useCallback, useState } from "react";
import { useToast } from "./useToast";
import axiosInstance from "@/utils/AxiosInterceptor";

const useMessages = () => {
    const { toastInfo } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const sendEmail = useCallback(preparedData => {
        setIsLoading(true);
        axiosInstance.post(`/functions/send-email`, preparedData)
            .then(({ data }) => {
                toastInfo(messages.saved);
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [toastInfo])

    return {
        isLoading,
        setIsLoading,
        sendEmail
    }
}

export default useMessages
