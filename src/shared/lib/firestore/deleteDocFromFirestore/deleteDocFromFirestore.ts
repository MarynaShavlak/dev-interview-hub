import { deleteDoc } from 'firebase/firestore';
import { getDocRefByField } from '../getDocRefByField/getDocRefByField';

export const deleteDocFromFirestore = async (
    collectionName: string,
    documentId: string,
): Promise<void> => {
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
            return;
        }

        await deleteDoc(docRef);
        console.log(
            `Document successfully deleted from Firestore collection "${collectionName}".`,
        );
    } catch (error) {
        console.error(
            `Failed to delete document from Firestore collection "${collectionName}":`,
            error,
        );
        throw error;
    }
};
