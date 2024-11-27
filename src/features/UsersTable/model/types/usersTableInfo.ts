import { ColorOption } from './types';

export interface UserPartial {
    id: string;
    username: string;
    role: ColorOption | null;
    features: string;
    age: string;
    city: string;
    country: string;
    currency: string;
    avatar: string;
    lastname: string;
    firstname: string;
}

export interface UsersTableInfo extends UserPartial {
    articlesQuantity: number;
}

export interface ArticlesByUserData {
    [userId: string]: number;
}
