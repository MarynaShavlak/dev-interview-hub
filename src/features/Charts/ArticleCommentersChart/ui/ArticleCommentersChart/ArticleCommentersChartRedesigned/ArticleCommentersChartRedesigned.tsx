import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/ui/redesigned/Card';

import { TreemapChart } from '@/shared/ui/common/Charts/ui/TreemapChart';
import { ArticleCommentersChartProps } from '../../../model/types/types';
import { useCommentsByUsersChartData } from '../../../lib/hooks/useCommentsByUsersChartData';

export const ArticleCommentersChartRedesigned = memo(
    (props: ArticleCommentersChartProps) => {
        const { t } = useTranslation('admin');

        const { commentCountsByUser, className, chartDimensions } = props;
        const { commentsByUsersData } =
            useCommentsByUsersChartData(commentCountsByUser);

        return (
            <Card className={className}>
                <TreemapChart
                    data={commentsByUsersData}
                    title={t('Розподіл користувачів за кількістю коментарів')}
                    height={chartDimensions.height}
                    width={chartDimensions.width}
                />
            </Card>
        );
    },
);
