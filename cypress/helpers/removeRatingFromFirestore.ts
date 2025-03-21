import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    where,
} from 'firebase/firestore';
import { firestore } from '../../json-server/firebase';

export const removeRatingFromFirestore = async (feedback: string) => {
    try {
        const ratingsRef = collection(firestore, 'ratings');
        const q = query(ratingsRef, where('feedback', '==', feedback));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            throw new Error(`No rating found with feedback: ${feedback}`);
        }

        const ratingDoc = querySnapshot.docs[0];
        const ratingRef = doc(firestore, 'ratings', ratingDoc.id);

        await deleteDoc(ratingRef);
        return undefined;
    } catch (error) {
        throw new Error(`Failed to delete rating from Firestore: ${error}`);
    }
};
