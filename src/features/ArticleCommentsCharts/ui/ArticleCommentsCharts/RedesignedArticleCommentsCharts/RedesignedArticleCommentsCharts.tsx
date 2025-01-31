import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/ui/redesigned/Card';

import { BarChart } from '@/shared/ui/common/Charts/ui/BarChart';
import { TreemapChart } from '@/shared/ui/common/Charts/ui/TreemapChart';
import { HStack } from '@/shared/ui/common/Stack';
import { ArticleCommentsChartsProps } from '../../../model/types/types';
import { useArticleCommentsChartData } from '../../../lib/hooks/useArticleCommentsChartData';

export const RedesignedArticleCommentsCharts = memo(
    (props: ArticleCommentsChartsProps) => {
        const { t } = useTranslation('admin');

        const { articleCommentCounts, commentCountsByUser, className } = props;
        const { labels, commentsByArticlesData, commentsByUsersData } =
            useArticleCommentsChartData(
                articleCommentCounts,
                commentCountsByUser,
            );

        console.log('labels', labels);
        console.log('articleCommentCounts', articleCommentCounts);
        return (
            <HStack gap="16" className={className}>
                <Card>
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
                </Card>
                <Card>
                    <TreemapChart
                        data={commentsByUsersData}
                        title={t(
                            'Розподіл користувачів за кількістю коментарів',
                        )}
                        height="300"
                        width="434"
                    />
                </Card>
            </HStack>
        );
    },
);
