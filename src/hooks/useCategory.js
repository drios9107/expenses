import { messages } from "@/utils/messages";
import { useCallback, useState } from "react";
import { useToast } from "./useToast";
import { useList } from ".";
import axiosInstance from "@/utils/AxiosInterceptor";

const useCategory = () => {
    const { categories, setCategories } = useList();

    const { toastInfo } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const getCategories = useCallback(() => {
        setIsLoading(true);
        axiosInstance.get(`/categories`)
            .then(({ data }) => setCategories(data?.data ?? []))
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [setCategories])

    const createCategory = useCallback(preparedData => {
        setIsLoading(true);
        axiosInstance.post(`/categories`, preparedData)
            .then(({ data }) => {
                setCategories([...categories, data?.data])
                toastInfo(messages.saved);
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [categories, setCategories, toastInfo])

    const updateCategory = useCallback(preparedData => {
        setIsLoading(true);
        axiosInstance.put(`/categories/${preparedData?._id}`, preparedData)
            .then(({ data }) => {
                const index = categories.findIndex(i => i._id === preparedData?._id)
                const result = [...categories];
                result[index] = data?.data;
                setCategories(result);
                toastInfo(messages.saved);
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [categories, setCategories, toastInfo])

    const deleteCategory = useCallback(id => {
        setIsLoading(true);
        axiosInstance.delete(`/categories/${id}`)
            .then(({ data }) => {
                setCategories(categories.filter(i => i?._id !== id))
                toastInfo(messages.deleted);
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [categories, setCategories, toastInfo])


    return {
        isLoading,
        setIsLoading,
        getCategories,
        createCategory,
        updateCategory,
        deleteCategory
    }
}

export default useCategory
