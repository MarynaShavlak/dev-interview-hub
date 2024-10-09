import React from 'react';
import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts';

import { useBaseChartOptions } from '../../lib/hooks/useBaseChartOptions/useBaseChartOptions';
import { mergeOptions } from '../../lib/utilities/mergeOptions/mergeOptions';
import { BaseChartProps } from '../types';

interface BarChartProps extends BaseChartProps {
    data: [number, number, number];
    totalLabel: string;
    totalValue?: string;
}

export const RadialbarChart = (props: BarChartProps) => {
    const {
        data,
        labels,
        title,
        legendPosition = 'right',
        width = '400',
        height = '500',
        totalLabel,
        totalValue,
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
                    // total: {
                    //     show: true,
                    //     label: totalLabel,
                    //     fontSize: '10px',
                    //     formatter(w) {
                    //         const res = (
                    //             w.config.series.reduce(
                    //                 (
                    //                     accumulator: number,
                    //                     currentValue: number,
                    //                 ) => accumulator + currentValue,
                    //                 0,
                    //             ) / w.config.series.length
                    //         ).toFixed(2);
                    //
                    //         return totalValue || `${res}%`;
                    //     },
                    // },
                    // value: {
                    //     fontSize: '16px',
                    //     fontWeight: 'bold',
                    // },
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
