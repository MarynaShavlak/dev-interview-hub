import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import avatar from '@/shared/assets/tests/avatar-dropdown.png';
import { User } from '@/entities/User';

export const testProfileData: User = {
    id: '1',
    username: 'admin',
    age: '29',
    country: Country.Ukraine,
    lastname: 'Shavlak',
    firstname: 'Maryna',
    email: 'shavlakm@gamil.com',
    city: 'Kharkiv',
    currency: Currency.USD,
    avatar,
};
