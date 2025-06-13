import { Query, query, where, orderBy } from 'firebase/firestore';
import { dataPoint } from '@/shared/lib/firestore/firestore';
import { Link } from '@/entities/Link';

export const createLinksQuery = (userId: string): Query<Link> => {
    const linksCollection = dataPoint<Link>('links');
    return query(
        linksCollection,
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
    );
};
