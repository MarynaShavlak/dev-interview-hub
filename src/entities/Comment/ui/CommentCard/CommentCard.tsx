import { memo } from 'react';
import { CommentCardSkeleton } from './CommentCardSkeleton/CommentCardSkeleton';
import { RedesignedCommentCard } from './RedesignedCommentCard/RedesignedCommentCard';
import { DeprecatedCommentCard } from './DeprecatedCommentCard/DeprecatedCommentCard';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Comment } from '../../model/types/comment';

export interface CommentCardProps {
    className?: string;
    comment?: Comment;
    isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
    const { className, comment, isLoading } = props;

    if (isLoading) {
        return <CommentCardSkeleton className={className} />;
    }

    if (!comment) {
        return null;
    }

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={
                <RedesignedCommentCard
                    comment={comment}
                    className={className}
                />
            }
            off={
                <DeprecatedCommentCard
                    comment={comment}
                    className={className}
                />
            }
        />
    );
});
