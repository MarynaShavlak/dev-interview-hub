import { useTranslation } from 'react-i18next';
import React from 'react';
import { BubbleChart } from '@/shared/ui/common/Charts/ui/BubbleChart';
import { Card } from '@/shared/ui/redesigned/Card';
import { useArticleRatingsChartsData } from '../../lib/hooks/useArticleRatingsChartsData';

export const ArticleRatingsDataCharts = () => {
    const { t } = useTranslation();
    const { articleRatingsByUsersData } = useArticleRatingsChartsData();
    // console.log(' articleRatingsByUsersData ', articleRatingsByUsersData);
    return (
        <Card>
            <BubbleChart data={articleRatingsByUsersData} width="800" />
        </Card>
    );
};
