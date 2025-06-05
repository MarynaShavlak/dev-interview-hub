import { fetchQueryResults } from '@/shared/lib/firestore/fetchQueryResults/fetchQueryResults';
import { createLinksQuery } from '../createLinksQuery/createLinksQuery';
import { Link } from '@/entities/Link';

export const fetchLinksForUser = async (userId: string) => {
    const linksQuery = createLinksQuery(userId);

    const links = await fetchQueryResults<Link>(linksQuery);
    return links;
};
