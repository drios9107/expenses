import { messages } from "@/utils/messages";
import { useCallback, useState } from "react";
import { useToast } from "./useToast";
import axios from "axios";
import { useList } from ".";
import axiosInstance from "@/utils/AxiosInterceptor";

const useSubCategory = () => {
    const { subCategories, setSubCategories, setCategories } = useList();

    const { toastInfo } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const getSubCategories = useCallback(() => {
        setIsLoading(true);
        axiosInstance.get(`/subCategories`)
            .then(({ data }) => setSubCategories(data?.data ?? []))
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [setSubCategories])

    const createSubCategory = useCallback(async preparedData => {
        setIsLoading(true);
        return axiosInstance.post(`/subCategories`, preparedData)
            .then(({ data }) => {
                setSubCategories([...subCategories, data?.data])
                toastInfo(messages.saved);
                if (preparedData?.newCategory)
                    setCategories(previous => [...previous, preparedData?.newCategory]);

                return true;
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [setCategories, setSubCategories, subCategories, toastInfo])

    const updateSubCategory = useCallback(async preparedData => {
        setIsLoading(true);
        return axiosInstance.put(`/subCategories/${preparedData?._id}`, preparedData)
            .then(({ data }) => {
                const index = subCategories.findIndex(i => i._id === preparedData?._id)
                const result = [...subCategories];
                result[index] = data?.data;
                setSubCategories(result);
                toastInfo(messages.saved);
                if (preparedData?.newCategory)
                    setCategories(previous => [...previous, preparedData?.newCategory]);

                return true;
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [setCategories, setSubCategories, subCategories, toastInfo])

    const deleteSubCategory = useCallback(id => {
        setIsLoading(true);
        axiosInstance.delete(`/subCategories/${id}`)
            .then(({ data }) => {
                setSubCategories(subCategories.filter(i => i?._id !== id))
                toastInfo(messages.deleted);
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [setSubCategories, subCategories, toastInfo])


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
