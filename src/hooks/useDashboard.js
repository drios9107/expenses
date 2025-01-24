import { useCallback, useState } from "react";
import { useToast } from "./useToast";
import axios from "axios";
import { useDashboardContext } from ".";

const useDashboard = () => {
    const { setCategoryLabels, setCategoryValues, setSubCategoryLabels, setSubCategoryValues, setMonthExpenses, setMonthIncome,
        setBalance, setBalanceMLC, setBalanceUSD, setBalanceUSDT, setLastIncome, setLastIncomeDate } = useDashboardContext();

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

                if (data?.monthIncome)
                    setMonthIncome(data.monthIncome)

            })
            .catch(error => toastError(error?.data?.message))
            .finally(() => setIsLoading(false))
    }, [setCategoryLabels, setCategoryValues, setMonthExpenses, setMonthIncome, setSubCategoryLabels, setSubCategoryValues, toastError])

    const getBalanceData = useCallback(() => {
        setIsLoading(true);
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/balance`)
            .then(({ data }) => {
                if (data?.balance)
                    setBalance(data?.balance)
                if (data?.balanceMLC)
                    setBalanceMLC(data?.balanceMLC)
                if (data?.balanceUSD)
                    setBalanceUSD(data?.balanceUSD)
                if (data?.balanceUSDT)
                    setBalanceUSDT(data?.balanceUSDT)
                if (data?.lastIncome)
                    setLastIncome(data.lastIncome)
                if (data?.lastIncomeDate)
                    setLastIncomeDate(data.lastIncomeDate)
            })
            .catch(error => toastError(error?.data?.message))
            .finally(() => setIsLoading(false))
    }, [setBalance, setBalanceMLC, setBalanceUSD, setBalanceUSDT, setLastIncome, setLastIncomeDate, toastError])

    return {
        isLoading,
        setIsLoading,
        getDashboard,
        getBalanceData,
    }
}

export default useDashboard
