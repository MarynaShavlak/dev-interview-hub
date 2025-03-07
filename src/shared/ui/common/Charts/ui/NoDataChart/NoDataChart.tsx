import React from 'react';

import { useTranslation } from 'react-i18next';
import { BaseChartProps } from '../types';
import EmptyChart from '@/shared/assets/icons/emptyChart.svg';
import { VStack } from '../../../Stack';

import { toggleFeatures, ToggleFeaturesComponent } from '@/shared/lib/features';
import { Text } from '../../../../redesigned/Text';
import { Text as TextDeprecated, TextAlign } from '../../../../deprecated/Text';
import { Box } from '../../../Box';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from './NoDataChart.module.scss';

export const NoDataChart = (props: BaseChartProps) => {
    const { width = '200', height = '200', title } = props;

    const { t } = useTranslation();
    const noDataText = t('Дані для побудови графіку відсутні');
    const flexClasses = getFlexClasses({
        vStack: true,
        align: 'center',
        justify: 'between',
    });
    const chartHeight = String(Number(height) - 60);
    const colorClass = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => cls.colorRedesigned,
        off: () => cls.color,
    });
    return (
        <VStack
            justify="center"
            align="center"
            className={classNames(cls.wrapper, {}, [colorClass])}
        >
            <EmptyChart width={width} height={chartHeight} />
            <Box
                width={`${width}px`}
                height="60px"
                className={classNames('', {}, flexClasses)}
            >
                <ToggleFeaturesComponent
                    feature="isAppRedesigned"
                    on={<Text text={`${title}`} align="center" />}
                    off={
                        <TextDeprecated
                            text={`${title}`}
                            align={TextAlign.CENTER}
                        />
                    }
                />
                <ToggleFeaturesComponent
                    feature="isAppRedesigned"
                    on={<Text text={`${noDataText}`} align="center" />}
                    off={
                        <TextDeprecated
                            text={`${noDataText}`}
                            align={TextAlign.CENTER}
                        />
                    }
                />
            </Box>
        </VStack>
    );
};
