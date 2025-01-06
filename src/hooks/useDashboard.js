import { useCallback, useState } from "react";
import { useToast } from "./useToast";
import axios from "axios";
import { useDashboardContext } from ".";

const useDashboard = () => {
    const { setCategoryLabels, setCategoryValues, setSubCategoryLabels, setSubCategoryValues,
        setMonthExpenses, setBalance, setLastIncome, setLastIncomeDate } = useDashboardContext();

    const { toastError } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const getDashboard = useCallback(params => {
        setIsLoading(true);
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/dashboard`, params)
            .then(({ data }) => {
                if (data?.categoryData) {
                    setCategoryLabels(data.categoryData?.labels);
                    setCategoryValues(data.categoryData?.values);
                }

                if (data?.subCategoryData) {
                    setSubCategoryLabels(data.subCategoryData?.labels);
                    setSubCategoryValues(data.subCategoryData?.values);
                }

                if (data?.monthExpenses)
                    setMonthExpenses(data.monthExpenses)

            })
            .catch(error => toastError(error?.data?.message))
            .finally(() => setIsLoading(false))
    }, [setCategoryLabels, setCategoryValues, setMonthExpenses, setSubCategoryLabels, setSubCategoryValues, toastError])

    const getBalanceData = useCallback(() => {
        setIsLoading(true);
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/balance`)
            .then(({ data }) => {
                setBalance(data?.balance)
                if (data?.lastIncome)
                    setLastIncome(data.lastIncome)
                if (data?.lastIncomeDate)
                    setLastIncomeDate(data.lastIncomeDate)
            })
            .catch(error => toastError(error?.data?.message))
            .finally(() => setIsLoading(false))
    }, [setBalance, setLastIncome, setLastIncomeDate, toastError])

    return {
        isLoading,
        setIsLoading,
        getDashboard,
        getBalanceData,
    }
}

export default useDashboard
