import { fetchQueryResults } from '@/shared/lib/firestore/fetchQueryResults/fetchQueryResults';
import { Question } from '@/entities/Question';
import { createQuestionsQuery } from '../createQuestionsQuery/createQuestionsQuery';

export const fetchQuestionsForUser = async (userId: string) => {
    const questionsQuery = createQuestionsQuery(userId);

    const questions = await fetchQueryResults<Question>(questionsQuery);
    return questions;
};
