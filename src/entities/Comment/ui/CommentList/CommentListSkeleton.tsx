import { memo } from 'react';
import { VStack } from '@/shared/ui/common/Stack';
import { CommentCard } from '../CommentCard/CommentCard';

export const CommentListSkeleton = memo(
    ({ className }: { className?: string }) => {
        return (
            <VStack
                gap="16"
                max
                className={className}
                data-testid="article-comments-loading"
            >
                <CommentCard isLoading />
                <CommentCard isLoading />
                <CommentCard isLoading />
            </VStack>
        );
    },
);
