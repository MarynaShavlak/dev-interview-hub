import { query, where, getDocs, DocumentReference } from 'firebase/firestore';
import { dataPoint } from '@/shared/lib/firestore/firestore';
import { Link } from '@/entities/Link';

export const getLinkDocRefById = async (
    linkId: string,
): Promise<DocumentReference | null> => {
    const linksCollection = dataPoint<Link>('links');
    const q = query(linksCollection, where('id', '==', linkId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        return querySnapshot.docs[0].ref;
    }
    return null;
};
