import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { HStack, VStack } from '@/shared/ui/common/Stack';
import { classNames } from '@/shared/lib/classes/classNames/classNames';

import { Card } from '@/shared/ui/deprecated/Card';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { OrderCard } from '@/shared/ui/deprecated/OrderCard';
import { Icon } from '@/shared/ui/deprecated/Icon';
import DeleteIcon from '@/shared/assets/icons/delete.svg';
import EditIcon from '@/shared/assets/icons/edit.svg';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { useLinkCard } from '../../../lib/hook/useLinkCard/useLinkCard';
import { EditLinkForm } from '../../EditLinkForm/EditLinkForm';
import { LinkCardProps } from '../LinkCard';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { Text, TextSize } from '@/shared/ui/deprecated/Text';

export const LinkCardDeprecated = memo((props: LinkCardProps) => {
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
                        <AppLink to={link.text} target="_blank">
                            <VStack gap="8">
                                <Text
                                    text={link.label}
                                    size={TextSize.M}
                                    withTags
                                />
                                <Text text={link.text} size={TextSize.S} />
                            </VStack>
                        </AppLink>
                    </HStack>

                    <HStack justify="center" gap="8">
                        <Button
                            className={classNames('', {}, additionalClasses)}
                            theme={ButtonTheme.CLEAR}
                            onClick={handleEdit}
                        >
                            <Icon Svg={EditIcon} width={18} variant="primary" />
                        </Button>
                        <Button
                            className={classNames('', {}, additionalClasses)}
                            theme={ButtonTheme.CLEAR}
                            onClick={handleDeleteClick}
                        >
                            <Icon Svg={DeleteIcon} width={18} variant="error" />
                        </Button>
                    </HStack>
                </HStack>
            )}
        </Card>
    );
});
