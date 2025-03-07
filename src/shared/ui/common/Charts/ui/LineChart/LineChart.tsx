import React from 'react';
import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts';
import { useBaseChartOptions } from '../../lib/hooks/useBaseChartOptions/useBaseChartOptions';
import { mergeOptions } from '../../lib/utilities/mergeOptions/mergeOptions';
import { BaseChartProps } from '../types';
import { NoDataChart } from '../NoDataChart/NoDataChart';

interface LineChartProps extends BaseChartProps {
    data: { name: string; data: number[] }[];
    markers?: Boolean;
}

export const LineChart = (props: LineChartProps) => {
    const {
        data,
        labels,
        title,
        legendPosition,
        width = '400',
        height = '320',
        xAxisTitle,
        yAxisTitle,
        markers,
    } = props;

    const baseChartOptions = useBaseChartOptions({
        title,
        legendPosition,
        width,
    });

    const additionalOptions: ApexCharts.ApexOptions = {
        stroke: {
            show: true,
            curve: 'smooth' as const,
            width: 2,
        },

        xaxis: {
            labels: { rotate: -90 },
            title: {
                text: xAxisTitle,
            },
            categories: labels,
        },
        yaxis: {
            title: {
                text: yAxisTitle,
            },
        },
        legend: {
            horizontalAlign: 'right' as const,
            offsetY: 0,
            markers: {
                shape: 'circle' as const,
            },
        },
        dataLabels: { enabled: false },
        ...(markers && {
            markers: {
                size: 6,
                strokeWidth: 0,
                hover: {
                    size: 9,
                },
            },
        }),
    };

    const chartOptions = mergeOptions(baseChartOptions, additionalOptions);
    if (data.length === 0) {
        return <NoDataChart title={title} width={width} height={height} />;
    }
    return (
        <ReactApexChart
            series={data}
            type="line"
            width={width}
            height={height}
            options={chartOptions}
        />
    );
};
