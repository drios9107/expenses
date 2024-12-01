// ** React Imports
import { useToast } from "@/hooks/useToast";
import { messages } from "@/utils/messages";
import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";

const defaultProvider = {
  isLoading: false,
  setIsLoading: () => Boolean,
  isSaved: false,
  setIsSaved: () => Boolean,
  isDeleted: false,
  setIsDeleted: () => Boolean,
  subCategories: [],
  setSubCategories: () => [],
  getSubCategories: () => Promise.resolve(),
  createSubCategory: () => Promise.resolve(),
  updateSubCategory: () => Promise.resolve(),
  deleteSubCategory: () => Promise.resolve(),
};
const SubCategoryContext = createContext(defaultProvider);

const SubCategoryProvider = ({ children }) => {
  const { toastInfo, toastError } = useToast();
  const [isLoading, setIsLoading] = useState(defaultProvider.isLoading);
  const [isSaved, setIsSaved] = useState(defaultProvider.isSaved);
  const [isDeleted, setIsDeleted] = useState(defaultProvider.isDeleted);
  const [subCategories, setSubCategories] = useState(defaultProvider.subCategories);

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
  }, [toastError])

  const createSubCategory = useCallback(preparedData => {
    setIsLoading(true);
    axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/subCategories`, preparedData)
      .then(({ data }) => {
        console.log('***submit', data?.data)
        setSubCategories([...subCategories, data?.data])
      })
      .catch(error => toastError(error?.data?.message))
      .finally(() => setIsLoading(false))
  }, [subCategories, toastError])

  const updateSubCategory = useCallback(preparedData => {
    setIsLoading(true);
    axios.put(`${process.env.NEXT_PUBLIC_BACKEND}/subCategories/${preparedData?._id}`, preparedData)
      .then(({ data }) => {
        console.log('***submit', data?.data)
        const index = subCategories.findIndex(i => i._id === preparedData?._id)
        const result = [...subCategories];
        result[index] = data?.data;
        setSubCategories(result);
      })
      .catch(error => toastError(error?.data?.message))
      .finally(() => setIsLoading(false))
  }, [subCategories, toastError])

  const deleteSubCategory = useCallback(id => {
    setIsLoading(true);
    axios.delete(`${process.env.NEXT_PUBLIC_BACKEND}/subCategories/${id}`)
      .then(({ data }) => {
        console.log('***delete', data?.id)
        setSubCategories(subCategories.filter(i => i?._id !== id))
      })
      .catch(error => toastError(error?.data?.message))
      .finally(() => setIsLoading(false))
  }, [subCategories, toastError])

  const values = {
    isLoading,
    setIsLoading,
    subCategories,
    setSubCategories,
    getSubCategories,
    createSubCategory,
    updateSubCategory,
    deleteSubCategory
  };

  return (
    <SubCategoryContext.Provider value={values}>{children}</SubCategoryContext.Provider>
  );
};

export { SubCategoryContext, SubCategoryProvider };
