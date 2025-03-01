import { getDoc } from 'firebase/firestore';
import { addDocToFirestore } from '@/shared/lib/firestore/addDocToFirestore/addDocToFirestore';
import { handleRequestErrorMessage } from '@/shared/lib/firestore/handleRequestErrorMessage/handleRequestErrorMessage';
import { ArticleRatingType } from '../../../model/types/articleRatingType';
import { ERROR_RATING_MESSAGES } from '../../../model/consts/errorRatingMessages';

export type NewRatingDraft = Omit<ArticleRatingType, 'createdAt'>;

export const saveRatingToFirestore = async (newRating: NewRatingDraft) => {
    const ratingWithTimestamp = {
        ...newRating,
        createdAt: new Date().toISOString(),
    };
    const docRef = await addDocToFirestore<ArticleRatingType>(
        'ratings',
        ratingWithTimestamp,
    );

    const createdDocSnapshot = await getDoc(docRef);
    if (!createdDocSnapshot.exists()) {
        handleRequestErrorMessage(ERROR_RATING_MESSAGES.RATE_RETRIEVAL_FAIL);
    }

    return createdDocSnapshot.data() as ArticleRatingType;
};
