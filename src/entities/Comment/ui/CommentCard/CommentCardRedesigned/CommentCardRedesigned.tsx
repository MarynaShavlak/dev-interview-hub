import React, { memo } from 'react';
import { getRouteProfile } from '@/shared/const/router/router';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import cls from '../CommentCard.module.scss';
import { Comment } from '../../../model/types/comment';
import { Card } from '@/shared/ui/redesigned/Card';
import { useCommentActions } from '../../../lib/hook/useCommentActions/useCommentActions';
import DeleteIcon from '@/shared/assets/icons/delete.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { ConfirmDeleteModal } from '@/shared/ui/common/ConfirmDeleteModal';

interface CommentCardRedesignedProps {
    className?: string;
    comment: Comment;
    deleteComment?: (commentId: string) => Promise<any>;
}

export const CommentCardRedesigned = memo(
    (props: CommentCardRedesignedProps) => {
        const { className, comment, deleteComment } = props;

        const { text, user } = comment;
        const { deleteCommentModal, handleDelete, confirmDeleteText } =
            useCommentActions({ comment, deleteComment });

        return (
            <Card padding="24" max>
                <VStack
                    gap="8"
                    max
                    className={classNames(cls.CommentCardRedesigned, {}, [
                        className,
                    ])}
                >
                    <HStack justify="between" max align="center">
                        <AppLink to={getRouteProfile(user.id)}>
                            <HStack gap="8">
                                {user.avatar ? (
                                    <Avatar
                                        size={30}
                                        src={user.avatar}
                                        userName={user.username}
                                    />
                                ) : (
                                    <Text text={user.username} bold />
                                )}
                            </HStack>
                        </AppLink>
                        {deleteComment && (
                            <Icon
                                clickable
                                Svg={DeleteIcon}
                                onClick={deleteCommentModal.show}
                                width={24}
                            />
                        )}
                        {deleteCommentModal.isVisible && (
                            <ConfirmDeleteModal
                                isOpen={deleteCommentModal.isVisible}
                                onCancel={deleteCommentModal.hide}
                                text={confirmDeleteText}
                                onConfirm={handleDelete}
                            />
                        )}
                    </HStack>

                    <Text text={text} />
                </VStack>
            </Card>
        );
    },
);
