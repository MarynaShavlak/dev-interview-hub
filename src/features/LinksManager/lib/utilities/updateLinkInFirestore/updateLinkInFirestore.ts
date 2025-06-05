import { getDoc, updateDoc } from 'firebase/firestore';

import { ERROR_LINK_MESSAGES } from '../../../model/consts/errorLinkMessages';
import { getLinkDocRefById } from '../getLinkDocRefById/getLinkDocRefById';
import { assertExists } from '@/shared/lib/checks/assertExists/assertExists';
import { Link } from '@/entities/Link';

export const updateLinkInFirestore = async (
    linkId: string,
    updates: Partial<Link>,
) => {
    const linkDocRef = await getLinkDocRefById(linkId);
    assertExists(linkDocRef, ERROR_LINK_MESSAGES.LINK_NOT_FOUND(linkId));

    await updateDoc(linkDocRef, updates);
    const updatedDoc = await getDoc(linkDocRef);
    const updatedData = updatedDoc.data();
    assertExists(
        updatedData,
        ERROR_LINK_MESSAGES.UPDATED_DATA_RETRIEVAL_ERROR(linkId),
    );

    return updatedData as Link;
};
