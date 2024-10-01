import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useChartStyles } from '../../lib/hooks/useChartStyles/useChartStyles';

interface LineChartProps {
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
    xAxisTitle?: string;
    yAxisTitle?: string;
}

const generateChartOptions = (props: generateChartOptionsProps) => {
    const {
        labels,
        title,
        fontFamily,
        monochromeColor,
        chartTheme,
        legendPosition,
        width,
        xAxisTitle,
        yAxisTitle,
    } = props;
    return {
        chart: {
            width,
            background: 'transparent',
            zoom: {
                enabled: false,
            },
        },
        stroke: {
            curve: 'smooth' as const,
            width: 2,
        },
        markers: {
            size: 6,
            strokeWidth: 0,
            hover: {
                size: 9,
            },
        },
        grid: {
            show: false,
            padding: {
                bottom: 0,
            },
        },
        xaxis: {
            tooltip: {
                enabled: true,
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
            title: {
                text: yAxisTitle,
                style: {
                    fontSize: '12px',
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
            offsetY: 20,
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
            enabled: true,
            style: {
                fontSize: '12px',
                fontFamily,
            },
            onDatasetHover: {
                highlightDataSeries: false,
            },
        },
    };
};

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
            name: 'Music',
            data: [1, 15, 26, 20, 33, 27],
        },
        {
            name: 'Photos',
            data: [3, 33, 21, 42, 19, 32],
        },
        {
            name: 'Files',
            data: [0, 39, 52, 11, 29, 43],
        },
    ];

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
