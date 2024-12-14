import {
    ArticlesByUserData,
    UserPartial,
    UsersTableInfo,
} from '../../../../model/types/usersTableInfo';

export const getCombinedUsersData = (
    users: UserPartial[],

    articlesByUserData: ArticlesByUserData,
): UsersTableInfo[] => {
    return users.map((user) => {
        const articlesQuantity = articlesByUserData[user.id] || 0;
        const {
            id,
            role,
            username,
            email,
            features,
            age,
            city,
            country,
            currency,
            avatar,
            lastname,
            firstname,
        } = user;

        return {
            id,
            avatar,
            username,
            email,
            lastname,
            firstname,
            role,
            age,
            country,
            city,
            currency,
            features,
            articlesQuantity,
        };
    });
};
