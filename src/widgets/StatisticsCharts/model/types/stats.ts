import {
    ActiveUsersList,
    ArticleRatingDistributionChartProps,
    ArticleCategoriesChartsProps,
    UserRatingsBubbleChartProps,
    TopCommentedArticlesChartProps,
    ArticleCommentersChartProps,
    ArticleMonthlyDataChartProps,
} from '@/features/Charts';
import { ActiveArticlesList } from '@/features/DashboardStats';

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
    articleCommentCounts: TopCommentedArticlesChartProps['articleCommentCounts'];
    commentCountsByUser: ArticleCommentersChartProps['commentCountsByUser'];
    ratingCountsByUser: UserRatingsBubbleChartProps['data'];
    activeUsersList: ActiveUsersList;
    activeArticlesList: ActiveArticlesList;
    ratingDistributionMap: ArticleRatingDistributionChartProps['ratingDistributionMap'];
    monthlyDataByCategories: ArticleMonthlyDataChartProps['data'];
}
