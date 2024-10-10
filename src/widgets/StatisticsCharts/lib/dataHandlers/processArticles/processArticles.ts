import { ArticleStats, InitializedData } from '../../../model/types/stats';
import { Article } from '@/entities/Article';
import { generateMonths } from '../../utilities/generateMonths';
import { getMonthYearKey } from '../../utilities/getMonthYearKey';
import { getYearFromDate } from '../../utilities/getYearFromDate';
import { calculateAverage } from '@/shared/lib/mathCalculations/calculateAverage';

export const processArticles = (
    data: InitializedData,
    articles?: Article[],
) => {
    if (!articles) return;
    let totalViews = 0;
    const yearsList = new Set<string>();

    const updateCategoryData = (article: Article) => {
        article.category.forEach((cat) => {
            if (!data.categoryData[cat]) {
                data.categoryData[cat] = { articleCount: 0, viewCount: 0 };
            }
            data.categoryData[cat].articleCount += 1;
            data.categoryData[cat].viewCount += article.views;
        });
    };

    const initializeMonthlyData = () => {
        const months = generateMonths();
        const categoriesArray = Object.keys(data.categoryData);
        const yearsArray = Array.from(yearsList).sort();
        yearsArray.forEach((year) => {
            months.forEach((month) => {
                const key = `${month}/${year}`;
                data.monthlyDataByCategories[key] = categoriesArray.reduce(
                    (acc, category) => {
                        acc[category] = 0;
                        return acc;
                    },
                    {} as ArticleStats,
                );
            });
        });
    };

    const updateMonthlyData = (article: Article) => {
        const key = getMonthYearKey(article.createdAt);

        article.category.forEach((category: string) => {
            if (data.monthlyDataByCategories[key]) {
                data.monthlyDataByCategories[key][category] += 1;
            }
        });
    };

    articles.forEach((article) => {
        data.activeUsersList.inArticles.add(article.user.id);
        totalViews += article.views;
        updateCategoryData(article);
        yearsList.add(getYearFromDate(article.createdAt));
    });

    initializeMonthlyData();

    articles?.forEach((article) => {
        updateMonthlyData(article);
    });

    data.averageViews = calculateAverage(totalViews, data.totalArticles, 0);
};
