import { deleteDoc } from 'firebase/firestore';
import { getDocRefByField } from '../getDocRefByField/getDocRefByField';
import { FirestoreCollectionType } from '@/shared/types/firestoreCollections';

export const deleteDocFromFirestore = async (
    collectionName: FirestoreCollectionType,
    documentId: string,
): Promise<string> => {
    try {
        const docRef = await getDocRefByField<{ id: string }>(
            collectionName,
            'id',
            documentId,
        );

        if (!docRef) {
            console.error(
                `Document with id "${documentId}" not found in collection "${collectionName}".`,
            );
            return '';
        }

        await deleteDoc(docRef);
        console.log(
            `Document successfully deleted from Firestore collection "${collectionName}".`,
        );
        return documentId;
    } catch (error) {
        console.error(
            `Failed to delete document from Firestore collection "${collectionName}":`,
            error,
        );
        throw error;
    }
};
