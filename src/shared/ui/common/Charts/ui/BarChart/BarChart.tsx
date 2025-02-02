import React from 'react';
import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts';

import { useBaseChartOptions } from '../../lib/hooks/useBaseChartOptions/useBaseChartOptions';
import { mergeOptions } from '../../lib/utilities/mergeOptions/mergeOptions';
import { BaseChartProps } from '../types';

interface BarChartProps extends BaseChartProps {
    data: number[];
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

    const additionalOptions: ApexCharts.ApexOptions = {
        xaxis: {
            labels: { rotate: -45, hideOverlappingLabels: false, trim: true },

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
