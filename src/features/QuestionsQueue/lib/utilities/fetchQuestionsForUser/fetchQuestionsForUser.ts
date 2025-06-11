import { fetchQueryResults } from '@/shared/lib/firestore/fetchQueryResults/fetchQueryResults';
import { Question } from '@/entities/Question';
import { createQuestionsQuery } from '../createQuestionsQuery/createQuestionsQuery';
import { EntityType } from '@/shared/types/entityType';

export const fetchQuestionsForUser = async (
    userId: string,
    type: EntityType,
) => {
    const questionsQuery = createQuestionsQuery(userId, type);

    const questions = await fetchQueryResults<Question>(questionsQuery);
    return questions;
};
