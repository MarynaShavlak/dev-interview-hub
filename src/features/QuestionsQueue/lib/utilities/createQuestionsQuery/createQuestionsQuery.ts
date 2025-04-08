import { Query, query, where, orderBy } from 'firebase/firestore';
import { dataPoint } from '@/shared/lib/firestore/firestore';
import { Question } from '@/entities/Question';

export const createQuestionsQuery = (userId: string): Query<Question> => {
    const questionsCollection = dataPoint<Question>('questions');
    return query(
        questionsCollection,
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
    );
};
