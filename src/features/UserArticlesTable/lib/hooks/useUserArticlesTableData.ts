import { useUserAuthData } from '@/entities/User';
import { useArticlesByUserId } from '@/entities/Article';

export const useUserArticlesTableData = () => {
    const currentUserdata = useUserAuthData();
    const authedUserId = currentUserdata?.id || '';
    console.log('authedUserId', authedUserId);
    const { data: articles, isLoading } = useArticlesByUserId(authedUserId);
    //
    //
    // const { data: users, isLoading: isUsersLoading } = useUsers();
    // const { isLoading: isArticlesLoading } = useGetArticles();
    // const articles = useSelector(selectAllArticles);
    // console.log('articles', articles);
    // const isLoading = isUsersLoading || isArticlesLoading;

    if (!articles) return { articles: [], isLoading };

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

    return { articles, isLoading };
};
