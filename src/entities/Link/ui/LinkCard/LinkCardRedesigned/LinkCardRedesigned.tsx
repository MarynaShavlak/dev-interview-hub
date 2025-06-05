import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { HStack } from '@/shared/ui/common/Stack';
import { classNames } from '@/shared/lib/classes/classNames/classNames';

import { Text } from '@/shared/ui/redesigned/Text';

import { Card } from '@/shared/ui/redesigned/Card';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { OrderCard } from '@/shared/ui/redesigned/OrderCard';
import { LinkCardProps } from '../LinkCard';
import { Icon } from '@/shared/ui/redesigned/Icon';
import DeleteIcon from '@/shared/assets/icons/delete.svg';
import EditIcon from '@/shared/assets/icons/edit.svg';

import { useLinkCard } from '../../../lib/hook/useLinkCard/useLinkCard';
import { EditLinkForm } from '../../EditLinkForm/EditLinkForm';

export const LinkCardRedesigned = memo((props: LinkCardProps) => {
    const { link, deleteLink, updateLink, target, index } = props;
    const { t } = useTranslation('articles');
    const additionalClasses = getFlexClasses({
        hStack: true,
        align: 'center',
    });
    const {
        isEditing,
        handleEdit,
        handleDeleteClick,
        handleCancelEditing,
        handleSave,
    } = useLinkCard({
        link,
        deleteLink,
        updateLink,
    });

    return (
        <Card
            border="partial"
            padding="24"
            className={classNames('', {}, [...additionalClasses])}
            max
        >
            {isEditing ? (
                <HStack justify="between" max>
                    <HStack gap="24" max>
                        <OrderCard index={index} />
                        <EditLinkForm
                            link={link}
                            onCancel={handleCancelEditing}
                            onSave={handleSave}
                        />
                    </HStack>
                </HStack>
            ) : (
                <HStack justify="between" max>
                    <HStack gap="24">
                        <OrderCard index={index} />
                        <Text text={link.text} size="m" withTags />
                    </HStack>

                    <HStack justify="center" gap="8">
                        <Icon
                            Svg={EditIcon}
                            width={18}
                            clickable
                            onClick={handleEdit}
                        />
                        <Icon
                            Svg={DeleteIcon}
                            width={18}
                            variant="error"
                            clickable
                            onClick={handleDeleteClick}
                        />
                    </HStack>
                </HStack>
            )}
        </Card>
    );
});
