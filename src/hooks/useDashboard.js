import { useCallback, useState } from "react";
import { useDashboardContext } from ".";
import axiosInstance from "@/utils/AxiosInterceptor";

const useDashboard = () => {
    const { setCategoryLabels, setCategoryValues, setSubCategoryLabels, setSubCategoryValues, setMonthExpenses, setMonthIncome,
        setBalance, setBalanceMLC, setBalanceUSD, setBalanceUSDT, setBiggestIncome, setBiggestIncomeDate, setDays } = useDashboardContext();

    const [isLoading, setIsLoading] = useState(false);

    const getDashboard = useCallback(params => {
        setIsLoading(true);
        axiosInstance.post(`/dashboard`, params)
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

                if (data?.biggestIncome)
                    setBiggestIncome(data.biggestIncome)
                if (data?.biggestIncomeDate)
                    setBiggestIncomeDate(data.biggestIncomeDate)

                if (data?.days)
                    setDays(data.days)

            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [setBiggestIncome, setBiggestIncomeDate, setCategoryLabels, setCategoryValues, setDays, setMonthExpenses, setMonthIncome, setSubCategoryLabels, setSubCategoryValues])

    const getBalanceData = useCallback(() => {
        setIsLoading(true);
        axiosInstance.get(`/balance`)
            .then(({ data }) => {
                if (data?.balance)
                    setBalance(data?.balance)
                if (data?.balanceMLC)
                    setBalanceMLC(data?.balanceMLC)
                if (data?.balanceUSD)
                    setBalanceUSD(data?.balanceUSD)
                if (data?.balanceUSDT)
                    setBalanceUSDT(data?.balanceUSDT)
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [setBalance, setBalanceMLC, setBalanceUSD, setBalanceUSDT,])

    return {
        isLoading,
        setIsLoading,
        getDashboard,
        getBalanceData,
    }
}

export default useDashboard
