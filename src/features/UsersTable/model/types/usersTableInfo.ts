import { Profile } from '@/entities/Profile';

export interface UserPartial {
    id: string;
    username: string;
    role: string;
    features: string;
}

export interface UsersTableInfo
    extends UserPartial,
        Omit<Profile, 'id' | 'username'> {
    articlesQuantity: number;
}

export interface ArticlesByUserData {
    [userId: string]: number;
}
