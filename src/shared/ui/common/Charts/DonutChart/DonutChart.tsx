import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { toggleFeatures } from '@/shared/lib/features';
import { Theme } from '@/shared/const/theme';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';

interface DonutChartProps {
    data: number[];
    labels: string[];
    title?: string;
}

export const DonutChart = (props: DonutChartProps) => {
    const { data, labels, title } = props;
    const { theme } = useTheme();

    const fontFamily = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => 'Nunito Sans", sans-serif',
        off: () => 'Times New Roman", serif',
    });

    const customTheme =
        theme === Theme.DARK ? ('dark' as const) : ('light' as const);
    let monochromeColor;
    let labelColor;

    switch (theme) {
        case Theme.DARK:
            monochromeColor = toggleFeatures({
                name: 'isAppRedesigned',
                on: () => '#5ed3f3',
                off: () => '#049604',
            });
            break;

        case Theme.LIGHT:
            monochromeColor = toggleFeatures({
                name: 'isAppRedesigned',
                on: () => '#00c8ff',
                off: () => '#0232c2',
            });
            break;

        case Theme.ORANGE:
            monochromeColor = toggleFeatures({
                name: 'isAppRedesigned',
                on: () => '#4875f0',
                off: () => '#bd5012',
            });
            break;

        default:
            monochromeColor = '#000000'; // Fallback color if none of the cases match
            break;
    }

    switch (theme) {
        case Theme.DARK:
            labelColor = toggleFeatures({
                name: 'isAppRedesigned',
                on: () => '#dbdbdb',
                off: () => '#e8e8ea',
            });
            break;

        case Theme.LIGHT:
            labelColor = toggleFeatures({
                name: 'isAppRedesigned',
                on: () => '#141c1f',
                off: () => '#e8e8ea',
            });
            break;

        case Theme.ORANGE:
            labelColor = toggleFeatures({
                name: 'isAppRedesigned',
                on: () => '#1b1311',
                off: () => '#faf4fb',
            });
            break;

        default:
            labelColor = '#000000';
            break;
    }

    const chartOptions = {
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
                // color: headerColor,
            },
        },
        legend: {
            fontFamily,
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
