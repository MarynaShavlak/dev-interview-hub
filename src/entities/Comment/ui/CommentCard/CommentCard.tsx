import { memo } from 'react';
import { CommentCardSkeleton } from './CommentCardSkeleton/CommentCardSkeleton';
import { CommentCardRedesigned } from './CommentCardRedesigned/CommentCardRedesigned';
import { CommentCardDeprecated } from './CommentCardDeprecated/CommentCardDeprecated';
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
                <CommentCardRedesigned
                    comment={comment}
                    className={className}
                />
            }
            off={
                <CommentCardDeprecated
                    comment={comment}
                    className={className}
                />
            }
        />
    );
});
