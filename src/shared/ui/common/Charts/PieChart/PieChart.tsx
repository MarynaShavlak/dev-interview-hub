import React from 'react';
import ReactApexChart from 'react-apexcharts';

export const PieChart = () => {
    const series = [44, 55, 13, 43, 22];
    const chartOptions = {
        chart: {
            width: 380,
        },
        labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
    };

    return (
        <ReactApexChart
            series={series}
            type="pie"
            width={380}
            options={chartOptions}
        />
    );
};
