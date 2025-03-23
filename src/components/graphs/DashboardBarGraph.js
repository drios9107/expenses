import { useCallback, useMemo, useState } from "react";
import { Chart as ChartJS, CategoryScale, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useDashboardContext, useTransaction } from "@/hooks";
import { Typography } from "@mui/material";
import Loader from "../Loader";
import GraphTransactionsModal from "../GraphTransactionsModal";
ChartJS.register(...registerables, CategoryScale);


const DashboardBarGraph = ({ currentMonth, currentYear }) => {
    const { subCategoryLabels, subCategoryValues } = useDashboardContext();
    const [monthTransactions, setMonthTransactions] = useState([]);
    const { getTransactionsByCategoryAndSubCategory, isLoading } = useTransaction()

    const getSplittedSubCategoryLabels = useMemo(() => {
        return subCategoryLabels.map(i => i?.split(':').slice(0, -1).join(':'))
    }, [subCategoryLabels])

    const onClick = useCallback(async (e, v) => {
        const subCategory = getSplittedSubCategoryLabels[v?.[0]?.index];
        const category = subCategoryLabels[v?.[0]?.index]?.split(':').reverse()[0];
        if (subCategory) {
            const response = await getTransactionsByCategoryAndSubCategory(category, subCategory, currentMonth, currentYear)
            if (response)
                setMonthTransactions(response)
        }
    }, [currentMonth, currentYear, getSplittedSubCategoryLabels, getTransactionsByCategoryAndSubCategory, subCategoryLabels])

    const data = useMemo(() => ({
        labels: getSplittedSubCategoryLabels,
        datasets: [{
            data: subCategoryValues,
            backgroundColor: 'rgba(88 212 64 / 0.75)',
        }]
    }), [getSplittedSubCategoryLabels, subCategoryValues]);

    const options = useMemo(() => ({
        type: 'bar',
        responsive: true,
        onClick,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Biggest expenses by subcategory'
            }
        }
    }), [onClick])

    if (subCategoryValues.length === 0)
        return <Typography variant="subtitle2" sx={{ userSelect: 'none' }}>There is no data to show</Typography>

    return <>
        {isLoading && <Loader isLoading />}
        {monthTransactions.length > 0 && <GraphTransactionsModal title={monthTransactions?.[0]?.subCategory} transactions={monthTransactions} onClose={() => setMonthTransactions([])} isSubcategory />}
        <Bar data={data} options={options} />
    </>
}

export default DashboardBarGraph