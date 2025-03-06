import React from 'react';
import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts';

import { useBaseChartOptions } from '../../lib/hooks/useBaseChartOptions/useBaseChartOptions';
import { mergeOptions } from '../../lib/utilities/mergeOptions/mergeOptions';
import { BaseChartProps } from '../types';

import { NoDataChart } from '../NoDataChart/NoDataChart';

interface DonutChartProps extends BaseChartProps {
    data: number[];
}

export const PieChart = (props: DonutChartProps) => {
    const {
        data,
        labels,
        title,
        legendPosition = 'right',
        width = '200',
        height = '200',
    } = props;

    const baseChartOptions = useBaseChartOptions({
        title,
        legendPosition,
        width,
        height,
    });

    const additionalOptions: ApexCharts.ApexOptions = {
        states: {
            normal: {
                filter: {
                    type: 'none',
                    value: 0,
                },
            },
            hover: {
                filter: {
                    type: 'darken',
                    value: 0.15,
                },
            },
            active: {
                allowMultipleDataPointsSelection: false,
                filter: {
                    type: 'darken',
                    value: 0.35,
                },
            },
        },
        plotOptions: {
            pie: {
                // customScale: 1.2,
                startAngle: -90,
                endAngle: 90,
                offsetY: 50,
                donut: {
                    size: '150',
                },
            },
        },
        grid: {
            padding: {
                bottom: -85,
            },
        },
        labels,
    };

    const chartOptions = mergeOptions(baseChartOptions, additionalOptions);
    if (data.length === 0) {
        return <NoDataChart title={title} />;
    }

    return (
        <ReactApexChart
            series={data}
            type="donut"
            width={width}
            height={height}
            options={chartOptions}
        />
    );
};
