import { memo } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { CommentList } from '@/entities/Comment';
import { VStack } from '@/shared/ui/common/Stack';

import { useCommentsByArticleId } from '../api/articleCommentsApi';
import { deleteCommentFromArticleThunk } from '../model/services/deleteCommentFromArticleThunk/deleteCommentFromArticleThunk';
import { useGetUserRoles } from '@/entities/User';
import { ArticleCommentsSkeleton } from './ArticleCommentsSkeleton/ArticleCommentsSkeleton';
import { ArticleCommentsHeader } from './ArticleCommentsHeader/ArticleCommentsHeader';

export interface ArticleCommentsProps {
    className?: string;
    id: string;
}

const ArticleComments = memo((props: ArticleCommentsProps) => {
    const { className, id } = props;
    const dispatch = useAppDispatch();
    const { isAdmin, isManager } = useGetUserRoles();

    const { data: comments, isLoading, error } = useCommentsByArticleId(id);

    const handleDeleteComment = async (commentId: string) => {
        try {
            const deletedCommentId = await dispatch(
                deleteCommentFromArticleThunk(commentId),
            ).unwrap();
            console.log('success delete comment');

            return deletedCommentId;
        } catch (error) {
            console.error('Error deleting comment:', error);
            return null;
        }
    };

    if (isLoading) {
        return <ArticleCommentsSkeleton />;
    }

    return (
        <VStack
            gap="16"
            max
            className={className}
            data-testid="article-comments"
        >
            <ArticleCommentsHeader id={id} />
            {error ? (
                <CommentList
                    isLoading={false}
                    comments={undefined}
                    error={error as string}
                    deleteComment={handleDeleteComment}
                    canDeleteComments={isAdmin || isManager}
                />
            ) : (
                <CommentList
                    isLoading={isLoading}
                    comments={comments}
                    error={error as string}
                    deleteComment={handleDeleteComment}
                    canDeleteComments={isAdmin || isManager}
                />
            )}
        </VStack>
    );
});

export default ArticleComments;
