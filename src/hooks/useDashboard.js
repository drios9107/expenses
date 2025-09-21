import { useCallback, useEffect, useMemo, useState } from "react";
import { useDashboardContext } from ".";
import axiosInstance from "@/utils/AxiosInterceptor";
import moment from "moment";
import { useMediaQuery } from "@mui/material";

const useDashboard = (useDashboardData = false) => {
    const { setCategoryLabels, setCategoryValues, setSubCategoryLabels, setSubCategoryValues, setMonthExpenses, setMonthIncome,
        setBalance, setBalanceMLC, setBalanceUSD, setBalanceUSDT, setBiggestIncome, setBiggestIncomeDate, setDays } = useDashboardContext();
    const isMobile = useMediaQuery("@media (max-width:500px)");

    const [isHover1, setIsHover1] = useState(false);
    const [isHover2, setIsHover2] = useState(false);


    const [personsDebt, setPersonsDebt] = useState([])
    const [currentMonth, setCurrentMonth] = useState(moment().month())
    const [currentYear, setCurrentYear] = useState(moment().year())
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

                if (data?.debtSection)
                    setPersonsDebt(data.debtSection)

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

    const conditionalContainerStyles = useMemo(() => {
        return isMobile ? { borderRadius: '8px', gap: '10px', p: '10px', } : { borderRadius: '16px', gap: '25px', p: '25px', }
    }, [isMobile])

    const conditionalGraphContainerStyles = useMemo(() => {
        return isMobile ? { gap: '10px' } : { gap: '25px' }
    }, [isMobile])

    const conditionalGraphStyles = useMemo(() => {
        return isMobile ? { p: '5px', borderRadius: '8px', } : { p: '25px', borderRadius: '16px', }
    }, [isMobile])

    useEffect(() => {
        if (useDashboardData)
            getDashboard({ currentMonth, currentYear });
    }, [currentMonth, currentYear, getDashboard, useDashboardData])

    const getPreviousMonth = useCallback(() => {
        if (currentMonth === 0) {
            setCurrentMonth(11)
            setCurrentYear(currentYear - 1)
        } else
            setCurrentMonth(currentMonth - 1)
    }, [currentMonth, currentYear])

    const getNextMonth = useCallback(() => {
        if (currentMonth === 11) {
            setCurrentMonth(0)
            setCurrentYear(currentYear + 1)
        } else
            setCurrentMonth(currentMonth + 1)
    }, [currentMonth, currentYear])

    return {
        isLoading, setIsLoading, getDashboard, getBalanceData, conditionalContainerStyles,
        currentMonth, currentYear, getPreviousMonth, getNextMonth, conditionalGraphContainerStyles,
        conditionalGraphStyles, isHover1, setIsHover1, isHover2, setIsHover2, personsDebt
    }
}

export default useDashboard
