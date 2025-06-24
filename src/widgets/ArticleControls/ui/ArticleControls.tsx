import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { EntitiesListNavigationButton } from '@/shared/ui/common/EntitiesListNavigationButton';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { getCanEditArticle } from '../model/selectors/getCanEditArticle/getCanEditArticle';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Text } from '@/shared/ui/redesigned/Text';
import { ArticleEditNavigationButton } from '@/features/ArticleEditNavigationButton';
import { Article } from '@/entities/Article';
import { formatDateString } from '@/shared/lib/text/formatDateString/formatDateString';
import { useGetUserRoles } from '@/entities/User';
import { EntityEditNavigationButton } from '@/features/EntityEditNavigationButton';

interface ArticleControlsProps {
    className?: string;
    article: Article;
}

export const ArticleControls = memo((props: ArticleControlsProps) => {
    const { className, article } = props;
    const { user: author, createdAt, views, id } = article;
    const { t } = useTranslation('articleDetails');
    const { isAdmin } = useGetUserRoles();
    const canEdit = useSelector(getCanEditArticle(id)) || isAdmin;
    const convertedDate = formatDateString(createdAt);

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={
                <VStack
                    gap="32"
                    className={classNames('', {}, [className])}
                    data-testid="ArticleDetails.CreatedAt"
                >
                    <VStack gap="8">
                        <Avatar
                            size={32}
                            src={author.avatar}
                            userName={author.username}
                            textLength={16}
                        />
                        <Text text={convertedDate} />
                    </VStack>
                    {canEdit && (
                        <EntityEditNavigationButton
                            id={id}
                            entityType="article"
                            max
                        />
                    )}
                    <Text
                        text={t('{{count}} переглядів', { count: views })}
                        data-testid="ArticleDetails.Views"
                    />
                </VStack>
            }
            off={
                <HStack max justify="between" className={className}>
                    <EntitiesListNavigationButton type="article" />
                    {canEdit && <ArticleEditNavigationButton id={id} />}
                </HStack>
            }
        />
    );
});
