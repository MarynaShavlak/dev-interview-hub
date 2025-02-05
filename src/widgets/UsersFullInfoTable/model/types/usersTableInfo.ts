import { ColorOption } from '@/features/Table';

export interface UserPartial {
    id: string;
    username: string;
    email: string;
    role: ColorOption | null;
    features: string;

    avatar: string;
    lastname: string;
    firstname: string;
}

export interface UsersTableInfo extends UserPartial {
    articlesQuantity: number;
}
