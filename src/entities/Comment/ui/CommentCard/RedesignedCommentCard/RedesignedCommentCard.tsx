import { memo } from 'react';
import { getRouteProfile } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import cls from '../CommentCard.module.scss';
import { Comment } from '../../../model/types/comment';
import { Card } from '@/shared/ui/redesigned/Card';

interface RedesignedCommentCardProps {
    className?: string;
    comment: Comment;
}

export const RedesignedCommentCard = memo(
    (props: RedesignedCommentCardProps) => {
        const { className, comment } = props;

        return (
            <Card padding="24" max>
                <VStack
                    data-testid="CommentCard.Content"
                    gap="8"
                    max
                    className={classNames(cls.CommentCardRedesigned, {}, [
                        className,
                    ])}
                >
                    <AppLink to={getRouteProfile(comment.user.id)}>
                        <HStack gap="8">
                            {comment.user.avatar ? (
                                <Avatar
                                    size={30}
                                    src={comment.user.avatar}
                                    userName={comment.user.username}
                                />
                            ) : (
                                <Text text={comment.user.username} bold />
                            )}
                        </HStack>
                    </AppLink>
                    <Text text={comment.text} />
                </VStack>
            </Card>
        );
    },
);
