import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { getRouteProfile } from '@/shared/const/router/router';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { Text } from '@/shared/ui/deprecated/Text';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import cls from '../CommentCard.module.scss';
import { Comment } from '../../../model/types/comment';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Icon } from '@/shared/ui/deprecated/Icon';
import DeleteIcon from '@/shared/assets/icons/delete.svg';
import { ConfirmDeleteModal } from '@/shared/ui/common/ConfirmDeleteModal';
import { useToggleVisibility } from '@/shared/lib/hooks/useToggleVisibility/useToggleVisibility';
import { truncateText } from '@/shared/lib/text/truncateText/truncateText';

interface CommentCardDeprecatedProps {
    className?: string;
    comment: Comment;
    deleteComment?: (commentId: string) => Promise<any>;
}

export const CommentCardDeprecated = memo(
    (props: CommentCardDeprecatedProps) => {
        const { className, comment, deleteComment } = props;
        const { t } = useTranslation('articleDetails');
        const { text, id, user } = comment;
        const additionalClasses = getFlexClasses({ hStack: true, gap: '8' });

        const deleteCommentModal = useToggleVisibility();

        const handleDelete = useCallback(async () => {
            deleteComment?.(id);
        }, [id, deleteComment]);

        return (
            <VStack
                max
                gap="8"
                className={classNames(cls.CommentCard, {}, [className])}
            >
                <HStack justify="between" max align="center">
                    <AppLink
                        to={`${getRouteProfile(user.id)}`}
                        className={classNames(
                            cls.header,
                            {},
                            additionalClasses,
                        )}
                    >
                        {user.avatar ? (
                            <Avatar
                                className={cls.avatar}
                                size={30}
                                src={user.avatar}
                            />
                        ) : null}
                        <Text title={user.username} />
                    </AppLink>
                    {deleteComment && (
                        <Button
                            onClick={deleteCommentModal.show}
                            theme={ButtonTheme.CLEAR}
                        >
                            <Icon Svg={DeleteIcon} width={24} variant="error" />
                        </Button>
                    )}
                    {deleteCommentModal.isVisible && (
                        <ConfirmDeleteModal
                            isOpen={deleteCommentModal.isVisible}
                            onCancel={deleteCommentModal.hide}
                            text={`${t('коментар')} "${truncateText(text, 100)}" ${t('від користувача')} <b>${user.username}</b>`}
                            onConfirm={handleDelete}
                        />
                    )}
                </HStack>

                <Text text={text} />
            </VStack>
        );
    },
);
