import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';

import { HStack } from '@/shared/ui/common/Stack';
import { BarChart } from '@/shared/ui/common/Charts/ui/BarChart';
import { TreemapChart } from '@/shared/ui/common/Charts/ui/TreemapChart';
import { ArticleCommentsChartsProps } from '../../../model/types/types';
import { useArticleCommentsChartData } from '../../../lib/hooks/useArticleCommentsChartData';

export const DeprecatedArticleCommentsCharts = memo(
    (props: ArticleCommentsChartsProps) => {
        const { t } = useTranslation('admin');

        const { articleCommentCounts, commentCountsByUser, className } = props;
        const { labels, commentsByArticlesData, commentsByUsersData } =
            useArticleCommentsChartData(
                articleCommentCounts,
                commentCountsByUser,
            );

        return (
            <HStack gap="16" className={className}>
                <CardDeprecated>
                    <BarChart
                        data={commentsByArticlesData}
                        labels={labels}
                        title={t('Рейтинг статей за кількістю коментарів')}
                        legendPosition="top"
                        xAxisTitle={t('ID статті')}
                        yAxisTitle={t('Кількість коментарів')}
                        height="300"
                        width="334"
                    />
                </CardDeprecated>
                <CardDeprecated>
                    <TreemapChart
                        data={commentsByUsersData}
                        title={t(
                            'Розподіл користувачів за кількістю коментарів',
                        )}
                        height="300"
                        width="420"
                    />
                </CardDeprecated>
            </HStack>
        );
    },
);
