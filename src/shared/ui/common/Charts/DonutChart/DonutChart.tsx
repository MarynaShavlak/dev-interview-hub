import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { toggleFeatures } from '@/shared/lib/features';
import { Theme } from '@/shared/const/theme';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';

interface DonutChartProps {
    data: number[];
    labels: string[];
    title?: string;
    legendPosition?: 'top' | 'right' | 'bottom' | 'left';
}

interface generateChartOptionsProps {
    labels: string[];
    title: string | undefined;
    fontFamily: string;
    monochromeColor: string;
    labelColor: string;
    customTheme: 'dark' | 'light';
    legendPosition?: 'top' | 'right' | 'bottom' | 'left';
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
        labelColor,
        customTheme,
        legendPosition,
    } = props;
    return {
        chart: {
            width: '100%',
            background: 'transparent',
        },
        labels,
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
            fontFamily,
            onItemHover: {
                highlightDataSeries: true,
            },
            onItemClick: {
                toggleDataSeries: true,
            },
            // width: 120,
            position: legendPosition,
        },
        stroke: {
            show: false,
        },
        theme: {
            mode: customTheme,
            monochrome: {
                enabled: true,
                color: monochromeColor,
                shadeTo: customTheme,
                shadeIntensity: 0.9,
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
        states: {
            normal: {
                filter: {
                    type: 'none',
                    value: 0,
                },
            },
            hover: {
                filter: {
                    type: 'darken',
                    value: 0.15,
                },
            },
            active: {
                allowMultipleDataPointsSelection: false,
                filter: {
                    type: 'darken',
                    value: 0.35,
                },
            },
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '45%',
                },
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

export const DonutChart = (props: DonutChartProps) => {
    const { data, labels, title, legendPosition = 'right' } = props;
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
    });

    return (
        <ReactApexChart
            series={data}
            type="donut"
            width={400}
            height="400"
            options={chartOptions}
        />
    );
};
