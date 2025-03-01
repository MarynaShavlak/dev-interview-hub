import { query, where, getDocs } from 'firebase/firestore';
import { handleRequestErrorMessage } from '@/shared/lib/firestore/handleRequestErrorMessage/handleRequestErrorMessage';
import { ArticleRatingType } from '../../../model/types/articleRatingType';
import { ERROR_RATING_MESSAGES } from '../../../model/consts/errorRatingMessages';
import { dataPoint } from '@/shared/lib/firestore/firestore';

export const checkExistingRating = async (
    articleId: string,
    userId: string,
): Promise<boolean> => {
    const ratingsCollection = dataPoint<ArticleRatingType>('ratings');

    const q = query(
        ratingsCollection,
        where('articleId', '==', articleId),
        where('user.id', '==', userId),
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        handleRequestErrorMessage(ERROR_RATING_MESSAGES.RATING_ALREADY_EXISTS);
        return true;
    }

    return false;
};
