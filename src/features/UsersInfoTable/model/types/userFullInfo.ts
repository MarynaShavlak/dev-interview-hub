import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';

export interface PartialProfile {
    id?: string;
    age?: number;
    currency?: Currency;
    country?: Country;
    city?: string;
    username?: string;
    avatar?: string;
    fullName?: string;
}

export interface UserPartial {
    id: string;
    username: string;
    roles: string;
    features: string;
}

export interface UserFullInfo
    extends UserPartial,
        Omit<PartialProfile, 'id' | 'username'> {
    articlesQuantity: number;
}

export interface ArticlesByUserData {
    [userId: string]: number;
}
