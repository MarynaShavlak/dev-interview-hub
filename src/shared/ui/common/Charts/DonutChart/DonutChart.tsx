import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { toggleFeatures } from '@/shared/lib/features';

export const DonutChart = () => {
    const series = [44, 55, 13, 43, 22];

    const fontFamily = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => 'Nunito Sans", sans-serif',
        off: () => 'Times New Roman", serif',
    });

    const headerColor = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => '#141c1f',
        off: () => '#0232c2',
    });

    const monochromeColor = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => '#5ed3f3',
        off: () => '#0449e0',
    });

    const chartOptions = {
        chart: {
            width: '100%',
        },
        labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
        title: {
            text: 'Article Categories, %',
            align: 'left' as const,
            style: {
                fontSize: '16px',
                fontWeight: 'bold',
                fontFamily,
                // color: headerColor,
            },
        },
        legend: {
            fontFamily,
        },
        stroke: {
            show: false,
        },
        theme: {
            mode: 'dark' as const,
            monochrome: {
                enabled: true,
                color: monochromeColor,
                shadeTo: 'dark' as const,
                shadeIntensity: 0.9,
            },
        },
    };

    return (
        <ReactApexChart
            series={series}
            type="donut"
            width={400}
            // height="400"
            options={chartOptions}
        />
    );
};
