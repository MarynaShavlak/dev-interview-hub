import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/ui/redesigned/Card';

import { BarChart } from '@/shared/ui/common/Charts/ui/BarChart';
import { TreemapChart } from '@/shared/ui/common/Charts/ui/TreemapChart';
import { ArticleCommentsChartsProps } from '../../../model/types/types';
import { useArticleCommentsChartData } from '../../../lib/hooks/useArticleCommentsChartData';

export const RedesignedArticleCommentsCharts = memo(
    (props: ArticleCommentsChartsProps) => {
        const { t } = useTranslation('admin');

        const {
            articleCommentCounts,
            commentCountsByUser,
            className,
            isRatingChart,
            isDistributionChart,
        } = props;
        const { labels, commentsByArticlesData, commentsByUsersData } =
            useArticleCommentsChartData(
                articleCommentCounts,
                commentCountsByUser,
            );

        return (
            <>
                {isRatingChart && (
                    <Card className={className}>
                        <BarChart
                            data={commentsByArticlesData}
                            labels={labels}
                            title={t('Рейтинг статей за кількістю коментарів')}
                            legendPosition="top"
                            xAxisTitle={t('Назва статті')}
                            yAxisTitle={t('Кількість коментарів')}
                            height="300"
                            width="828"
                        />
                    </Card>
                )}
                {isDistributionChart && (
                    <Card className={className}>
                        <TreemapChart
                            data={commentsByUsersData}
                            title={t(
                                'Розподіл користувачів за кількістю коментарів',
                            )}
                            height="220"
                            width="576"
                        />
                    </Card>
                )}
            </>
        );
    },
);
