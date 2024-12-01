import { Chart as ChartJS, CategoryScale, registerables } from "chart.js";
import { useEffect, useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { useDashboard } from "@/hooks";
ChartJS.register(...registerables, CategoryScale);


const DashboardPieGraph = ({ }) => {
    const { labels, dataset1 } = useDashboard();

    const data = useMemo(() => ({
        labels,
        datasets: [{
            data: dataset1,
            backgroundColor: dataset1.map(i => `#${Math.random().toString(16).slice(-6)}`),
            borderWidth: 0,
        }],
    }), [dataset1, labels]);

    const options = useMemo(() => ({
        maintainAspectRatio: true,
        responsive: true,
        label: { display: true },
        plugins: {
            legend: {
                display: true,
                position: 'right'
            },
        }
    }), [])

    return <Doughnut data={data} options={options} height={'50vh'} />

}

export default DashboardPieGraph