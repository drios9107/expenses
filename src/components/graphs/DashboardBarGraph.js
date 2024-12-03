import { useEffect, useMemo } from "react";
import { Chart as ChartJS, CategoryScale, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useDashboard } from "@/hooks";
ChartJS.register(...registerables, CategoryScale);


const DashboardBarGraph = ({ }) => {
    const { subCategoryLabels: subCategoryLabels, subCategoryValues } = useDashboard();

    const data = useMemo(() => ({
        labels: subCategoryLabels,
        datasets: [{
            label: 'Top 10 expenses this month',
            data: subCategoryValues,
            backgroundColor: 'rgba(88 212 64 / 0.75)',
        }]
    }), [subCategoryValues, subCategoryLabels]);

    const options = useMemo(() => ({
        type: 'bar',
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Biggest expenses by category'
            }
        }
    }), [])

    return <Bar data={data} options={options} />
}

export default DashboardBarGraph