import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useBaseChartOptions } from '../../lib/hooks/useBaseChartOptions/useBaseChartOptions';
import { mergeOptions } from '../../lib/utilities/mergeOptions/mergeOptions';
import { BaseChartProps } from '../types';

interface TreemapChartProps extends BaseChartProps {
    data: { x: string; y: number }[];
}

export const TreemapChart = (props: TreemapChartProps) => {
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

    return (
        <ReactApexChart
            series={seriesData}
            type="treemap"
            width={width}
            height={height}
            options={chartOptions}
        />
    );
};
