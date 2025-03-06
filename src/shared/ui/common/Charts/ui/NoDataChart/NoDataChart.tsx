import React from 'react';

import { useTranslation } from 'react-i18next';
import { BaseChartProps } from '../types';
import EmptyChart from '@/shared/assets/icons/emptyChart.svg';
import { VStack } from '../../../Stack';

import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Text } from '../../../../redesigned/Text';
import { Text as TextDeprecated } from '../../../../deprecated/Text';

export const NoDataChart = (props: BaseChartProps) => {
    const { width = '200', height = '200', title } = props;

    const { t } = useTranslation();
    const noDataText = t('Дані для побудови графіку відсутні');

    return (
        <VStack justify="center" align="center">
            <EmptyChart width={width} height={height} />
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<Text text={`${title}: ${noDataText}`} />}
                off={<TextDeprecated text={`${title}: ${noDataText}`} />}
            />
        </VStack>
    );
};
