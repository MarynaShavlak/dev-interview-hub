import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/ui/redesigned/Card';

import { BarChart } from '@/shared/ui/common/Charts/ui/BarChart';
import { TreemapChart } from '@/shared/ui/common/Charts/ui/TreemapChart';
import { HStack } from '@/shared/ui/common/Stack';
import { ArticleCommentsChartsProps } from '../ArticleCommentsCharts';

export const RedesignedArticleCommentsCharts = (
    props: ArticleCommentsChartsProps,
) => {
    const { t } = useTranslation('admin');

    const { articleCommentsLabels, articleCommentsData, commentsByUsersData } =
        props;

    return (
        <HStack gap="16">
            <Card>
                <BarChart
                    data={articleCommentsData}
                    labels={articleCommentsLabels}
                    title={t('Рейтинг статей за кількістю коментарів')}
                    legendPosition="top"
                    xAxisTitle={t('ID статті')}
                    yAxisTitle={t('Кількість коментарів')}
                    height="300"
                    width="334"
                />
            </Card>
            <Card>
                <TreemapChart
                    data={commentsByUsersData}
                    title={t('Розподіл користувачів за кількістю коментарів')}
                    height="300"
                    width="434"
                />
            </Card>
        </HStack>
    );
};
