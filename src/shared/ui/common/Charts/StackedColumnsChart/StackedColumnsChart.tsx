import React from 'react';
import ReactApexChart from 'react-apexcharts';
import dayjs from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useChartStyles } from '@/shared/lib/hooks/useChartStyles/useChartStyles';

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

const generateChartOptions = (props: generateChartOptionsProps) => {
    const {
        labels,
        title,
        labelColor,
        fontFamily,
        monochromeColor,
        chartTheme,
        legendPosition,
        width,
        height,
        xAxisTitle,
        yAxisTitle,
    } = props;
    return {
        chart: {
            width,
            height,
            background: 'transparent',
            zoom: {
                enabled: false,
            },
            stacked: true,
        },
        grid: {
            show: false,
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
        title: {
            text: title,
            align: 'left' as const,
            style: {
                fontSize: '16px',
                fontWeight: 'bold',
                fontFamily,
            },
        },
        legend: {
            horizontalAlign: 'right' as const,
            offsetY: 0,
            fontFamily,
            onItemHover: {
                highlightDataSeries: true,
            },
            onItemClick: {
                toggleDataSeries: true,
            },
            position: legendPosition,
        },
        theme: {
            mode: chartTheme,
            monochrome: {
                enabled: true,
                color: monochromeColor,
                shadeTo: chartTheme,
                shadeIntensity: 1,
            },
        },
        tooltip: {
            style: {
                fontSize: '12px',
                fontFamily,
            },
            onDatasetHover: {
                highlightDataSeries: false,
            },
        },
        dataLabels: {
            enabled: true,
            textAnchor: 'middle' as const,
            style: {
                fontFamily,
                fontWeight: '600',
                colors: [labelColor],
            },
            dropShadow: {
                enabled: false,
            },
        },
    };
};

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

    const chartOptions = generateChartOptions({
        labels,
        title,
        fontFamily,
        monochromeColor,
        labelColor,
        chartTheme,
        legendPosition,
        xAxisTitle,
        yAxisTitle,
    });

    const d = [
        {
            name: 'PRODUCT A',
            data: [44, 55, 41, 67, 22, 43],
        },
        {
            name: 'PRODUCT B',
            data: [13, 23, 20, 8, 13, 27],
        },
        {
            name: 'PRODUCT C',
            data: [11, 17, 15, 15, 21, 14],
        },
        {
            name: 'PRODUCT D',
            data: [21, 7, 25, 13, 22, 8],
        },
    ];

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
