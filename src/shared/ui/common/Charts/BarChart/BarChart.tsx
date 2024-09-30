import React from 'react';
import ReactApexChart from 'react-apexcharts';
import dayjs from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { useChartStyles } from '@/shared/lib/hooks/useChartStyles/useChartStyles';

dayjs.extend(quarterOfYear);
dayjs.extend(customParseFormat);

interface BarChartProps {
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
            categories: [
                'South Korea',
                'Canada',
                'United Kingdom',
                'Netherlands',
                'Italy',
                'France',
                'Japan',
                'United States',
                'China',
                'Germany',
            ],
            // categories: labels,
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
                    return `${val}`;
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
            name: xAxisTitle,
            data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
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
