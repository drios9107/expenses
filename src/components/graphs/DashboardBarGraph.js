import { useEffect, useMemo } from "react";
import { Chart as ChartJS, CategoryScale, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useDashboard } from "@/hooks";
ChartJS.register(...registerables, CategoryScale);


const DashboardBarGraph = ({ currentMonth, currentYear }) => {
    const { getDashboard, labels, dataset1 } = useDashboard();

    useEffect(() => {
        getDashboard({ currentMonth, currentYear });
    }, [currentMonth, currentYear, getDashboard])

    const data = useMemo(() => ({
        labels,
        datasets: [{
            label: 'Category',
            data: dataset1,
            backgroundColor: 'rgba(88 212 64 / 0.75)',
        }]
    }), [dataset1, labels]);

    const options = useMemo(() => ({
        type: 'bar',
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                    position: 'top',
                },
            }
        },
    }), [])

    return <Bar data={data} options={options} />
}

export default DashboardBarGraph