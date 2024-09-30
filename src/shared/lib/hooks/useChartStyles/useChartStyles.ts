import { useMemo } from 'react';
import { toggleFeatures } from '../../features';
import { Theme } from '@/shared/const/theme';
import { useTheme } from '../useTheme/useTheme';

export const useChartStyles = () => {
    const { theme } = useTheme();
    const fontFamily = useMemo(() => {
        return toggleFeatures({
            name: 'isAppRedesigned',
            on: () => '"Nunito Sans", sans-serif',
            off: () => '"Times New Roman", serif',
        });
    }, []);

    const labelColor = useMemo(() => {
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
                return '#000000';
        }
    }, [theme]);

    const monochromeColor = useMemo(() => {
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
                return '#000000';
        }
    }, [theme]);

    const chartTheme =
        theme === Theme.DARK ? ('dark' as const) : ('light' as const);

    return {
        fontFamily,
        labelColor,
        monochromeColor,
        chartTheme,
    };
};
