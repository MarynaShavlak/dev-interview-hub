import React, { memo } from 'react';
import { Page } from '@/widgets/Page';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from './ArticleEditorPage.module.scss';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { createArticleReducer } from '../../model/slices/createArticleSlice';
import { ArticleEditorPageContainer } from '../ArticleEditorPageContainer/ArticleEditorPageContainer';

interface ArticleEditorPageProps {
    className?: string;
}

const reducers: ReducersList = {
    createArticle: createArticleReducer,
};

const ArticleEditorPage = memo((props: ArticleEditorPageProps) => {
    const { className } = props;

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page
                className={classNames(cls.ArticleEditorPage, {}, [className])}
            >
                <ArticleEditorPageContainer />
            </Page>
        </DynamicModuleLoader>
    );
});

export default ArticleEditorPage;
