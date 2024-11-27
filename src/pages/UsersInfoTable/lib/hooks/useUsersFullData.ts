import { useUsers } from '@/entities/User';
import { useArticles } from '@/entities/Article';
import { getRolesData } from '../helpers/getRolesData/getRolesData';
import { getEnabledUserFeatures } from '../helpers/processUserFeatures/processUserFeatures';
import { capitalizeFirstLetter } from '@/shared/lib/text/capitalizeFirstLetter/capitalizeFirstLetter';
import { getCombinedUsersData } from '../helpers/getCombinedUsersData/getCombinedUsersData';
import { ArticlesByUserData } from '../../model/types/userFullInfo';

export const useUsersFullData = () => {
    const { data: users, isLoading: isUsersLoading } = useUsers();
    // const { data: profiles, isLoading: isProfilesLoading } = useProfiles(null);
    const { data: articles, isLoading: isArticlesLoading } = useArticles({});

    const isLoading = isUsersLoading || isArticlesLoading;

    if (!users || !articles) return { users: [], articles: [], isLoading };

    const partialUsersData = users.map(
        ({
            id,
            roles,
            features,
            username,
            firstname,
            lastname,
            age,
            currency,
            country,
            avatar,
            city,
        }) => {
            return {
                id: id || '',
                username,
                roles: getRolesData(roles),
                features: getEnabledUserFeatures(features),
                age,
                city,
                country,
                currency,
                avatar,
                fullName:
                    `${capitalizeFirstLetter(firstname || '')} ${capitalizeFirstLetter(lastname || '')}` ||
                    '',
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
