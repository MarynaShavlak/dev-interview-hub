import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Each } from '@/shared/lib/components/Each/Each';
import { VStack } from '@/shared/ui/common/Stack';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { CommentCard } from '../CommentCard/CommentCard';
import { Comment } from '../../model/types/comment';
import { CommentListSkeleton } from './CommentListSkeleton';

interface CommentListProps {
    className?: string;
    comments?: Comment[];
    isLoading?: boolean;
    error?: string;
    deleteComment: (commentId: string) => Promise<any>;
    canDeleteComments: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
    const {
        className,
        isLoading,
        comments,
        error,
        deleteComment,
        canDeleteComments,
    } = props;
    const { t } = useTranslation('articleDetails');
    const noCommentsMessage = t('Коментарів немає');
    const errorMessage = t(
        'Не вдалося завантажити коментарі. Спробуйте ще раз пізніше.',
    );

    if (isLoading) {
        return <CommentListSkeleton className={className} />;
    }
    if (error) {
        return (
            <VStack gap="16" max className={className} align="center">
                <ToggleFeaturesComponent
                    feature="isAppRedesigned"
                    on={<Text text={errorMessage} />}
                    off={<TextDeprecated text={errorMessage} />}
                />
            </VStack>
        );
    }

    return (
        <VStack
            gap="16"
            max
            className={className}
            data-testid="CommentCard.Content"
        >
            {comments?.length ? (
                <Each
                    of={comments}
                    render={(item) => (
                        <CommentCard
                            key={item.id}
                            comment={item}
                            isLoading={isLoading}
                            deleteComment={deleteComment}
                            canDeleteComments={canDeleteComments}
                        />
                    )}
                />
            ) : (
                <ToggleFeaturesComponent
                    feature="isAppRedesigned"
                    on={<Text text={noCommentsMessage} />}
                    off={<TextDeprecated text={noCommentsMessage} />}
                />
            )}
        </VStack>
    );
});
