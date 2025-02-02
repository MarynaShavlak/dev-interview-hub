import { ActiveArticlesList } from '@/features/DashboardStats';
import { ActiveUsersList } from '@/features/UsersActivityChart';
import { ArticleRatingDistributionChartProps } from '@/features/ArticleRatingDistributionChart';
import { ArticleCategoriesChartsProps } from '@/features/ArticleCategoriesCharts';
import { UserRatingsBubbleChartProps } from '@/features/UserRatingsBubbleChart';
import { TopCommentedArticlesChartProps } from '@/features/TopCommentedArticlesChart';
import { ArticleCommentatorsDistributionChartProps } from '@/features/ArticleCommentatorsDistributionChart';
import { ArticleMonthlyDataChartProps } from '@/features/ArticleMonthlyDataChart';

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
    commentCountsByUser: ArticleCommentatorsDistributionChartProps['commentCountsByUser'];
    ratingCountsByUser: UserRatingsBubbleChartProps['data'];
    activeUsersList: ActiveUsersList;
    activeArticlesList: ActiveArticlesList;
    ratingDistributionMap: ArticleRatingDistributionChartProps['ratingDistributionMap'];
    monthlyDataByCategories: ArticleMonthlyDataChartProps['data'];
}
