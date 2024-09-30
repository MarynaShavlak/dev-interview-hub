import React from 'react';
import ReactApexChart from 'react-apexcharts';

import { useChartStyles } from '@/shared/lib/hooks/useChartStyles/useChartStyles';

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
    chartTheme: 'dark' | 'light';
    legendPosition?: 'top' | 'right' | 'bottom' | 'left';
}

const generateChartOptions = (props: generateChartOptionsProps) => {
    const {
        labels,
        title,
        fontFamily,
        monochromeColor,
        labelColor,
        chartTheme,
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
            mode: chartTheme,
            monochrome: {
                enabled: true,
                color: monochromeColor,
                shadeTo: chartTheme,
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
