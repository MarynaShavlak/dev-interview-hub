import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { Profile } from './model/types/profile';
import avatar from '@/shared/assets/tests/avatar-dropdown.png';

export const testProfileData: Profile = {
    id: '1',
    username: 'admin',
    age: 29,
    country: Country.Ukraine,
    lastname: 'Shavlak',
    firstname: 'Maryna',
    city: 'Kharkiv',
    currency: Currency.USD,
    avatar,
};
