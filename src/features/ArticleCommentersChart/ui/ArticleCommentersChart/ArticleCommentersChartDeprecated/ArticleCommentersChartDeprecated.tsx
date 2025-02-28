import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';

import { TreemapChart } from '@/shared/ui/common/Charts/ui/TreemapChart';
import { ArticleCommentersChartProps } from '../../../model/types/types';
import { useCommentsByUsersChartData } from '../../../lib/hooks/useCommentsByUsersChartData';

export const ArticleCommentersChartDeprecated = memo(
    (props: ArticleCommentersChartProps) => {
        const { t } = useTranslation('admin');

        const { commentCountsByUser, className, chartDimensions } = props;
        const { commentsByUsersData } =
            useCommentsByUsersChartData(commentCountsByUser);

        return (
            <CardDeprecated className={className}>
                <TreemapChart
                    data={commentsByUsersData}
                    title={t('Розподіл користувачів за кількістю коментарів')}
                    height={chartDimensions.height}
                    width={chartDimensions.width}
                />
            </CardDeprecated>
        );
    },
);
