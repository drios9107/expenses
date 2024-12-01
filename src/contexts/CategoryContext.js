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
  categories: [],
  setCategories: () => [],
  getCategories: () => Promise.resolve(),
  createCategory: () => Promise.resolve(),
  updateCategory: () => Promise.resolve(),
  deleteCategory: () => Promise.resolve(),
};
const CategoryContext = createContext(defaultProvider);

const CategoryProvider = ({ children }) => {
  const { toastInfo, toastError } = useToast();
  const [isLoading, setIsLoading] = useState(defaultProvider.isLoading);
  const [isSaved, setIsSaved] = useState(defaultProvider.isSaved);
  const [isDeleted, setIsDeleted] = useState(defaultProvider.isDeleted);
  const [categories, setCategories] = useState(defaultProvider.categories);

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
  }, [toastError])

  const createCategory = useCallback(preparedData => {
    setIsLoading(true);
    axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/categories`, preparedData)
      .then(({ data }) => {
        console.log('***submit', data?.data)
        setCategories([...categories, data?.data])
      })
      .catch(error => toastError(error?.data?.message))
      .finally(() => setIsLoading(false))
  }, [categories, toastError])

  const updateCategory = useCallback(preparedData => {
    setIsLoading(true);
    axios.put(`${process.env.NEXT_PUBLIC_BACKEND}/categories/${preparedData?._id}`, preparedData)
      .then(({ data }) => {
        console.log('***submit', data?.data)
        const index = categories.findIndex(i => i._id === preparedData?._id)
        const result = [...categories];
        result[index] = data?.data;
        setCategories(result);
      })
      .catch(error => toastError(error?.data?.message))
      .finally(() => setIsLoading(false))
  }, [categories, toastError])

  const deleteCategory = useCallback(id => {
    setIsLoading(true);
    axios.delete(`${process.env.NEXT_PUBLIC_BACKEND}/categories/${id}`)
      .then(({ data }) => {
        console.log('***delete', data?.id)
        setCategories(categories.filter(i => i?._id !== id))
      })
      .catch(error => toastError(error?.data?.message))
      .finally(() => setIsLoading(false))
  }, [categories, toastError])

  const values = {
    isLoading,
    setIsLoading,
    categories,
    setCategories,
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
  };

  return (
    <CategoryContext.Provider value={values}>{children}</CategoryContext.Provider>
  );
};

export { CategoryContext, CategoryProvider };
