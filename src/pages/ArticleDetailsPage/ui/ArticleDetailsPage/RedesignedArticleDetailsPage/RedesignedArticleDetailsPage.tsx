import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cls from '../ArticleDetailsPage.module.scss';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Page } from '@/widgets/Page';
import { ArticleDetailsPageProps } from '../ArticleDetailsPage';
import { ArticleListNavigationButton } from '@/features/ArticleListNavigationButton';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { Text } from '@/shared/ui/redesigned/Text';

import { ArticleDetailsPageContainer } from '../ArticleDetailsPageContainer/ArticleDetailsPageContainer';
import { AdditionalInfoContainer } from '../../AdditionalInfoContainer/AdditionalInfoContainer';
import { useArticleDataById } from '@/entities/Article';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

export const RedesignedArticleDetailsPage = memo(
    ({ className }: ArticleDetailsPageProps) => {
        const { id } = useParams<{ id: string }>();
        const { t } = useTranslation();
        const dispatch = useAppDispatch();
        const errorText = t('Сторінку видалено');
        const {
            data: article,
            isLoading,
            error,
        } = useArticleDataById(id || '');

        const views = article?.views;
        console.log('views', views);

        // const hasTrackedView = useRef(false);
        //
        // useEffect(() => {
        //     if (!id || !article || isLoading || hasTrackedView.current) return;
        //
        //     const viewData = getArticleViewData(id);
        //     const needUpdate = shouldCountView(viewData);
        //
        //     if (needUpdate) {
        //         hasTrackedView.current = true;
        //         dispatch(updateArticleViewsThunk(article));
        //     }
        // }, [id, article, dispatch, hasTrackedView.current]);

        if (isLoading) {
            return <Skeleton width="100%" height="100vh" border="40px" />;
        }

        if (!id || !article?.id) {
            return (
                <StickyContentLayout
                    left={<ArticleListNavigationButton />}
                    content={
                        <Page
                            className={classNames(cls.ArticleDetailsPage, {}, [
                                className,
                            ])}
                        >
                            <Text text={errorText} variant="error" />
                        </Page>
                    }
                />
            );
        }

        return (
            <StickyContentLayout
                left={<ArticleListNavigationButton />}
                content={
                    <Page
                        className={classNames(cls.ArticleDetailsPage, {}, [
                            className,
                        ])}
                    >
                        {id ? (
                            <ArticleDetailsPageContainer id={id} />
                        ) : (
                            <Text text={errorText} />
                        )}
                    </Page>
                }
                right={<AdditionalInfoContainer id={id} />}
            />
        );
    },
);
