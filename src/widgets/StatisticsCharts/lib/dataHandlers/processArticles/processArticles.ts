import { ArticleStats, StatisticsData } from '../../../model/types/stats';
import { Article } from '@/entities/Article';
import { generateMonths } from '../../utilities/generateMonths';
import { getMonthYearKey } from '../../utilities/getMonthYearKey';
import { getYearFromDate } from '../../utilities/getYearFromDate';
import { calculateAverage } from '@/shared/lib/mathCalculations/calculateAverage';
import { formatDateString } from '@/shared/lib/text/formatDateString/formatDateString';
import { formatToTwoDigits } from '@/shared/lib/text/formatToTwoDigits/formatToTwoDigits';

export const processArticles = (data: StatisticsData, articles?: Article[]) => {
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
        const yearsArray = Array.from(yearsList).sort();
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = formatToTwoDigits(currentDate.getMonth() + 1);

        yearsArray.forEach((year) => {
            months.forEach((month) => {
                // Convert to numbers for comparison
                const yearNum = Number(year);
                const monthNum = Number(month);
                const currentYearNum = Number(currentYear);
                const currentMonthNum = Number(currentMonth);

                if (
                    yearNum < currentYearNum ||
                    (yearNum === currentYearNum && monthNum <= currentMonthNum)
                ) {
                    const key = `${month}/${year}`;
                    data.monthlyDataByCategories[key] = data.categories.reduce(
                        (acc, category) => {
                            acc[category] = 0;
                            return acc;
                        },
                        {} as ArticleStats,
                    );
                }
            });
        });
    };

    const updateMonthlyData = (article: Article) => {
        const key = getMonthYearKey(formatDateString(article.createdAt));
        article.category.forEach((category: string) => {
            if (data.monthlyDataByCategories[key]) {
                data.monthlyDataByCategories[key][category] += 1;
            }
        });
    };

    articles.forEach((article) => {
        // data.activeUsersList.inArticles.add(article.user.id);
        data.activeUsersList.inArticles.add(article.user.email);
        totalViews += article.views;
        updateCategoryData(article);
        yearsList.add(getYearFromDate(formatDateString(article.createdAt)));
    });

    initializeMonthlyData();

    articles?.forEach((article) => {
        updateMonthlyData(article);
    });

    data.averageViews = calculateAverage(totalViews, data.totalArticles, 0);
};
