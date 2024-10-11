import { ArticlePeriodDataChartsProps } from '@/features/ArticlePeriodDataCharts';
import { ActiveArticlesList } from '@/features/DashboardStats';
import { ActiveUsersList } from '@/features/UsersActivityChart';
import { ArticleRatingDistributionChartProps } from '@/features/ArticleRatingDistributionChart';

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
    categoryData: Record<string, ArticleStats>;
    articleCommentCounts: ArticleCommentCount[];
    commentCountsByArticle: Record<string, number>;
    commentCountsByUser: Record<string, number>;
    ratingCountsByUser: Record<string, ArticleStats>;
    activeUsersList: ActiveUsersList;
    activeArticlesList: ActiveArticlesList;
    ratingDistributionMap: ArticleRatingDistributionChartProps['ratingDistributionMap'];
    monthlyDataByCategories: ArticlePeriodDataChartsProps['data'];
}
