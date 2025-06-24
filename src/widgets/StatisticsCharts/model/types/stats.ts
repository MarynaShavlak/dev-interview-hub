import { ActiveUsersList } from 'src/features/Charts/UsersActivityChart';
import { ArticleRatingDistributionChartProps } from 'src/features/Charts/ArticleRatingDistributionChart';
import { ArticleCategoriesChartsProps } from 'src/features/Charts/ArticleCategoriesCharts';
import { UserRatingsBubbleChartProps } from 'src/features/Charts/UserRatingsBubbleChart';
import { TopCommentedArticlesChartProps } from 'src/features/Charts/TopCommentedArticlesChart';
import { ArticleCommentersChartProps } from 'src/features/Charts/ArticleCommentersChart';
import { ArticleMonthlyDataChartProps } from 'src/features/Charts/ArticleMonthlyDataChart';
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
