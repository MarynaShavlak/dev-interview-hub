import React from 'react';
import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts';

import { useBaseChartOptions } from '../../lib/hooks/useBaseChartOptions/useBaseChartOptions';
import { mergeOptions } from '../../lib/utilities/mergeOptions/mergeOptions';
import { BaseChartProps } from '../types';
import { NoDataChart } from '../NoDataChart/NoDataChart';

interface BarChartProps extends BaseChartProps {
    data: number[];
}

export const RadialbarChart = (props: BarChartProps) => {
    const {
        data,
        labels,
        title,
        legendPosition = 'right',
        width = '400',
        height = '500',
    } = props;

    const baseChartOptions = useBaseChartOptions({
        title,
        legendPosition,
        width,
    });

    const additionalOptions: ApexCharts.ApexOptions = {
        labels,
        plotOptions: {
            radialBar: {
                offsetY: 0,
                startAngle: 0,
                endAngle: 270,
                hollow: {
                    margin: 5,
                    size: '30%',
                    background: 'transparent',
                    image: undefined,
                },
                dataLabels: {
                    show: false,
                },
                barLabels: {
                    enabled: true,
                    useSeriesColors: true,
                    offsetX: -8,
                    fontSize: '12px',
                    formatter(seriesName, opts) {
                        return `${seriesName}:  ${
                            opts.w.globals.series[opts.seriesIndex]
                        }%`;
                    },
                },
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
            type="radialBar"
            width={width}
            height={height}
            options={chartOptions}
        />
    );
};
