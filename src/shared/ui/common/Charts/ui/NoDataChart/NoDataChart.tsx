import React from 'react';

import { useTranslation } from 'react-i18next';
import { BaseChartProps } from '../types';
import EmptyChart from '@/shared/assets/icons/emptyChart.svg';
import { VStack } from '../../../Stack';

import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Text } from '../../../../redesigned/Text';
import { Text as TextDeprecated, TextAlign } from '../../../../deprecated/Text';
import { Box } from '../../../Box';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { classNames } from '@/shared/lib/classes/classNames/classNames';

export const NoDataChart = (props: BaseChartProps) => {
    const { width = '200', height = '200', title } = props;

    const { t } = useTranslation();
    const noDataText = t('Дані для побудови графіку відсутні');
    const flexClasses = getFlexClasses({ vStack: true, align: 'center' });

    return (
        <VStack justify="center" align="center">
            <EmptyChart width={width} height={height} />
            <Box
                width={`${width}px`}
                height={`${height}px`}
                className={classNames('', {}, flexClasses)}
            >
                <ToggleFeaturesComponent
                    feature="isAppRedesigned"
                    on={<Text text={`${title}: `} align="center" />}
                    off={
                        <TextDeprecated
                            text={`${title}: `}
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
