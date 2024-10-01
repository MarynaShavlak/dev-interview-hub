import React from 'react';
import { useTranslation } from 'react-i18next';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { DonutChart } from '@/shared/ui/common/Charts/DonutChart/DonutChart';
import { useArticles } from '@/entities/Article';
import { StackedColumnsChart } from '@/shared/ui/common/Charts/StackedColumnsChart';
import { useArticleCategoryData } from '../../lib/hook/useArticleCategoryData/useArticleCategoryData';
import { useArticleQuarterlyData } from '../../lib/hook/useArticleQuarterlyData/useArticleQuarterlyData';
import { BarChart } from '@/shared/ui/common/Charts/BarChart';
import { useArticlesComments } from '../../api/articlesCommentsApi';

export interface ArticlesCategoryNumberData {
    [category: string]: number;
}

export const ArticleCategoriesChart = () => {
    const { t } = useTranslation('admin');
    const { data: articles, isLoading: isArticlesLoading } = useArticles(null);
    const { data: comments, isLoading: isArticlesCommentsLoading } =
        useArticlesComments(null);
    console.log(comments);

    const arr: { articleId: string; comments: number }[] = [];

    const articleCommentCount: ArticlesCategoryNumberData = {};
    comments?.forEach((comment) => {
        const { articleId } = comment;
        if (articleCommentCount[articleId]) {
            articleCommentCount[articleId] += 1;
        } else {
            articleCommentCount[articleId] = 1;
        }
    });

    console.log(articleCommentCount);

    const resultArray = Object.entries(articleCommentCount)
        .map(([articleId, comments]) => {
            return { articleId, comments };
        })
        .sort((a, b) => b.comments - a.comments);

    console.log(resultArray);
    const commentsLabels = resultArray.map((item) => item.articleId);
    console.log(commentsLabels);

    const commentsData = resultArray.map((item) => item.comments);
    console.log(commentsData);

    const {
        labels: categoryLabels,
        articleData: articlesQuantityByCategoriesData,
        viewData: articleViewsByCategoriesData,
    } = useArticleCategoryData();

    const { periodLabels, chartData } = useArticleQuarterlyData();

    return (
        <VStack gap="24">
            <HStack gap="24">
                <DonutChart
                    data={articlesQuantityByCategoriesData}
                    labels={categoryLabels}
                    title={t('Cтатті за категоріями, %')}
                    legendPosition="bottom"
                />
                <DonutChart
                    data={articleViewsByCategoriesData}
                    labels={categoryLabels}
                    title={t('Перегляди статей за категоріями, %')}
                    legendPosition="bottom"
                />
            </HStack>
            <StackedColumnsChart
                data={chartData}
                labels={periodLabels}
                title={t('Динаміка кількості статей')}
                legendPosition="top"
                xAxisTitle={t('Місяць')}
                yAxisTitle={t('Кількість статей')}
                height="500"
                width="700"
            />
            <BarChart
                data={commentsData}
                labels={commentsLabels}
                title={t('Рейтинг статей за кількістю коментарів')}
                legendPosition="top"
                xAxisTitle={t('ID статті')}
                yAxisTitle={t('Кількість коментарів')}
                height="500"
                width="700"
            />
        </VStack>
    );
};

const comments = [
    { id: 'ff33gg1', articleId: '1' },
    { id: 'ff1gg', articleId: '1' },
    { id: 'ff66gg', articleId: '1' },
    { id: 'ff1gg', articleId: '1' },
    { id: 'ff88gg', articleId: '1' },
    { id: 'ff234gg', articleId: '2' },
    { id: 'ff676gg', articleId: '2' },
    { id: 'ff53gg', articleId: '2' },
    { id: 'ff5346gg', articleId: '3' },
    { id: 'ff235gg', articleId: '2' },
    { id: 'ffibiigg', articleId: '3' },
    { id: 'ffgggg', articleId: '3' },
    { id: 'fflxllgg', articleId: '4' },
    { id: 'fbbbfgg', articleId: '4' },
    { id: 'ffooogg', articleId: '4' },
    { id: 'ffaaagg', articleId: '4' },
    { id: 'ffqqqgg', articleId: '4' },
    { id: 'fflllxgg', articleId: '4' },
    { id: 'fflllxgg', articleId: '4' },
];

const commentsCount = {
    '4': 7,
    '1': 5,
    '2': 4,
};
