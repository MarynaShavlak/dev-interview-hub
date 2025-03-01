import React, { memo, useCallback } from 'react';
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

interface CommentCardDeprecatedProps {
    className?: string;
    comment: Comment;
    deleteComment?: (commentId: string) => Promise<any>;
}

export const CommentCardDeprecated = memo(
    (props: CommentCardDeprecatedProps) => {
        const { className, comment, deleteComment } = props;
        const { text, id, user } = comment;
        const additionalClasses = getFlexClasses({ hStack: true, gap: '8' });

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
                            onClick={handleDelete}
                            theme={ButtonTheme.CLEAR}
                        >
                            <Icon Svg={DeleteIcon} width={24} variant="error" />
                        </Button>
                    )}
                </HStack>

                <Text text={text} />
            </VStack>
        );
    },
);
