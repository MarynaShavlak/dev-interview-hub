import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    where,
} from 'firebase/firestore';
import { firestore } from '../../json-server/firebase';

export const removeCommentFromFirestore = async (commentText: string) => {
    try {
        const commentsRef = collection(firestore, 'comments');
        const q = query(commentsRef, where('text', '==', commentText));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            throw new Error(`No comment found with text: ${commentText}`);
        }

        const commentDoc = querySnapshot.docs[0];
        const commentRef = doc(firestore, 'comments', commentDoc.id);

        await deleteDoc(commentRef);
        return undefined;
    } catch (error) {
        throw new Error(`Failed to delete comment from Firestore: ${error}`);
    }
};
