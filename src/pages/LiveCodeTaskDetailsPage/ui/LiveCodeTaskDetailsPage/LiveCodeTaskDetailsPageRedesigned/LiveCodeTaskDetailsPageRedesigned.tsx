import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { EntitiesListNavigationButton } from '@/shared/ui/common/EntitiesListNavigationButton';
import cls from '../LiveCodeTaskDetailsPage.module.scss';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Page } from '@/widgets/Page';
import { LiveCodeTaskDetailsPageProps } from '../LiveCodeTaskDetailsPage';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { Text } from '@/shared/ui/redesigned/Text';

import { LiveCodeTaskDetailsPageContainer } from '../LiveCodeTaskDetailsPageContainer/LiveCodeTaskDetailsPageContainer';
import { AdditionalInfoContainer } from '../../AdditionalInfoContainer/AdditionalInfoContainer';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { useLiveCodeDataById } from '@/entities/LiveCode';

export const LiveCodeTaskDetailsPageRedesigned = memo(
    ({ className }: LiveCodeTaskDetailsPageProps) => {
        const { id } = useParams<{ id: string }>();
        const { t } = useTranslation();

        const errorText = t('Сторінку видалено');
        const {
            data: liveCodeTask,
            isLoading,
            error,
        } = useLiveCodeDataById(id || '');

        if (isLoading) {
            return <Skeleton width="100%" height="100vh" border="40px" />;
        }

        if (!id || !liveCodeTask?.id) {
            return (
                <StickyContentLayout
                    left={<EntitiesListNavigationButton type="liveCode" />}
                    content={
                        <Page
                            className={classNames(
                                cls.LiveCodeTaskDetailsPage,
                                {},
                                [className],
                            )}
                        >
                            <Text text={errorText} variant="error" />
                        </Page>
                    }
                />
            );
        }

        return (
            <StickyContentLayout
                left={<EntitiesListNavigationButton type="liveCode" />}
                content={
                    <Page
                        className={classNames(cls.LiveCodeTaskDetailsPage, {}, [
                            className,
                        ])}
                    >
                        {id ? (
                            <LiveCodeTaskDetailsPageContainer id={id} />
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
