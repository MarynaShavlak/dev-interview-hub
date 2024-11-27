export interface UserPartial {
    id: string;
    username: string;
    roles: string;
    features: string;
    age?: string;
    currency: string;
    country: string;
    city?: string;
    avatar?: string;
    fullName?: string;
}

export interface UserFullInfo extends UserPartial {
    articlesQuantity: number;
}

export interface ArticlesByUserData {
    [userId: string]: number;
}
