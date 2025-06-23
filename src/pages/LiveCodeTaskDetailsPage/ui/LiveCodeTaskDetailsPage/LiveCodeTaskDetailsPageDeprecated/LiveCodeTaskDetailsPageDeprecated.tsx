import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { LiveCodeTaskDetailsPageProps } from '../LiveCodeTaskDetailsPage';
import { Page } from '@/widgets/Page';
import { LiveCodeTaskDetailsPageContainer } from '../LiveCodeTaskDetailsPageContainer/LiveCodeTaskDetailsPageContainer';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from '../LiveCodeTaskDetailsPage.module.scss';

export const LiveCodeTaskDetailsPageDeprecated = memo(
    ({ className }: LiveCodeTaskDetailsPageProps) => {
        const { id } = useParams<{ id: string }>();
        if (!id) return null;
        return (
            <Page
                className={classNames(cls.ArticleDetailsPage, {}, [className])}
            >
                <LiveCodeTaskDetailsPageContainer id={id} />
            </Page>
        );
    },
);
