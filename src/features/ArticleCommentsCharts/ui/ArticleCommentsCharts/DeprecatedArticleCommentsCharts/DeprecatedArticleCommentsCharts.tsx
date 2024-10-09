import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';

import { VStack } from '@/shared/ui/common/Stack';
import { BarChart } from '@/shared/ui/common/Charts/ui/BarChart';
import { TreemapChart } from '@/shared/ui/common/Charts/ui/TreemapChart';
import { ArticleCommentsChartsProps } from '../ArticleCommentsCharts';

export const DeprecatedArticleCommentsCharts = (
    props: ArticleCommentsChartsProps,
) => {
    const { t } = useTranslation('admin');

    const { labels, commentsByArticlesData, commentsByUsersData } = props;

    return (
        <VStack gap="16">
            <CardDeprecated>
                <BarChart
                    data={commentsByArticlesData}
                    labels={labels}
                    title={t('Рейтинг статей за кількістю коментарів')}
                    legendPosition="top"
                    xAxisTitle={t('ID статті')}
                    yAxisTitle={t('Кількість коментарів')}
                    height="300"
                    width="700"
                />
            </CardDeprecated>
            <CardDeprecated>
                <TreemapChart
                    data={commentsByUsersData}
                    title={t(
                        'Розподіл активності користувачів за кількістю коментарів',
                    )}
                    height="300"
                    width="700"
                />
            </CardDeprecated>
        </VStack>
    );
};
