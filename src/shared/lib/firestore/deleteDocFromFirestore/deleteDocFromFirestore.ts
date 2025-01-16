import { deleteDoc } from 'firebase/firestore';
import { getDocRefByField } from '../getDocRefByField/getDocRefByField';

export const deleteDocFromFirestore = async <T extends { id: string }>(
    collectionName: string,
    docData: T,
): Promise<void> => {
    try {
        const docRef = await getDocRefByField<T>(
            collectionName,
            'id',
            docData.id,
        );
        // const documentRef = doc(dataPoint(collectionName), docId);
        if (!docRef) {
            console.error(
                `Document with id "${docData.id}" not found in collection "${collectionName}".`,
            );
            return;
        }
        await deleteDoc(docRef);
        console.log(
            `Document successfully deleted from Firestore collection "${collectionName}".`,
        );
    } catch (error) {
        console.error(
            `Failed to delete document  from Firestore collection "${collectionName}":`,
            error,
        );
        throw error;
    }
};
