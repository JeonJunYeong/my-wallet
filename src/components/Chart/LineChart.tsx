import React from "react";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";

// Chart.js에 필요한 요소 등록
ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Title,
    Tooltip,
    Legend,
    annotationPlugin
);


interface LineChartWithAnnotationProps {
    labels: string[];
    buyData: {price: number,count:number}[];
    sellData: {price: number,count:number}[];

}

const LineChartWithAnnotation: React.FC = () => {



    const data = {
        labels: ["09/15 13:00", "09/15 14:00", "09/15 15:00", "09/15 16:00", "09/15 17:00"],
        datasets: [
            {
                label: "매출 A",
                data: [10, 20, 15, 25, 30], // 1월~5월 모두 있음
                borderColor: "blue",
                backgroundColor: "rgba(0,0,255,0.3)",
            },
            {
                label: "매출 B",
                data: [0, 18, 0, 28, 35],
                // 1월, 3월 데이터가 없음 → null로 채우면 라벨 맞음
                borderColor: "green",
                backgroundColor: "rgba(0,255,0,0.3)",
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "매출 라인 차트",
            },
            annotation: {
                annotations: {
                    기준선: {
                        type: "line",
                        yMin: 20,
                        yMax: 20,
                        borderColor: "red",
                        borderWidth: 2,
                        label: {
                            content: "기준선 20",
                            enabled: true,
                            position: "end",
                        },
                    },
                },
            },

        },
    };

    return <Line data={data} options={options} />;
};

export default LineChartWithAnnotation;