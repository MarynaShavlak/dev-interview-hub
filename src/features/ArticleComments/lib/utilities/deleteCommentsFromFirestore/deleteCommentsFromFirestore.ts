import { ArticleComment } from '../../..';
import { deleteDocFromFirestore } from '@/shared/lib/firestore/deleteDocFromFirestore/deleteDocFromFirestore';

export const deleteCommentsFromFirestore = async (
    comments: ArticleComment[],
): Promise<void> => {
    const deletePromises = comments.map((comment) =>
        deleteDocFromFirestore('comments', comment.id),
    );
    await Promise.allSettled(deletePromises);
};
