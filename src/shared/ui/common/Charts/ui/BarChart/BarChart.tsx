import React from 'react';
import ReactApexChart from 'react-apexcharts';

import { useBaseChartOptions } from '../../lib/hooks/useBaseChartOptions/useBaseChartOptions';
import { mergeOptions } from '../../lib/utilities/mergeOptions/mergeOptions';

interface BarChartProps {
    data: number[];
    labels: string[];
    title?: string;
    legendPosition?: 'top' | 'right' | 'bottom' | 'left';
    width?: string;
    height?: string;
    xAxisTitle?: string;
    yAxisTitle?: string;
}

export const BarChart = (props: BarChartProps) => {
    const {
        data,
        labels,
        title,
        legendPosition = 'right',
        width = '400',
        height = '500',
        xAxisTitle,
        yAxisTitle,
    } = props;

    const baseChartOptions = useBaseChartOptions({
        title,
        legendPosition,
        width,
    });

    const additionalOptions = {
        grid: {
            show: false,
        },
        xaxis: {
            labels: { rotate: -90 },
            title: { text: xAxisTitle },
            categories: labels,
        },
        yaxis: {
            title: { text: yAxisTitle },
        },
        legend: {
            horizontalAlign: 'right' as const,
            offsetY: 0,
        },
        tooltip: {
            x: {
                formatter(val: number) {
                    return `${xAxisTitle}: ${val}`;
                },
            },
            y: {
                formatter: undefined,
                title: {
                    formatter: (seriesName: string) => seriesName,
                },
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
            },
        },
    };

    const chartOptions = mergeOptions(baseChartOptions, additionalOptions);

    const seriesData = [
        {
            name: yAxisTitle,
            data,
        },
    ];

    return (
        <ReactApexChart
            series={seriesData}
            type="bar"
            width={width}
            height={height}
            options={chartOptions}
        />
    );
};
