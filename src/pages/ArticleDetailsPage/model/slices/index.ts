import { combineReducers } from '@reduxjs/toolkit';
import { articleDetailsPageRecommendationsReducer } from './articleDetailsPageRecommendationsSlice';
import { ArticleDetailsPageSchema } from '../types';
import { articleCommentsReducer } from '@/widgets/ArticleComments';

export const articleDetailsPageReducer =
    combineReducers<ArticleDetailsPageSchema>({
        recommendations: articleDetailsPageRecommendationsReducer,
        comments: articleCommentsReducer,
    });
