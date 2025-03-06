import {
    Article,
    ArticleBlock,
    ArticleCodeBlock,
    ArticleTextBlock,
} from './model/types/article';
import { ArticleCategory, ArticleSection } from './model/consts/articleConsts';
import avatar from '@/shared/assets/tests/avatar-dropdown.png';

// export { articleDetailsReducer } from './model/slices/articleDetailsSlice';

export const textBlockWithTitleAndFewParagraphs = {
    id: '2344',
    type: ArticleSection.TEXT,
    title: 'Title of block',
    paragraphs: [
        'This is the first paragraph.',
        'Here is the second paragraph with more content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
            'In cursus posuere mi, dapibus bibendum nisl feugiat eu. ' +
            'Curabitur volutpat ornare ornare. Donec eu augue rutrum, hendrerit enim a, faucibus odio. ' +
            'Sed consectetur faucibus ex, a blandit erat porttitor eget. In a volutpat nibh. ' +
            'Fusce tincidunt, quam in tincidunt efficitur, risus ex feugiat magna, at pharetra tellus lectus vel ipsum. ' +
            'Aliquam pharetra varius felis, non pretium orci. Maecenas ut nisi rutrum, tincidunt libero ut,' +
            ' bibendum lectus. Maecenas enim augue, consequat at ornare eu, convallis eget nunc.',
        'This is the third paragraph for testing purposes.',
    ],
} as ArticleTextBlock;

export const textBlockWithNoTitle = {
    id: '672345',
    type: ArticleSection.TEXT,
    paragraphs: [
        'This is the first paragraph.',
        'Here is the second paragraph with more content.',
        'This is the third paragraph for testing purposes.',
    ],
} as ArticleTextBlock;

export const imageBlock = {
    id: '66666888',
    type: ArticleSection.IMAGE,
    src:
        'https://media.istockphoto.com/id/1128826884/vector/no-image-vector-symbol-' +
        'missing-available-icon-no-gallery-for-this-moment.jpg?s=612x612&w=0&k=20&c=390e76zN_TJ7HZHJpnI7jNl7UBpO3UP7hpR2meE1Qd4=',
    title: 'Title of image',
};

export const codeBlockWithNoTitle = {
    id: '4',
    type: ArticleSection.CODE,
    code:
        'function factorial(n) {\n  if (n === 0) {\n    return 1;\n  } else {\n    return n * factorial(n - 1);\n  }' +
        '\n}\n\nconsole.log(factorial(5)); // Виведе: 120',
} as ArticleCodeBlock;

export const codeBlockWithTitle = {
    id: 'dskfpsdegsp322j',
    type: ArticleSection.CODE,
    title: 'Code block title',
    code:
        'function factorial(n) {\n  if (n === 0) {\n    return 1;\n  } else {\n    return n * factorial(n - 1);\n  }' +
        '\n}\n\nconsole.log(factorial(5)); // Виведе: 120',
} as ArticleCodeBlock;

export const textBlockWithTags = {
    id: '5325434',
    type: ArticleSection.TEXT,
    paragraphs: [
        `Vestibulum <img src="images/img.jpg" alt="Some image"/> nibh massa 
     Proin a <b>bold text 11111</b> varius tac. Nullam enim 
     <div style="border: 1px solid red;">Styled div 22222</div>,`,
        'ed a lectus eget. Integer fermentum mi vel est efficitur rhoncus. Sed odio eros, maximus eget elit et,',
    ],
} as ArticleTextBlock;
export const testArticleData: Article = {
    id: '1',
    user: {
        id: '123',
        email: '',
        firstname: '',
        lastname: '',
        username: 'testUsername',
        avatar,
    },
    title: 'Test Article Title',
    subtitle: { text: 'This is a test subtitle.' },
    img: 'https://www.century21albania.com/vendor/core/images/default-image.jpg',
    views: 100,
    createdAt: '21.02.2019',
    category: [ArticleCategory.IT, ArticleCategory.HTML],
    blocks: [
        textBlockWithTitleAndFewParagraphs,
        textBlockWithNoTitle,
        imageBlock,
        codeBlockWithTitle,
        textBlockWithTags,
        codeBlockWithNoTitle,
    ] as ArticleBlock[],
};

