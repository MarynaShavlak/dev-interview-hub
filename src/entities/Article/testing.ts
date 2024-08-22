import { Article } from './model/types/article';
import { ArticleCategory, ArticleSection } from './model/consts/articleConsts';

export { articleDetailsReducer } from './model/slice/articleDetailsSlice';

export const testArticleData: Article = {
    id: '1',
    user: {
        id: '123',
        username: 'Maryna Shavlak',
    },
    title: 'Test Article',
    subtitle: 'This is a test subtitle.',
    img: 'test-image-url',
    views: 100,
    createdAt: '2023-01-01T00:00:00.000Z',
    category: [ArticleCategory.IT, ArticleCategory.ECONOMICS],
    blocks: [
        {
            id: '2344',
            type: ArticleSection.TEXT,
            paragraphs: ['This is a text block.'],
        },
    ],
};
