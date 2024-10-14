import {
    ArticlesByUserData,
    UserPartial,
    UsersTableInfo,
} from '../../../model/types/usersTableInfo';
import { Profile } from '@/entities/Profile';

export const getCombinedUsersData = (
    users: UserPartial[],
    profiles: Profile[],
    articlesByUserData: ArticlesByUserData,
): UsersTableInfo[] => {
    return users.map((user) => {
        const profile = profiles.find((profile) => profile?.id === user.id);
        const articlesQuantity = articlesByUserData[user.id] || 0;
        const { id, role, username, features } = user;
        const { age, city, country, currency, avatar, lastname, firstname } =
            profile as Profile;

        return {
            id,
            avatar,
            username,
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
