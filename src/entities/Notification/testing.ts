import {
    GeneralNotification,
    PersonalNotification,
} from './model/types/notification';

export const dataSuccessRequest = [
    {
        url: `${__API__}/notifications`,
        method: 'GET',
        status: 200,
        response: [
            {
                id: '1',
                title: 'Сповіщення 1',
                description: 'Текст сповіщення 1',
            },
            {
                id: '2',
                title: 'Сповіщення 2',
                description: 'Текст сповіщення 2',
            },
            {
                id: '3',
                title: 'Сповіщення 3',
                description: 'Текст сповіщення 3',
            },
        ],
    },
];

export const testGeneralNotification: GeneralNotification = {
    id: '1078d68b-3bd7-4ba0-8b9b-5e9338c4e1e8',
    localizationTitle: {
        en: 'New Article Published!',
        uk: 'Опубліковано нову статтю!',
    },
    localizationMessage: {
        en: 'A new article, "Client-server architecture", has been added to the following categories: IT, React. Check it out!',
        uk: 'Нова стаття "Client-server architecture" була додана до таких рубрик: IT, React. Скоріше перегляньте!',
    },
    href: '/article/b653c6e1-f3b8-43b1-8c1d-62144027d25f',
    timestamp: '2025-02-26T11:54:31.894Z',
    type: 'general',
    dismissedBy: ['2CuQOzOQ9YeU7bFzncJh8YwGZGI2'],
    authorId: '2CuQOzOQ9YeU7bFzncJh8YwGZGI2',
};

export const testCommentPersonalNotification: PersonalNotification = {
    id: '070c8ae6-f504-401a-bd75-9eba13ec8c7e',
    localizationTitle: {
        en: 'New comment on your article!',
        uk: 'Новий коментар до Вашої статті!',
    },
    localizationMessage: {
        en: 'User <b>1234567marynashavlak</b> commented your article "Client-server architecture" with comment "Very informative article"',
        uk: 'Користувач <b>1234567marynashavlak</b> додав до Вашої статті  "Client-server architecture" коментар "Very informative article"',
    },
    href: '/article/622a5ba6-1956-4e10-9fc8-788f4a94f936',
    timestamp: '2025-03-03T15:36:40.126Z',
    type: 'personal_comment',
};

export const testRatingPersonalNotification: PersonalNotification = {
    id: '3c4b6404-e211-4e17-84d4-f9d6aa334a5f',
    localizationTitle: {
        en: 'Your article has been rated!',
        uk: 'Вашу статтю було оцінено!',
    },
    localizationMessage: {
        en: 'User <b>shavlakmaryna@gmail.com</b> rated your article "Client-server architecture" with ⭐⭐⭐⭐ .',
        uk: 'Користувач <b>shavlakmaryna@gmail.com</b> оцінив Вашу статтю "Client-server architecture" на ⭐⭐⭐⭐.',
    },
    href: '/article/25633903-9fa4-4982-a3f5-05e2007ca59c',
    timestamp: '2025-03-01T15:16:37.933Z',
    type: 'personal_rating',
};

export const testRatingWithFeedbackPersonalNotification: PersonalNotification =
    {
        id: 'dc419786-1f29-4b10-9d3c-d930bf998122',
        localizationTitle: {
            en: 'Your article has been rated!',
            uk: 'Вашу статтю було оцінено!',
        },
        localizationMessage: {
            // eslint-disable-next-line max-len
            en: 'User <b>shavlakmaryna@gmail.com</b> rated your article "Client-server architecture" with ⭐ and left feedback: "Incomplete and poorly researched. Lacks useful information.".',
            // eslint-disable-next-line max-len
            uk: 'Користувач <b>shavlakmaryna@gmail.com</b> оцінив Вашу статтю "Client-server architecture" на ⭐ і залишив відгук: "Incomplete and poorly researched. Lacks useful information.".',
        },
        href: '/article/6d5a0894-f876-4cb8-afa6-988bae7eef16',
        timestamp: '2025-02-26T14:36:28.626Z',
        type: 'personal_rating',
    };