export const testArticlesListData: Article[] = [
    {
        id: '1',
        user: {
            id: '123',
            email: '',
            firstname: '',
            lastname: '',
            username: 'testUsername',
            avatar,
        },
        title: 'Test Article First',
        subtitle: { text: 'This is a test subtitle.' },
        img: 'https://www.century21albania.com/vendor/core/images/default-image.jpg',
        views: 100,
        createdAt: '07.08.2019',
        category: [ArticleCategory.IT, ArticleCategory.HTML],
        blocks: [
            {
                id: '2344',
                type: ArticleSection.TEXT,
                paragraphs: ['This is a text block.'],
            },
        ],
    },
    {
        id: '2',
        user: {
            id: '123',
            email: '',
            firstname: '',
            lastname: '',
            username: 'testUsername',
            avatar,
        },
        title: 'Test Article 2',
        subtitle: { text: 'This is a test subtitle.' },
        img: 'https://www.century21albania.com/vendor/core/images/default-image.jpg',
        views: 100,
        createdAt: '11.12.2023',
        category: [ArticleCategory.IT, ArticleCategory.HTML],
        blocks: [
            {
                id: '6789',
                type: ArticleSection.TEXT,
                paragraphs: ['This is a text block.'],
            },
        ],
    },
    {
        id: '3',
        user: {
            id: '123',
            email: '',
            firstname: '',
            lastname: '',
            username: 'testUsername',
            avatar,
        },
        title: 'Test Article First',
        subtitle: { text: 'This is a test subtitle.' },
        img: 'https://www.century21albania.com/vendor/core/images/default-image.jpg',
        views: 100,
        createdAt: '07.08.2019',
        category: [ArticleCategory.IT, ArticleCategory.HTML],
        blocks: [
            {
                id: '2344',
                type: ArticleSection.TEXT,
                paragraphs: ['This is a text block.'],
            },
        ],
    },
    {
        id: '4',
        user: {
            id: '123',
            email: '',
            firstname: '',
            lastname: '',
            username: 'testUsername',
            avatar,
        },
        title: 'Test Article 2',
        subtitle: { text: 'This is a test subtitle.' },
        img: 'https://www.century21albania.com/vendor/core/images/default-image.jpg',
        views: 100,
        createdAt: '11.12.2023',
        category: [ArticleCategory.IT, ArticleCategory.HTML],
        blocks: [
            {
                id: '6789',
                type: ArticleSection.TEXT,
                paragraphs: ['This is a text block.'],
            },
        ],
    },
    {
        id: '5',
        user: {
            id: '123',
            email: '',
            firstname: '',
            lastname: '',
            username: 'testUsername',
            avatar,
        },
        title: 'Test Article First',
        subtitle: { text: 'This is a test subtitle.' },
        img: 'https://www.century21albania.com/vendor/core/images/default-image.jpg',
        views: 100,
        createdAt: '07.08.2019',
        category: [ArticleCategory.IT, ArticleCategory.HTML],
        blocks: [
            {
                id: '2344',
                type: ArticleSection.TEXT,
                paragraphs: ['This is a text block.'],
            },
        ],
    },
    {
        id: '6',
        user: {
            id: '123',
            email: '',
            firstname: '',
            lastname: '',
            username: 'testUsername',
            avatar,
        },
        title: 'Test Article 2',
        subtitle: { text: 'This is a test subtitle.' },
        img: 'https://www.century21albania.com/vendor/core/images/default-image.jpg',
        views: 100,
        createdAt: '11.12.2023',
        category: [ArticleCategory.IT, ArticleCategory.HTML],
        blocks: [
            {
                id: '6789',
                type: ArticleSection.TEXT,
                paragraphs: ['This is a text block.'],
            },
        ],
    },
    {
        id: '7',
        user: {
            id: '123',
            email: '',
            firstname: '',
            lastname: '',
            username: 'testUsername',
            avatar,
        },
        title: 'Test Article First',
        subtitle: { text: 'This is a test subtitle.' },
        img: 'https://www.century21albania.com/vendor/core/images/default-image.jpg',
        views: 100,
        createdAt: '07.08.2019',
        category: [ArticleCategory.IT, ArticleCategory.HTML],
        blocks: [
            {
                id: '2344',
                type: ArticleSection.TEXT,
                paragraphs: ['This is a text block.'],
            },
        ],
    },
    {
        id: '8',
        user: {
            id: '123',
            email: '',
            firstname: '',
            lastname: '',
            username: 'testUsername',
            avatar,
        },
        title: 'Test Article 2',
        subtitle: { text: 'This is a test subtitle.' },
        img: 'https://www.century21albania.com/vendor/core/images/default-image.jpg',
        views: 100,
        createdAt: '11.12.2023',
        category: [ArticleCategory.IT, ArticleCategory.HTML],
        blocks: [
            {
                id: '6789',
                type: ArticleSection.TEXT,
                paragraphs: ['This is a text block.'],
            },
        ],
    },
    {
        id: '9',
        user: {
            id: '123',
            email: '',
            firstname: '',
            lastname: '',
            username: 'testUsername',
            avatar,
        },
        title: 'Test Article 2',
        subtitle: { text: 'This is a test subtitle.' },
        img: 'https://www.century21albania.com/vendor/core/images/default-image.jpg',
        views: 100,
        createdAt: '11.12.2023',
        category: [ArticleCategory.IT, ArticleCategory.HTML],
        blocks: [
            {
                id: '6789',
                type: ArticleSection.TEXT,
                paragraphs: ['This is a text block.'],
            },
        ],
    },
    {
        id: '10',
        user: {
            id: '123',
            email: '',
            firstname: '',
            lastname: '',
            username: 'testUsername',
            avatar,
        },
        title: 'Test Article 2',
        subtitle: { text: 'This is a test subtitle.' },
        img: 'https://www.century21albania.com/vendor/core/images/default-image.jpg',
        views: 100,
        createdAt: '11.12.2023',
        category: [ArticleCategory.IT, ArticleCategory.HTML],
        blocks: [
            {
                id: '6789',
                type: ArticleSection.TEXT,
                paragraphs: ['This is a text block.'],
            },
        ],
    },
];

export const articlesNormalizedData = {
    ids: testArticlesListData.map((article) => article.id),
    entities: testArticlesListData.reduce((acc, article) => {
        // @ts-ignore
        acc[article.id] = article;
        return acc;
    }, {}),
};
