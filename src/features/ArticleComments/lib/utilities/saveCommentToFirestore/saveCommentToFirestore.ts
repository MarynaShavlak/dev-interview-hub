import { getDoc } from 'firebase/firestore';
import { ArticleComment } from '../../../model/types/articleComment';
import { addDocToFirestore } from '@/shared/lib/firestore/addDocToFirestore/addDocToFirestore';
import { handleRequestErrorMessage } from '@/shared/lib/firestore/handleRequestErrorMessage/handleRequestErrorMessage';
import { ERROR_MESSAGES } from '../../../model/consts/errorMessages';

export type NewCommentDraft = Omit<ArticleComment, 'createdAt'>;

export const saveCommentToFirestore = async (newComment: NewCommentDraft) => {
    // try {
    const commentWithTimestamp = {
        ...newComment,
        createdAt: new Date().toISOString(),
    };
    const docRef = await addDocToFirestore<ArticleComment>(
        'comments',
        commentWithTimestamp,
    );

    const createdDocSnapshot = await getDoc(docRef);
    if (!createdDocSnapshot.exists()) {
        handleRequestErrorMessage(ERROR_MESSAGES.COMMENT_RETRIEVAL_FAIL);
    }

    return createdDocSnapshot.data() as ArticleComment;
};
