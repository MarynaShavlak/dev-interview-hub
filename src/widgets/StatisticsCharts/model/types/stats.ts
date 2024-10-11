import { ArticlePeriodDataChartsProps } from '@/features/ArticlePeriodDataCharts';
import { ActiveArticlesList } from '@/features/DashboardStats';
import { ActiveUsersList } from '@/features/UsersActivityChart';
import { ArticleRatingDistributionChartProps } from '@/features/ArticleRatingDistributionChart';
import { ArticleCategoriesChartsProps } from '@/features/ArticleCategoriesCharts';
import { ArticleCommentsChartsProps } from '@/features/ArticleCommentsCharts';
import { UserRatingsBubbleChartProps } from '@/features/UserRatingsBubbleChart';

export interface ArticleStats {
    [key: string]: number;
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
    ratingCountsByUser: UserRatingsBubbleChartProps['data'];
    activeUsersList: ActiveUsersList;
    activeArticlesList: ActiveArticlesList;
    ratingDistributionMap: ArticleRatingDistributionChartProps['ratingDistributionMap'];
    monthlyDataByCategories: ArticlePeriodDataChartsProps['data'];
}
