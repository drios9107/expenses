import { useCallback, useState } from "react";
import axiosInstance from "@/utils/AxiosInterceptor";

const useSearch = () => {
    const [isLoading, setIsLoading] = useState(false);

    const advancedSearch = useCallback(async (model = 'transactions', params) => {
        setIsLoading(true);
        return axiosInstance.post(`/${model}/search`, params)
            .then(({ data }) => data)
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [])


    return {
        isLoading,
        advancedSearch
    }
}

export default useSearch
