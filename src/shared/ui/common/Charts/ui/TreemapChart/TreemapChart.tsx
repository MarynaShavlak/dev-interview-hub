import React from 'react';
import ReactApexChart from 'react-apexcharts';

import { useChartStyles } from '../../lib/hooks/useChartStyles/useChartStyles';

interface TreemapChartProps {
    data: { x: string; y: number }[];
    title?: string;
    width?: string;
    height?: string;
}

interface generateChartOptionsProps {
    title: string | undefined;
    fontFamily: string;
    monochromeColor: string;
    labelColor: string;
    chartTheme: 'dark' | 'light';
    width?: string;
    height?: string;
}

const generateChartOptions = (props: generateChartOptionsProps) => {
    const {
        title,
        labelColor,
        fontFamily,
        monochromeColor,
        chartTheme,
        width,
        height,
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
        title: {
            text: title,
            align: 'left' as const,
            style: {
                fontSize: '16px',
                fontWeight: 'bold',
                fontFamily,
            },
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

export const TreemapChart = (props: TreemapChartProps) => {
    const { data, title, width = '400', height = '500' } = props;

    const { fontFamily, labelColor, monochromeColor, chartTheme } =
        useChartStyles();

    const chartOptions = generateChartOptions({
        title,
        fontFamily,
        monochromeColor,
        labelColor,
        chartTheme,
        width,
        height,
    });

    const seriesData = [{ data }];

    return (
        <ReactApexChart
            series={seriesData}
            type="treemap"
            width={width}
            height={height}
            options={chartOptions}
        />
    );
};
