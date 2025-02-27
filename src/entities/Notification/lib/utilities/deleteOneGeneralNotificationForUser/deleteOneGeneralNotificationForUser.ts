import {
    arrayUnion,
    DocumentData,
    DocumentReference,
    updateDoc,
} from 'firebase/firestore';

export const deleteOneGeneralNotificationForUser = async (
    notificationDocRef: DocumentReference<DocumentData, DocumentData>,
    userId: string,
) => {
    await updateDoc(notificationDocRef, {
        dismissedBy: arrayUnion(userId),
    });
};
