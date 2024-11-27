import { useUsers } from '@/entities/User';
import { useArticles } from '@/entities/Article';
import { getRoleData } from '../helpers/getData/getRolesData/getRoleData';
import { getEnabledUserFeatures } from '../helpers/getData/processUserFeatures/processUserFeatures';
import { getCombinedUsersData } from '../helpers/getData/getCombinedUsersData/getCombinedUsersData';
import { ArticlesByUserData } from '../../model/types/usersTableInfo';

export const useUsersTableData = () => {
    const { data: users, isLoading: isUsersLoading } = useUsers();

    const { data: articles, isLoading: isArticlesLoading } = useArticles({});

    const isLoading = isUsersLoading || isArticlesLoading;

    if (!users || !articles) return { users: [], articles: [], isLoading };

    const partialUsersData = users.map(
        ({
            id,
            roles,
            features,
            username,
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

    // const partialProfilesData = profiles.map((profile) => {
    //     const {
    //         id,
    //         username,
    //         firstname,
    //         lastname,
    //         age,
    //         currency,
    //         country,
    //         avatar,
    //         city,
    //     } = profile;
    //
    //     return {
    //         id,
    //         username,
    //         age,
    //         city,
    //         country,
    //         currency,
    //         avatar,
    //         fullName:
    //             `${capitalizeFirstLetter(firstname || '')} ${capitalizeFirstLetter(lastname || '')}` ||
    //             '',
    //     };
    // });

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
