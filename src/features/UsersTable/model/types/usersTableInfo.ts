import { Profile } from '@/entities/Profile';
import { ColorOption } from './types';

export interface UserPartial {
    id: string;
    username: string;
    role: ColorOption | null;
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
