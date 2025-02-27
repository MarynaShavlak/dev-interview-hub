import { deleteDoc, DocumentData, QuerySnapshot } from 'firebase/firestore';
import { PersonalNotification } from '../../../model/types/notification';

export const deleteAllPersonalNotificationDocsForUser = async (
    querySnapshot: QuerySnapshot<PersonalNotification, DocumentData>,
) => {
    const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.allSettled(deletePromises);
};
