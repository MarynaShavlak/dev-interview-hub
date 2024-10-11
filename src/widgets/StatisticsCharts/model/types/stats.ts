import { ArticlePeriodDataChartsProps } from '@/features/ArticlePeriodDataCharts';
import { ActiveArticlesList } from '@/features/DashboardStats';
import { ActiveUsersList } from '@/features/UsersActivityChart';
import { ArticleRatingDistributionChartProps } from '@/features/ArticleRatingDistributionChart';
import { ArticleCategoriesChartsProps } from '@/features/ArticleCategoriesCharts';
import { ArticleCommentsChartsProps } from '@/features/ArticleCommentsCharts';

export interface ArticleStats {
    [key: string]: number;
}

export interface ArticleCommentCount {
    articleId: string;
    commentCount: number;
}

export interface StatisticsData {
    totalArticles: number;
    totalUsers: number;
    averageRating: number;
    averageViews: number;
    categories: string[];
    categoryData: ArticleCategoriesChartsProps['data'];
    articleCommentCounts: ArticleCommentsChartsProps['articleCommentCounts'];
    commentCountsByUser: ArticleCommentsChartsProps['commentCountsByUser'];

    commentCountsByArticle: Record<string, number>;
    ratingCountsByUser: Record<string, ArticleStats>;
    activeUsersList: ActiveUsersList;
    activeArticlesList: ActiveArticlesList;
    ratingDistributionMap: ArticleRatingDistributionChartProps['ratingDistributionMap'];
    monthlyDataByCategories: ArticlePeriodDataChartsProps['data'];
}
