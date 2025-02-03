import { useSelector } from 'react-redux';
import { useUsers } from '@/entities/User';
import { selectAllArticles, useGetArticles } from '@/entities/Article';
import { getRoleData } from '../helpers/getData/getRolesData/getRoleData';
import { getEnabledUserFeatures } from '../helpers/getData/processUserFeatures/processUserFeatures';
import { getCombinedUsersData } from '../helpers/getData/getCombinedUsersData/getCombinedUsersData';
import { ArticlesByUserData } from '../../model/types/usersTableInfo';

export const useUsersTableData = () => {
    const { data: users, isLoading: isUsersLoading } = useUsers();

    const { isLoading: isArticlesLoading } = useGetArticles();
    const articles = useSelector(selectAllArticles);
    // console.log('articles', articles);
    const isLoading = isUsersLoading || isArticlesLoading;

    if (!users || !articles) return { users: [], articles: [], isLoading };

    const partialUsersData = users.map(
        ({
            id,
            roles,
            features,
            username,
            email,
            age,
            city,
            country,
            avatar,
            lastname,
            firstname,
            currency,
        }) => {
            return {
                id: id || '',
                username: username || '',
                email: email || '',
                role: getRoleData(roles),
                features: getEnabledUserFeatures(features),
                age: age || '',
                city: city || '',
                country: country || '',
                currency: currency || '',
                avatar: avatar || '',
                lastname,
                firstname,
            };
        },
    );

    const articlesByUserData: ArticlesByUserData = {};
    articles.forEach((article) => {
        const userId: string = article.user.id;
        articlesByUserData[userId] = (articlesByUserData[userId] || 0) + 1;
    });

    const combinedData = getCombinedUsersData(
        partialUsersData,

        articlesByUserData,
    );

    return { users: combinedData, isLoading };
};
