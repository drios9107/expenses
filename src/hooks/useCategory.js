import { messages } from "@/utils/messages";
import { useCallback, useEffect, useState } from "react";
import { useToast } from "./useToast";
import axios from "axios";
import { useList } from ".";

const useCategory = () => {
    const { categories, setCategories } = useList();

    const { toastInfo, toastError } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    useEffect(() => {
        if (isSaved) {
            toastInfo(messages.saved);
            setIsSaved(false);
        }
        if (isDeleted) {
            toastInfo(messages.deleted);
            setIsDeleted(false);
        }
    }, [isDeleted, isSaved, toastInfo]);

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
                setIsSaved(true);
            })
            .catch(error => toastError(error?.data?.message))
            .finally(() => setIsLoading(false))
    }, [categories, setCategories, toastError])

    const updateCategory = useCallback(preparedData => {
        setIsLoading(true);
        axios.put(`${process.env.NEXT_PUBLIC_BACKEND}/categories/${preparedData?._id}`, preparedData)
            .then(({ data }) => {
                const index = categories.findIndex(i => i._id === preparedData?._id)
                const result = [...categories];
                result[index] = data?.data;
                setCategories(result);
                setIsSaved(true);
            })
            .catch(error => toastError(error?.data?.message))
            .finally(() => setIsLoading(false))
    }, [categories, setCategories, toastError])

    const deleteCategory = useCallback(id => {
        setIsLoading(true);
        axios.delete(`${process.env.NEXT_PUBLIC_BACKEND}/categories/${id}`)
            .then(({ data }) => {
                setCategories(categories.filter(i => i?._id !== id))
                setIsDeleted(true);
            })
            .catch(error => toastError(error?.data?.message))
            .finally(() => setIsLoading(false))
    }, [categories, setCategories, toastError])


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
