import React from 'react';
import ReactApexChart from 'react-apexcharts';
import dayjs from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useChartStyles } from '../../lib/hooks/useChartStyles/useChartStyles';
import { useBaseChartOptions } from '../../lib/utilities/getCommonChartOptions/getCommonChartOptions';

dayjs.extend(quarterOfYear);
dayjs.extend(customParseFormat);

interface StackedColumnsChartProps {
    data: { name: string; data: number[] }[];
    labels: string[];
    title?: string;
    legendPosition?: 'top' | 'right' | 'bottom' | 'left';
    width?: string;
    height?: string;
    xAxisTitle?: string;
    yAxisTitle?: string;
}

interface generateChartOptionsProps {
    labels: string[];
    title: string | undefined;
    fontFamily: string;
    monochromeColor: string;
    labelColor: string;
    chartTheme: 'dark' | 'light';
    legendPosition?: 'top' | 'right' | 'bottom' | 'left';
    width?: string;
    height?: string;
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

    const { fontFamily, labelColor, monochromeColor, chartTheme } =
        useChartStyles();
    const baseChartOptions = useBaseChartOptions({
        title,
        legendPosition,
        width,
    });
    console.log('baseChartOptions', baseChartOptions);



    const chartOptions = {
        ...baseChartOptions,
        chart: {
            ...baseChartOptions.chart,
            stacked: true,
        },
        xaxis: {
            type: 'category' as const,
            labels: {
                rotate: -90,
            },

            title: {
                text: xAxisTitle,
                style: {
                    fontSize: '12px',
                    fontWeight: 'bold',
                    fontFamily,
                },
            },
            categories: labels,
        },
        yaxis: {
            show: true,
            title: {
                text: yAxisTitle,
                style: {
                    fontSize: '10px',
                    fontWeight: 'bold',
                    fontFamily,
                },
            },
            labels: {
                formatter(val: number) {
                    return Number(val).toFixed(0);
                },
                style: {
                    fontSize: '12px',
                    fontFamily,
                },
            },
        },
        grid: {
            show: false,
        },
        legend: {
            ...baseChartOptions.legend,
            horizontalAlign: 'right' as const,
            offsetY: 0,
        },
        // labels,
        // title,
        // fontFamily,
        // monochromeColor,
        // labelColor,
        // chartTheme,
        // legendPosition,
        // xAxisTitle,
        // yAxisTitle,
    };
    console.log('co:', chartOptions);

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
