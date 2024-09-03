import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { Profile } from './model/types/profile';

export const testProfileData: Profile = {
    id: '1',
    username: 'admin',
    age: 29,
    country: Country.Ukraine,
    lastname: 'Shavlak',
    firstname: 'Maryna',
    city: 'Kharkiv',
    currency: Currency.USD,
    avatar: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngall.com%2Fru%2Favatar-png&psig=AOvVaw0gkm9E8Pq-fpDE1F8wmxQ4&ust=1725291901082000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCODzuKqLoogDFQAAAAAdAAAAABAJ',
};
