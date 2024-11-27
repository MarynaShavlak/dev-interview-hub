import {
    ArticlesByUserData,
    UserFullInfo,
    UserPartial,
} from '../../../model/types/userFullInfo';

export const getCombinedUsersData = (
    users: UserPartial[],
    articlesByUserData: ArticlesByUserData,
): UserFullInfo[] => {
    return users.map((user) => {
        const articlesQuantity = articlesByUserData[user.id] || 0;
        const {
            id,
            roles,
            username,
            features,
            age,
            city,
            country,
            currency,
            fullName,
            avatar,
        } = user;

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
