import { memo } from 'react';
import { getRouteProfile } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/deprecated/Text';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import cls from './CommentCard.module.scss';
import { Comment } from '../../model/types/comment';

interface CommentCardProps {
    className?: string;
    comment?: Comment;
    isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
    const { className, comment, isLoading } = props;

    if (isLoading) {
        return (
            <VStack
                max
                gap="8"
                className={classNames(cls.CommentCard, {}, [
                    className,
                    cls.loading,
                ])}
            >
                <div className={cls.header}>
                    <Skeleton
                        width={30}
                        height={30}
                        border="50%"
                        className={cls.avatar}
                    />
                    <Skeleton height={16} width={100} />
                </div>
                <Skeleton className={cls.text} width="100%" height={50} />
            </VStack>
        );
    }

    if (!comment) {
        return null;
    }

    return (
        <VStack
            max
            gap="8"
            className={classNames(cls.CommentCard, {}, [className])}
        >
            <AppLink
                to={`${getRouteProfile(comment.user.id)}`}
                className={cls.header}
            >
                {comment.user.avatar ? (
                    <Avatar
                        className={cls.avatar}
                        size={30}
                        src={comment.user.avatar}
                    />
                ) : null}
                <Text title={comment.user.username} />
            </AppLink>
            <Text text={comment.text} />
        </VStack>
    );
});
