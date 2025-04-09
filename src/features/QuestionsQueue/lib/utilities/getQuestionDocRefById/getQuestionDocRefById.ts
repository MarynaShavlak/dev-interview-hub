import { query, where, getDocs, DocumentReference } from 'firebase/firestore';
import { dataPoint } from '@/shared/lib/firestore/firestore';
import { Question } from '@/entities/Question';

export const getQuestionDocRefById = async (
    questionId: string,
): Promise<DocumentReference | null> => {
    const questionsCollection = dataPoint<Question>('questions');
    const q = query(questionsCollection, where('id', '==', questionId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        return querySnapshot.docs[0].ref;
    }
    return null;
};
