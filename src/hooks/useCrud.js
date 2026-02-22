import { useCallback } from "react";
import { useToast } from "./useToast";
import { messages } from "@/utils/messages";
import axiosInstance from "@/utils/AxiosInterceptor";

const useCrud = () => {
    const { toastInfo } = useToast();

    const getAll = useCallback(async (model = 'transaction', setItems = () => { }, setIsLoading = () => { }) => {
        setIsLoading(true);
        return axiosInstance.get(`/${model}`)
            .then(({ data }) => setItems(data?.data ?? []))
            .catch(() => false)
            .finally(() => setIsLoading(false))
    }, [])

    const createItem = useCallback(async (model = 'transaction', preparedData, setIsLoading = () => { }, getAllItems = async () => { }) => {
        setIsLoading(true);
        return axiosInstance.post(`/${model}`, preparedData)
            .then(async ({ data }) => {
                await getAllItems()
                toastInfo(messages.saved)

                return true
            })
            .catch(() => false)
            .finally(() => setIsLoading(false))
    }, [toastInfo])

    const updateItem = useCallback(async (model = 'transaction', preparedData, setIsLoading = () => { }, getAllItems = async () => { }) => {
        setIsLoading(true);
        return axiosInstance.put(`/${model}/${preparedData?._id}`, preparedData)
            .then(async ({ data }) => {
                await getAllItems();
                toastInfo(messages.saved)

                return true
            })
            .catch(() => false)
            .finally(() => setIsLoading(false))
    }, [toastInfo])

    const deleteItem = useCallback(async (model = 'transaction', id, setIsLoading = () => { }, getAllItems = async () => { }) => {
        setIsLoading(true);
        return axiosInstance.delete(`/${model}/${id}`)
            .then(async () => {
                await getAllItems()
                toastInfo(messages.deleted)
                return id
            })
            .catch(() => false)
            .finally(() => setIsLoading(false))
    }, [toastInfo])

    const createManyItems = useCallback(async (model = 'transaction', preparedData, setIsLoading = () => { }, getAllItems = async () => { }) => {
        setIsLoading(true);
        return axiosInstance.post(`/${model}/create-many`, preparedData)
            .then(async ({ data }) => {
                await getAllItems()
                toastInfo(messages.saved)

                return true
            })
            .catch(() => false)
            .finally(() => setIsLoading(false))
    }, [toastInfo])


    return {
        getAll,
        createItem,
        updateItem,
        deleteItem,
        createManyItems
    }
}

export default useCrud
