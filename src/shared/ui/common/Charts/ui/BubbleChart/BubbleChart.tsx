import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useBaseChartOptions } from '../../lib/hooks/useBaseChartOptions/useBaseChartOptions';
import { mergeOptions } from '../../lib/utilities/mergeOptions/mergeOptions';
import { BaseChartProps } from '../types';

interface BubbleChartProps extends BaseChartProps {
    data: any[];
}

export const BubbleChart = (props: BubbleChartProps) => {
    const { data, title, width = '400', height = '500' } = props;

    const baseChartOptions = useBaseChartOptions({
        title,
        width,
    });

    const additionalOptions: ApexCharts.ApexOptions = {};

    const chartOptions: ApexCharts.ApexOptions = mergeOptions(
        baseChartOptions,
        additionalOptions,
    );

    const seriesData = [{ data }];
    const d = [
        {
            name: 'user1',
            data: [[7, 3.3, 19]],
        },
        {
            name: 'user2',
            data: [[2, 3.2, 21]],
        },
        {
            name: 'user3',
            data: [[4, 3.1, 17]],
        },
        {
            name: 'user4',
            data: [[4, 5, 14]],
        },
        {
            name: 'user5',
            data: [[3, 4.5, 6]],
        },
    ];

    return (
        <ReactApexChart
            series={data}
            type="bubble"
            width={width}
            height={height}
            options={chartOptions}
        />
    );
};
