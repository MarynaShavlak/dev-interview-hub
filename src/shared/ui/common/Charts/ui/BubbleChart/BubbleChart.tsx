import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useBaseChartOptions } from '../../lib/hooks/useBaseChartOptions/useBaseChartOptions';
import { mergeOptions } from '../../lib/utilities/mergeOptions/mergeOptions';
import { BaseChartProps } from '../types';

interface BubbleChartProps extends BaseChartProps {
    data: ApexAxisChartSeries;
    minXaxisValue?: number;
    maxXaxisValue?: number;
    maxYaxisValue?: number;
    tooltipData: { x: string; y: string; z: string };
}

export const BubbleChart = (props: BubbleChartProps) => {
    const {
        data,
        title,
        width = '400',
        height = '500',
        minXaxisValue = 0,
        maxXaxisValue,
        maxYaxisValue = 0,
        xAxisTitle,
        yAxisTitle,
        legendPosition,
        tooltipData,
    } = props;

    const baseChartOptions = useBaseChartOptions({
        title,
        width,
        legendPosition,
    });

    const additionalOptions: ApexCharts.ApexOptions = {
        xaxis: {
            labels: { rotate: -90 },
            title: { text: xAxisTitle },
            min: minXaxisValue,
            max: maxXaxisValue,
            tickAmount: 10,
        },
        legend: {
            show: false,
        },
        yaxis: {
            title: { text: yAxisTitle },
            max: maxYaxisValue,
            labels: {
                formatter: (value) => {
                    return String(value);
                },
            },
        },

        plotOptions: {
            bubble: {
                zScaling: true,
            },
        },
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            custom: ({ seriesIndex, dataPointIndex, w }) => {
                const data =
                    w.globals.initialSeries[seriesIndex]?.data[dataPointIndex];

                const { x, y, z } = tooltipData;

                if (data) {
                    return `
                        <div style="padding:5px;">
                            <b>${w.globals.seriesNames[seriesIndex]}</b><br/>
                            <b>${y}:</b> ${data[1]}<br/>
                            <b>${x}:</b> ${data[0]}%<br/>
                            <b>${z}:</b> ${data[2]}
                        </div>`;
                }

                return '';
            },
        },
    };

    const chartOptions: ApexCharts.ApexOptions = mergeOptions(
        baseChartOptions,
        additionalOptions,
    );

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
