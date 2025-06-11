// import { Query, query, where, orderBy } from 'firebase/firestore';
// import { dataPoint } from '@/shared/lib/firestore/firestore';
// import { Question } from '@/entities/Question';
// import { EntityType } from '@/shared/types/entityType';
//
// export const createQuestionsQuery = (
//     userId: string,
//     type: EntityType,
// ): Query<Question> => {
//     const questionsCollection = dataPoint<Question>('questions');
//     return query(
//         questionsCollection,
//         where('userId', '==', userId),
//         orderBy('createdAt', 'desc'),
//     );
// };

import { Query, query, where, orderBy } from 'firebase/firestore';
import { dataPoint } from '@/shared/lib/firestore/firestore';
import { Question } from '@/entities/Question';
import { EntityType } from '@/shared/types/entityType'; // Adjust path if necessary

export const createQuestionsQuery = (
    userId: string,
    type: EntityType,
): Query<Question> => {
    const questionsCollection = dataPoint<Question>('questions');

    const filters = [
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
        where('type', '==', type),
    ];

    return query(questionsCollection, ...filters);
};
