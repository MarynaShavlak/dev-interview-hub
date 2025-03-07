import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useBaseChartOptions } from '../../lib/hooks/useBaseChartOptions/useBaseChartOptions';
import { mergeOptions } from '../../lib/utilities/mergeOptions/mergeOptions';
import { BaseChartProps } from '../types';
import { NoDataChart } from '../NoDataChart/NoDataChart';

interface StackedColumnsChartProps extends BaseChartProps {
    data: { name: string; data: number[] }[];
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

    const additionalOptions: ApexCharts.ApexOptions = {
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

        legend: {
            horizontalAlign: 'right' as const,
            offsetY: 0,
            markers: {
                shape: 'circle' as const,
            },
        },
    };

    const chartOptions = mergeOptions(baseChartOptions, additionalOptions);
    if (data.length === 0) {
        return <NoDataChart title={title} width={width} height={height} />;
    }
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
