import { useUserAuthData } from '@/entities/User';
import { useArticlesByUserId } from '@/entities/Article';
import { formatDateString } from '@/shared/lib/text/formatDateString/formatDateString';
import { UserArticlesTableInfo } from '../../model/types/userArticlesTableInfo';

import { useCommentsByArticleIdsList } from '@/features/ArticleComments';
import { useRatingsByArticleIdsList } from '@/features/ArticleRating';

export const useUserArticlesTableData = () => {
    const currentUserdata = useUserAuthData();
    const authedUserId = currentUserdata?.id || '';
    console.log('authedUserId', authedUserId);
    const {
        data: articles,
        isLoading: isArticlesLoading,
        error: isArticlesError,
    } = useArticlesByUserId(authedUserId);
    const articlesIdArray = articles?.map((article) => article.id);
    console.log('articlesIdArray', articlesIdArray);
    const {
        data: ratings = [],
        isLoading: isRatingsLoading,
        error: isRatingsError,
    } = useRatingsByArticleIdsList(articlesIdArray || []);
    const {
        data: comments = [],
        isLoading: isCommentsLoading,
        error: isCommentsError,
    } = useCommentsByArticleIdsList(articlesIdArray || []);
    console.log('comments', comments);
    console.log('ratings', ratings);

    const isLoading =
        isArticlesLoading || isRatingsLoading || isCommentsLoading;
    const isError = isArticlesError || isRatingsError || isCommentsError;

    if (!articles) return { articles: [], isLoading, isError };

    const combinedArticlesData: UserArticlesTableInfo[] = articles.map(
        ({ id, user, title, views, createdAt, category }) => {
            const commentsQuantity = comments.filter(
                (comment) => comment.articleId === id,
            ).length;
            const articleRatings = ratings.filter(
                (rating) => rating.articleId === id,
            );
            const averageRating =
                articleRatings.length > 0
                    ? articleRatings.reduce(
                          (acc, rating) => acc + rating.rate,
                          0,
                      ) / articleRatings.length
                    : 0;

            const roundedAverageRating =
                Number(averageRating.toFixed(1)) || '-';

            return {
                id,
                user,
                title,

                views,
                createdAt: formatDateString(createdAt),
                categories: category.join(', '),
                commentsQuantity,
                averageRating: roundedAverageRating,
            };
        },
    );

    return { articles: combinedArticlesData, isLoading, isError };
};

//
//
// const { data: users, isLoading: isUsersLoading } = useUsers();
// const { isLoading: isArticlesLoading } = useGetArticles();
// const articles = useSelector(selectAllArticles);
// console.log('articles', articles);
// const isLoading = isUsersLoading || isArticlesLoading;

// const partialUsersData = users.map(
//     ({
//         id,
//         roles,
//         features,
//         username,
//         email,
//         age,
//         city,
//         country,
//         avatar,
//         lastname,
//         firstname,
//         currency,
//     }) => {
//         return {
//             id: id || '',
//             username: username || '',
//             email: email || '',
//             role: getRoleData(roles),
//             features: getEnabledUserFeatures(features),
//             age: age || '',
//             city: city || '',
//             country: country || '',
//             currency: currency || '',
//             avatar: avatar || '',
//             lastname,
//             firstname,
//         };
//     },
// );

// const articlesByUserData: ArticlesByUserData = {};
// articles.forEach((article) => {
//     const userId: string = article.user.id;
//     articlesByUserData[userId] = (articlesByUserData[userId] || 0) + 1;
// });
//
// const combinedData = getCombinedUsersData(
//     partialUsersData,
//
//     articlesByUserData,
// );
