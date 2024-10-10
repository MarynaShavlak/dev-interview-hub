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
    const categoriesList = new Set<string>();

    const updateCategoryData = (article: Article) => {
        article.category.forEach((cat) => {
            if (!data.categoryData[cat]) {
                data.categoryData[cat] = { articleCount: 0, viewCount: 0 };
            }
            data.categoryData[cat].articleCount += 1;
            data.categoryData[cat].viewCount += article.views;
            categoriesList.add(cat);
        });
        data.categories = Array.from(categoriesList);
    };

    const initializeMonthlyData = () => {
        const months = generateMonths();
        console.log('months', months);
        const yearsArray = Array.from(yearsList).sort();
        console.log('yearsArray', yearsArray);
        yearsArray.forEach((year) => {
            months.forEach((month) => {
                const key = `${month}/${year}`;
                data.monthlyDataByCategories[key] = data.categories.reduce(
                    (acc, category) => {
                        acc[category] = 0;
                        return acc;
                    },
                    {} as ArticleStats,
                );
            });
        });
    };
    console.log(
        'IN HANDLERmonthlyDataByCategories',
        data.monthlyDataByCategories,
    );
    const updateMonthlyData = (article: Article) => {
        const key = getMonthYearKey(article.createdAt);
        console.log('key', key);
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
