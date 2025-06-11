import { fetchQueryResults } from '@/shared/lib/firestore/fetchQueryResults/fetchQueryResults';
import { HRInterviewQA } from '../../..';
import { createHRInterviewsByUserQuery } from '../createHRInterviewsByUserQuery/createHRInterviewsByUserQuery';

export const fetchHRInterviewsForUser = async (userId: string) => {
    const articlesQuery = createHRInterviewsByUserQuery(userId);

    const articles = await fetchQueryResults<HRInterviewQA>(articlesQuery);
    return articles;
};
