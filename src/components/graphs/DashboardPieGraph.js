import { Chart as ChartJS, CategoryScale, registerables } from "chart.js";
import { useEffect, useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { useDashboard } from "@/hooks";
ChartJS.register(...registerables, CategoryScale);


const DashboardPieGraph = ({ }) => {
    const { categoryLabels, categoryValues } = useDashboard();

    const data = useMemo(() => ({
        labels: categoryLabels,
        datasets: [{
            data: categoryValues,
            backgroundColor: categoryValues.map(i => `#${Math.random().toString(16).slice(-6)}`),
            borderWidth: 0,
        }],
    }), [categoryValues, categoryLabels]);

    const options = useMemo(() => ({
        maintainAspectRatio: true,
        responsive: true,
        plugins: {
            title: {
                text: 'Relation between categories',
                display: true
            },
            legend: {
                display: true,
                position: 'right'
            },
        }
    }), [])

    return <Doughnut data={data} options={options} height={'50vh'} />

}

export default DashboardPieGraph