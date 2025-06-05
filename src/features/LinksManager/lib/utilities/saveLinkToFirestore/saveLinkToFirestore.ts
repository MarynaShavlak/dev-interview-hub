import { getDoc } from 'firebase/firestore';

import { addDocToFirestore } from '@/shared/lib/firestore/addDocToFirestore/addDocToFirestore';
import { handleRequestErrorMessage } from '@/shared/lib/firestore/handleRequestErrorMessage/handleRequestErrorMessage';

import { ERROR_LINK_MESSAGES } from '../../../model/consts/errorLinkMessages';
import { Link } from '@/entities/Link';

export type NewLinkDraft = Omit<Link, 'createdAt'>;

export const saveLinkToFirestore = async (newLink: NewLinkDraft) => {
    const linkWithTimestamp = {
        ...newLink,
        createdAt: new Date().toISOString(),
    };
    const docRef = await addDocToFirestore<Link>('links', linkWithTimestamp);

    const createdDocSnapshot = await getDoc(docRef);
    if (!createdDocSnapshot.exists()) {
        handleRequestErrorMessage(ERROR_LINK_MESSAGES.LINK_RETRIEVAL_FAIL);
    }

    return createdDocSnapshot.data() as Link;
};
