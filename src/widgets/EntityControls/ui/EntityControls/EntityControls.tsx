import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { EntitiesListNavigationButton } from '@/shared/ui/common/EntitiesListNavigationButton';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Text } from '@/shared/ui/redesigned/Text';

import { Article } from '@/entities/Article';

import { LiveCode } from '@/entities/LiveCode';
import { formatDateString } from '@/shared/lib/text/formatDateString/formatDateString';
import { useGetUserRoles } from '@/entities/User';
import { EntityType } from '@/shared/types/entityType';
import { getCanEditArticle } from '../../model/selectors/getCanEditArticle/getCanEditArticle';
import { getCanEditLiveCodeTask } from '../../model/selectors/getCanEditLiveCodeTask/getCanEditLiveCodeTask';
import { renderEditButton } from '../../lib/utils/render/renderEditButton';

type Entity = Article | LiveCode;

interface EntityControlsProps {
    className?: string;
    entity: Entity;
    entityType: EntityType;
}

export const EntityControls = memo((props: EntityControlsProps) => {
    const { className, entity, entityType } = props;
    const { user: author, createdAt, id } = entity;
    const { t } = useTranslation('entityDetails');
    const { isAdmin } = useGetUserRoles();

    const canEditArticle = useSelector(getCanEditArticle(id));
    const canEditLiveCode = useSelector(getCanEditLiveCodeTask(id));

    const canEdit = (() => {
        switch (entityType) {
            case 'article':
                return canEditArticle || isAdmin;
            case 'liveCode':
                return canEditLiveCode || isAdmin;
            default:
                return false;
        }
    })();

    const renderViews = () => {
        if (entityType === 'article' && 'views' in entity) {
            return (
                <Text
                    text={t('{{count}} переглядів', {
                        count: entity.views,
                    })}
                />
            );
        }
        return null;
    };

    const convertedDate = formatDateString(createdAt);

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={
                <VStack gap="32" className={classNames('', {}, [className])}>
                    <VStack gap="8">
                        <Avatar
                            size={32}
                            src={author.avatar}
                            userName={author.username}
                            textLength={16}
                        />
                        <Text text={convertedDate} />
                    </VStack>
                    {canEdit && renderEditButton(entityType, id)}
                    {renderViews()}
                </VStack>
            }
            off={
                <HStack max justify="between" className={className}>
                    <EntitiesListNavigationButton type={entityType} />
                    {canEdit && renderEditButton(entityType, id)}
                </HStack>
            }
        />
    );
});
