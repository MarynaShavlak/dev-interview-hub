import React from 'react';
import ReactApexChart from 'react-apexcharts';
import dayjs from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { toggleFeatures } from '@/shared/lib/features';
import { Theme } from '@/shared/const/theme';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';

dayjs.extend(quarterOfYear);
dayjs.extend(customParseFormat);

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
    height?: string;
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
        labelColor,
        fontFamily,
        monochromeColor,
        customTheme,
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
                    fontSize: '12px',
                    fontWeight: 'bold',
                    fontFamily,
                },
            },
            labels: {
                formatter(val: number) {
                    return Number(val).toFixed(0);
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

export const BarChart = (props: LineChartProps) => {
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

const a = [
    {
        id: 1,
        text: 'article text',
        categories: ['category1', 'category2', 'new category'],
        createdAt: '29.10.2015',
    },
    {
        id: 2,
        text: 'article text 2',
        categories: ['category1', 'category2'],
        createdAt: '12.01.2017',
    },
    {
        id: 3,
        text: 'article text 3',
        categories: ['category1', 'new category'],
        createdAt: '02.06.2017',
    },
    {
        id: 4,
        text: 'article text 4',
        categories: ['category2'],
        createdAt: '13.02.2017',
    },
    {
        id: 5,
        text: 'article text 4',
        categories: ['new category'],
        createdAt: '10.06.2018',
    },
];

const result = {
    'Q4/2015': {
        category1: 1,
        category2: 1,
        'new category': 1,
    },
    'Q1/2016': {
        category1: 0,
        category2: 0,
        'new category': 0,
    },
    'Q2/2016': {
        category1: 0,
        category2: 0,
        'new category': 0,
    },
    'Q3/2016': {
        category1: 0,
        category2: 0,
        'new category': 0,
    },
    'Q4/2016': {
        category1: 0,
        category2: 0,
        'new category': 0,
    },
    'Q1/2017': {
        category1: 1,
        category2: 2,
        'new category': 0,
    },
    'Q2/2017': {
        category1: 1,
        category2: 0,
        'new category': 1,
    },
    'Q3/2017': {
        category1: 0,
        category2: 0,
        'new category': 0,
    },
    'Q4/2017': {
        category1: 0,
        category2: 0,
        'new category': 0,
    },
    'Q1/2018': {
        category1: 0,
        category2: 0,
        'new category': 0,
    },
    'Q2/2018': {
        category1: 0,
        category2: 0,
        'new category': 0,
    },
    'Q3/2018': {
        category1: 0,
        category2: 0,
        'new category': 0,
    },
    'Q4/2018': {
        category1: 0,
        category2: 0,
        'new category': 1,
    },
};

const arr = [
    { name: 'category1', data: [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0] },
    { name: 'category2', data: [1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0] },
    { name: 'new category', data: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1] },
];
