import { useUsers } from '@/entities/User';
import { useProfiles } from '@/entities/Profile';
import { useArticles } from '@/entities/Article';
import { getRolesData } from '../helpers/getRolesData/getRolesData';
import { getEnabledUserFeatures } from '../helpers/processUserFeatures/processUserFeatures';
import { capitalizeFirstLetter } from '@/shared/lib/text/capitalizeFirstLetter/capitalizeFirstLetter';
import { getCombinedUsersData } from '../helpers/getCombinedUsersData/getCombinedUsersData';
import { ArticlesByUserData } from '../../model/types/userFullInfo';

export const useUsersFullData = () => {
    const { data: users, isLoading: isUsersLoading } = useUsers(null);
    const { data: profiles, isLoading: isProfilesLoading } = useProfiles(null);
    const { data: articles, isLoading: isArticlesLoading } = useArticles(null);

    const isLoading = isUsersLoading || isProfilesLoading || isArticlesLoading;

    if (!users || !profiles || !articles)
        return { users: [], profiles: [], articles: [], isLoading };

    const partialUsersData = users.map(({ id, roles, features, username }) => {
        return {
            id: id || '',
            username: username || '',
            roles: getRolesData(roles),
            features: getEnabledUserFeatures(features),
        };
    });

    const partialProfilesData = profiles.map((profile) => {
        const {
            id,
            username,
            firstname,
            lastname,
            age,
            currency,
            country,
            avatar,
            city,
        } = profile;

        return {
            id,
            username,
            age,
            city,
            country,
            currency,
            avatar,
            fullName:
                `${capitalizeFirstLetter(firstname || '')} ${capitalizeFirstLetter(lastname || '')}` ||
                '',
        };
    });

    const articlesByUserData: ArticlesByUserData = {};
    articles.forEach((article) => {
        const userId: string = article.user.id;
        articlesByUserData[userId] = (articlesByUserData[userId] || 0) + 1;
    });

    const combinedData = getCombinedUsersData(
        partialUsersData,
        partialProfilesData,
        articlesByUserData,
    );

    return { users: combinedData, isLoading };
};
