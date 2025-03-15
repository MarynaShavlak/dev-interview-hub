import { User } from './model/types/user';
import { UserRole } from './model/consts/consts';
import { Theme } from '@/shared/const/theme';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';

export const testUserData: User = {
    email: 'testemail@gmail.com',
    firstname: 'testuser firtstname',
    lastname: 'testuser lastname',
    id: '123',
    username: 'testUsername',
    avatar: 'https://drive.google.com/file/d/1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa/view?usp=drive_link',
    age: '30',
    city: 'Kharkiv',
    currency: Currency.UAH,
    country: Country.Ukraine,
    roles: [UserRole.ADMIN],
    features: {
        isArticleRatingEnabled: true,
        isAppRedesigned: true,
    },
    jsonSettings: {
        theme: Theme.LIGHT,
        isFirstVisit: true,
        settingsPageHasBeenOpen: false,
        isArticlesPageWasOpened: false,
    },
};
