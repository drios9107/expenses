import { messages } from "@/utils/messages";
import { useCallback, useEffect, useState } from "react";
import { useToast } from "./useToast";
import axios from "axios";
import { useList } from ".";

const useSubCategory = () => {
    const { subCategories, setSubCategories } = useList();

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


    const getSubCategories = useCallback(() => {
        setIsLoading(true);
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/subCategories`)
            .then(({ data }) => setSubCategories(data?.data ?? []))
            .catch(error => toastError(error?.data?.message))
            .finally(() => setIsLoading(false))
    }, [setSubCategories, toastError])

    const createSubCategory = useCallback(preparedData => {
        setIsLoading(true);
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/subCategories`, preparedData)
            .then(({ data }) => {
                setSubCategories([...subCategories, data?.data])
                setIsSaved(true)
            })
            .catch(error => toastError(error?.data?.message))
            .finally(() => setIsLoading(false))
    }, [setSubCategories, subCategories, toastError])

    const updateSubCategory = useCallback(preparedData => {
        setIsLoading(true);
        axios.put(`${process.env.NEXT_PUBLIC_BACKEND}/subCategories/${preparedData?._id}`, preparedData)
            .then(({ data }) => {
                const index = subCategories.findIndex(i => i._id === preparedData?._id)
                const result = [...subCategories];
                result[index] = data?.data;
                setSubCategories(result);
                setIsSaved(true)
            })
            .catch(error => toastError(error?.data?.message))
            .finally(() => setIsLoading(false))
    }, [setSubCategories, subCategories, toastError])

    const deleteSubCategory = useCallback(id => {
        setIsLoading(true);
        axios.delete(`${process.env.NEXT_PUBLIC_BACKEND}/subCategories/${id}`)
            .then(({ data }) => {
                setSubCategories(subCategories.filter(i => i?._id !== id))
                setIsDeleted(true)
            })
            .catch(error => toastError(error?.data?.message))
            .finally(() => setIsLoading(false))
    }, [setSubCategories, subCategories, toastError])


    return {
        isLoading,
        setIsLoading,
        getSubCategories,
        createSubCategory,
        updateSubCategory,
        deleteSubCategory
    }
}

export default useSubCategory
