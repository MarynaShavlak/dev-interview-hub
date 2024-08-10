import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchArticleRecommendations } from './fetchArticleRecommendations';
import { Article, ArticleBlockType, ArticleCategory } from '@/entities/Article';

const articlesData: Article[] = [
    {
        id: '1',
        user: {
            id: '123',
            username: 'Maryna Shavlak',
        },
        title: 'Test Article 1',
        subtitle: 'This is a test subtitle 1.',
        img: 'test-image-url-1',
        views: 100,
        createdAt: '2023-01-01T00:00:00.000Z',
        category: [ArticleCategory.IT],
        blocks: [
            {
                id: '2344',
                type: ArticleBlockType.TEXT,
                paragraphs: ['This is a text block for article 1.'],
            },
        ],
    },
    {
        id: '2',
        user: {
            id: '456',
            username: 'Max Shavlak',
        },
        title: 'Test Article 2',
        subtitle: 'This is a test subtitle 2.',
        img: 'test-image-url-2',
        views: 200,
        createdAt: '2023-02-01T00:00:00.000Z',
        category: [ArticleCategory.ECONOMICS],
        blocks: [
            {
                id: '5678',
                type: ArticleBlockType.TEXT,
                paragraphs: ['This is a text block for article 2.'],
            },
        ],
    },
];

describe('fetchArticleRecommendations.test', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(fetchArticleRecommendations);
        thunk.api.get.mockReturnValue(Promise.resolve({ data: articlesData }));

        const result = await thunk.callThunk();

        expect(thunk.api.get).toHaveBeenCalledWith('/articles', {
            params: {
                _limit: 3,
            },
        });
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(articlesData);
    });

    test('error - no recommendations found', async () => {
        const thunk = new TestAsyncThunk(fetchArticleRecommendations);
        thunk.api.get.mockReturnValue(Promise.resolve({ data: [] }));

        const result = await thunk.callThunk();

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('No article recommendations found.');
    });

    test('error - API failure', async () => {
        const thunk = new TestAsyncThunk(fetchArticleRecommendations);
        thunk.api.get.mockReturnValue(
            Promise.reject(
                new Error('Failed to fetch article recommendations.'),
            ),
        );

        const result = await thunk.callThunk();

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('Failed to fetch article recommendations.');
    });
});
