import React, { memo } from 'react';
import { Page } from '@/widgets/Page';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from './ArticleEditorPage.module.scss';

import { ArticleEditorPageContainer } from '../ArticleEditorPageContainer/ArticleEditorPageContainer';

interface ArticleEditorPageProps {
    className?: string;
}

const ArticleEditorPage = memo((props: ArticleEditorPageProps) => {
    const { className } = props;

    return (
        <Page className={classNames(cls.ArticleEditorPage, {}, [className])}>
            <ArticleEditorPageContainer />
        </Page>
    );
});

export default ArticleEditorPage;
