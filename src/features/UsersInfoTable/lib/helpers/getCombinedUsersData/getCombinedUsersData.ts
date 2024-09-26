import {
    ArticlesByUserData,
    PartialProfile,
    UserFullInfo,
    UserPartial,
} from '../../../model/types/userFullInfo';

export const getCombinedUsersData = (
    users: UserPartial[],
    profiles: PartialProfile[],
    articlesByUserData: ArticlesByUserData,
): UserFullInfo[] => {
    return users.map((user) => {
        const profile = profiles.find((profile) => profile?.id === user.id);
        const articlesQuantity = articlesByUserData[user.id] || 0;
        const { id, roles, username, features } = user;
        const { age, city, country, currency, fullName, avatar } =
            profile as PartialProfile;

        return {
            id,
            avatar,
            username,
            fullName,
            roles,
            age,
            country,
            city,
            currency,
            features,
            articlesQuantity,
        };
    });
};
