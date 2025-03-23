import { v4 } from 'uuid';

const user = {
    email: 'testemail@gmail.com',
    firstname: 'testuser firtstname',
    lastname: 'testuser lastname',
    id: '123',
    username: 'testUsername',
    avatar: 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png',
    age: '30',
    city: 'Kharkiv',

    roles: ['ADMIN'],
    features: {
        isArticleRatingEnabled: true,
        isAppRedesigned: true,
    },
    jsonSettings: {
        theme: 'app_light_theme',
        isFirstVisit: true,
        settingsPageHasBeenOpen: false,
        isArticlesPageWasOpened: false,
    },
};

export const testArticle = {
    title: 'TESTING ARTICLE',
    subtitle: {
        text: 'Test subtitle',
    },
    img: 'https://miro.medium.com/v2/resize:fit:1400/0*5KGuaB1kovyV4EbV.png',
    views: 1022,
    createdAt: '2025-03-12T17:20:33.872Z',
    user,
    category: ['IT'],
    blocks: [],
    id: v4(),
};
