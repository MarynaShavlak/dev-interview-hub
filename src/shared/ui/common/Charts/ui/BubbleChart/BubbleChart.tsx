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
        yaxis: {
            title: { text: yAxisTitle },
            max: maxYaxisValue,
        },

        plotOptions: {
            bubble: {
                zScaling: true,
                minBubbleRadius: 20,
            },
        },
        tooltip: {
            custom({ seriesIndex, dataPointIndex, w }) {
                const data =
                    w.globals.initialSeries[seriesIndex].data[dataPointIndex];
                console.log('data', data);
                const { x, y, z } = tooltipData;
                return `<div style="padding:5px;">
         <b>${w.globals.seriesNames[seriesIndex]}</b> <br/>
          <b>${y}:</b> ${data[1]}<br/>
          <b>${x}:</b> ${data[0]}%<br/>
          <b>${z}:</b> ${data[2]}</div>`;
            },
        },
    };

    const chartOptions: ApexCharts.ApexOptions = mergeOptions(
        baseChartOptions,
        additionalOptions,
    );
    console.log('chartOptions', chartOptions);

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
