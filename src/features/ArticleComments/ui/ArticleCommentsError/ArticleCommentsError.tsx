import { memo } from 'react';
import { CommentListError } from '@/entities/Comment';
import { VStack } from '@/shared/ui/common/Stack';

import { ArticleCommentsProps } from '../ArticleComments';
import { ArticleCommentsHeader } from '../ArticleCommentsHeader/ArticleCommentsHeader';

export const ArticleCommentsError = memo((props: ArticleCommentsProps) => {
    const { className, id } = props;

    return (
        <VStack
            gap="16"
            max
            className={className}
            data-testid="article-comments"
        >
            <ArticleCommentsHeader id={id} />
            <CommentListError />
        </VStack>
    );
});
