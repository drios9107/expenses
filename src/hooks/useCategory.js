import { messages } from "@/utils/messages";
import { useCallback, useState } from "react";
import { useToast } from "./useToast";
import axios from "axios";
import { useList } from ".";

const useCategory = () => {
    const { categories, setCategories } = useList();

    const { toastInfo, toastError } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const getCategories = useCallback(() => {
        setIsLoading(true);
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/categories`)
            .then(({ data }) => setCategories(data?.data ?? []))
            .catch(error => toastError(error?.data?.message))
            .finally(() => setIsLoading(false))
    }, [setCategories, toastError])

    const createCategory = useCallback(preparedData => {
        setIsLoading(true);
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/categories`, preparedData)
            .then(({ data }) => {
                setCategories([...categories, data?.data])
                toastInfo(messages.saved);
            })
            .catch(error => toastError(error?.data?.message))
            .finally(() => setIsLoading(false))
    }, [categories, setCategories, toastError, toastInfo])

    const updateCategory = useCallback(preparedData => {
        setIsLoading(true);
        axios.put(`${process.env.NEXT_PUBLIC_BACKEND}/categories/${preparedData?._id}`, preparedData)
            .then(({ data }) => {
                const index = categories.findIndex(i => i._id === preparedData?._id)
                const result = [...categories];
                result[index] = data?.data;
                setCategories(result);
                toastInfo(messages.saved);
            })
            .catch(error => toastError(error?.data?.message))
            .finally(() => setIsLoading(false))
    }, [categories, setCategories, toastError, toastInfo])

    const deleteCategory = useCallback(id => {
        setIsLoading(true);
        axios.delete(`${process.env.NEXT_PUBLIC_BACKEND}/categories/${id}`)
            .then(({ data }) => {
                setCategories(categories.filter(i => i?._id !== id))
                toastInfo(messages.deleted);
            })
            .catch(error => toastError(error?.data?.message))
            .finally(() => setIsLoading(false))
    }, [categories, setCategories, toastError, toastInfo])


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
