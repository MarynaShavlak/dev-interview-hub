import React from 'react';
import ReactApexChart from 'react-apexcharts';
import dayjs from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useBaseChartOptions } from '../../lib/hooks/useBaseChartOptions/useBaseChartOptions';
import { mergeOptions } from '../../lib/utilities/mergeOptions/mergeOptions';

dayjs.extend(quarterOfYear);
dayjs.extend(customParseFormat);

interface StackedColumnsChartProps {
    data: { name: string; data: number[] }[];
    labels: string[];
    title?: string;
    legendPosition?: 'top' | 'right' | 'bottom' | 'left';
    width?: string | number;
    height?: string | number;
    xAxisTitle?: string;
    yAxisTitle?: string;
}

export const StackedColumnsChart = (props: StackedColumnsChartProps) => {
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
        chart: {
            stacked: true,
        },
        xaxis: {
            labels: { rotate: -90 },
            title: { text: xAxisTitle },
            categories: labels,
        },
        yaxis: {
            title: { text: yAxisTitle },
            labels: {
                formatter: (val: number) => Number(val).toFixed(0),
            },
        },
        grid: {
            show: false,
        },
        legend: {
            horizontalAlign: 'right' as const,
            offsetY: 0,
        },
    };

    const chartOptions = mergeOptions(baseChartOptions, additionalOptions);

    return (
        <ReactApexChart
            series={data}
            type="bar"
            width={width}
            height={height}
            options={chartOptions}
        />
    );
};
