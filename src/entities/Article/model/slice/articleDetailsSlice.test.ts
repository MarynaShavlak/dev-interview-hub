import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';
import { ArticleDetailsSchema } from '../types/articleDetailsSchema';
import { articleDetailsReducer } from './articleDetailsSlice';
import {
    ArticleBlockType,
    ArticleCategory,
} from '../../model/consts/articleConsts';
import { Article } from '../../model/types/article';

const articleData: Article = {
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
            type: ArticleBlockType.TEXT,
            paragraphs: ['This is a text block.'],
        },
    ],
};

describe('articleDetailsSlice', () => {
    test('test fetchArticleById pending', () => {
        const state: DeepPartial<ArticleDetailsSchema> = {
            isLoading: false,
            error: 'Some error',
        };

        expect(
            articleDetailsReducer(
                state as ArticleDetailsSchema,
                fetchArticleById.pending,
            ),
        ).toEqual({
            isLoading: true,
            error: undefined,
        });
    });

    test('test fetchArticleById fulfilled', () => {
        const state: DeepPartial<ArticleDetailsSchema> = { isLoading: true };

        expect(
            articleDetailsReducer(
                state as ArticleDetailsSchema,
                fetchArticleById.fulfilled(articleData, 'requestId', ''),
            ),
        ).toEqual({
            isLoading: false,
            data: articleData,
        });
    });

    test('test fetchArticleById rejected', () => {
        const state: DeepPartial<ArticleDetailsSchema> = { isLoading: true };

        expect(
            articleDetailsReducer(
                state as ArticleDetailsSchema,
                fetchArticleById.rejected(
                    new Error('Fetch failed'),
                    '',
                    undefined,
                    'Fetch failed',
                ),
            ),
        ).toEqual({
            isLoading: false,
            error: 'Fetch failed',
        });
    });
});
