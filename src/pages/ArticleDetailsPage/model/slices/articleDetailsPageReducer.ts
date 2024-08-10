import { combineReducers } from '@reduxjs/toolkit';
import { ArticleDetailsPageSchema } from '../types/articleDetailsPageSchema';
import { articleCommentsReducer } from '@/widgets/ArticleComments';
import { articleRecommendationsReducer } from '@/features/articleRecommendationsList';

export const articleDetailsPageReducer =
    combineReducers<ArticleDetailsPageSchema>({
        recommendations: articleRecommendationsReducer,
        comments: articleCommentsReducer,
    });
