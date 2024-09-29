import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { toggleFeatures } from '@/shared/lib/features';
import { Theme } from '@/shared/const/theme';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';

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
    customTheme: 'dark' | 'light';
    legendPosition?: 'top' | 'right' | 'bottom' | 'left';
    width?: string;
    xAxisTitle?: string;
    yAxisTitle?: string;
}

const getFontFamily = () =>
    toggleFeatures({
        name: 'isAppRedesigned',
        on: () => 'Nunito Sans", sans-serif',
        off: () => 'Times New Roman", serif',
    });

const getMonochromeColor = (theme: Theme) => {
    switch (theme) {
        case Theme.DARK:
            return toggleFeatures({
                name: 'isAppRedesigned',
                on: () => '#5ed3f3',
                off: () => '#049604',
            });
        case Theme.LIGHT:
            return toggleFeatures({
                name: 'isAppRedesigned',
                on: () => '#00c8ff',
                off: () => '#0232c2',
            });
        case Theme.ORANGE:
            return toggleFeatures({
                name: 'isAppRedesigned',
                on: () => '#4875f0',
                off: () => '#bd5012',
            });
        default:
            return '#000000'; // Fallback color
    }
};

const getLabelColor = (theme: Theme) => {
    switch (theme) {
        case Theme.DARK:
            return toggleFeatures({
                name: 'isAppRedesigned',
                on: () => '#dbdbdb',
                off: () => '#e8e8ea',
            });
        case Theme.LIGHT:
            return toggleFeatures({
                name: 'isAppRedesigned',
                on: () => '#141c1f',
                off: () => '#e8e8ea',
            });
        case Theme.ORANGE:
            return toggleFeatures({
                name: 'isAppRedesigned',
                on: () => '#1b1311',
                off: () => '#faf4fb',
            });
        default:
            return '#000000'; // Fallback color
    }
};

const generateChartOptions = (props: generateChartOptionsProps) => {
    const {
        labels,
        title,
        fontFamily,
        monochromeColor,
        customTheme,
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
            mode: customTheme,
            monochrome: {
                enabled: true,
                color: monochromeColor,
                shadeTo: customTheme,
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
        legendPosition = 'right',
        width = '400',
        height = '320',
        xAxisTitle,
        yAxisTitle,
    } = props;
    const { theme } = useTheme();

    const fontFamily = getFontFamily();
    const monochromeColor = getMonochromeColor(theme);
    const labelColor = getLabelColor(theme);

    const customTheme =
        theme === Theme.DARK ? ('dark' as const) : ('light' as const);

    const chartOptions = generateChartOptions({
        labels,
        title,
        fontFamily,
        monochromeColor,
        labelColor,
        customTheme,
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
