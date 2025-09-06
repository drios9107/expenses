import { messages } from "@/utils/messages";
import { useCallback, useState } from "react";
import { useToast } from "./useToast";
import { useList } from ".";
import axiosInstance from "@/utils/AxiosInterceptor";

const usePerson = () => {
    const { persons, setPersons } = useList();

    const { toastInfo } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const getPersons = useCallback(() => {
        setIsLoading(true);
        axiosInstance.get(`/persons`)
            .then(({ data }) => setPersons(data?.data ?? []))
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [setPersons])

    const createPerson = useCallback(async preparedData => {
        setIsLoading(true);
        return axiosInstance.post(`/persons`, preparedData)
            .then(({ data }) => {
                setPersons([...persons, data?.data])
                toastInfo(messages.saved);
                return true
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [persons, setPersons, toastInfo])

    const updatePerson = useCallback(async preparedData => {
        setIsLoading(true);
        return axiosInstance.put(`/persons/${preparedData?._id}`, preparedData)
            .then(({ data }) => {
                const index = persons.findIndex(i => i._id === preparedData?._id)
                const result = [...persons];
                result[index] = data?.data;
                setPersons(result);
                toastInfo(messages.saved);
                return true
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [persons, setPersons, toastInfo])

    const deletePerson = useCallback(id => {
        setIsLoading(true);
        axiosInstance.delete(`/persons/${id}`)
            .then(({ data }) => {
                setPersons(persons.filter(i => i?._id !== id))
                toastInfo(messages.deleted);
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [persons, setPersons, toastInfo])


    return {
        isLoading,
        setIsLoading,
        getPersons,
        createPerson,
        updatePerson,
        deletePerson
    }
}

export default usePerson
