import React from 'react';
import ReactApexChart from 'react-apexcharts';

import { useChartStyles } from '../../lib/hooks/useChartStyles/useChartStyles';

interface BarChartProps {
    data: number[];
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
                    fontSize: '12px',
                    fontWeight: 'bold',
                    fontFamily,
                },
            },
            labels: {
                style: {
                    fontSize: '10px',
                    fontWeight: 'bold',
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
            x: {
                formatter(val: number) {
                    return `${xAxisTitle}: ${val}`;
                },
            },
            y: {
                formatter: undefined,
                title: {
                    formatter: (seriesName: string) => seriesName,
                },
            },
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
        plotOptions: {
            bar: {
                horizontal: false,
            },
        },
    };
};

export const BarChart = (props: BarChartProps) => {
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
            name: yAxisTitle,
            data,
        },
    ];

    return (
        <ReactApexChart
            series={d}
            type="bar"
            width={width}
            height={height}
            options={chartOptions}
        />
    );
};
