import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useToggleVisibility } from '@/shared/lib/hooks/useToggleVisibility/useToggleVisibility';
import { truncateText } from '@/shared/lib/text/truncateText/truncateText';
import { Comment } from '../../../model/types/comment';

interface UseCommentActionsProps {
    comment: Comment;
    deleteComment?: (commentId: string) => Promise<any>;
}

export const useCommentActions = ({
    comment,
    deleteComment,
}: UseCommentActionsProps) => {
    const { t } = useTranslation('articleDetails');
    const deleteCommentModal = useToggleVisibility();

    const handleDelete = useCallback(async () => {
        if (deleteComment) {
            await deleteComment(comment.id);
        }
    }, [comment.id, deleteComment]);

    const confirmDeleteText = `${t('коментар')} "${truncateText(comment.text, 100)}" ${t('від користувача')} <b>${comment.user.username}</b>`;

    return {
        deleteCommentModal,
        handleDelete,
        confirmDeleteText,
    };
};
