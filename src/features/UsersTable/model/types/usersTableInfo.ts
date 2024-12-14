import { ColorOption } from './types';

export interface UserPartial {
    id: string;
    username: string;
    email: string;
    role: ColorOption | null;
    features: string;
    age: string;
    city: string;
    currency: string;
    country: string;
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
