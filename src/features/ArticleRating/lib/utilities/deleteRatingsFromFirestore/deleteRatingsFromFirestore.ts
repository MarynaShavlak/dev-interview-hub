import { deleteDocFromFirestore } from '@/shared/lib/firestore/deleteDocFromFirestore/deleteDocFromFirestore';
import { ArticleRatingType } from '../../../model/types/articleRatingType';

export const deleteRatingsFromFirestore = async (
    ratings: ArticleRatingType[],
): Promise<void> => {
    const deletePromises = ratings.map((rating) =>
        deleteDocFromFirestore('ratings', rating.id),
    );
    await Promise.allSettled(deletePromises);
};
