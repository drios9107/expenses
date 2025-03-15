import { useMemo } from "react";
import { Chart as ChartJS, CategoryScale, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useDashboardContext } from "@/hooks";
import { Typography } from "@mui/material";
ChartJS.register(...registerables, CategoryScale);


const DashboardBarGraph = () => {
    const { subCategoryLabels: subCategoryLabels, subCategoryValues } = useDashboardContext();

    const data = useMemo(() => ({
        labels: subCategoryLabels,
        datasets: [{
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
                text: 'Biggest expenses by subcategory'
            }
        }
    }), [])

    if (subCategoryValues.length === 0)
        return <Typography variant="subtitle2" sx={{ userSelect: 'none' }}>There is no data to show</Typography>

    return <Bar data={data} options={options} />
}

export default DashboardBarGraph