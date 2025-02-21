import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { ArticleDetailsPageProps } from '../ArticleDetailsPage';
import { Page } from '@/widgets/Page';
import { ArticleDetailsPageContainer } from '../ArticleDetailsPageContainer/ArticleDetailsPageContainer';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from '../ArticleDetailsPage.module.scss';

export const ArticleDetailsPageDeprecated = memo(
    ({ className }: ArticleDetailsPageProps) => {
        const { id } = useParams<{ id: string }>();
        if (!id) return null;
        return (
            <Page
                className={classNames(cls.ArticleDetailsPage, {}, [className])}
            >
                <ArticleDetailsPageContainer id={id} />
            </Page>
        );
    },
);
