import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    where,
} from 'firebase/firestore';
import { firestore } from '../../json-server/firebase';

export const removeArticleFromFirestore = async (articleId: string) => {
    try {
        // Query to find the document where 'id' field matches articleId
        const articlesRef = collection(firestore, 'articles');
        const q = query(articlesRef, where('id', '==', articleId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            throw new Error(`No article found with id: ${articleId}`);
        }

        const articleDoc = querySnapshot.docs[0];
        const articleRef = doc(firestore, 'articles', articleDoc.id);

        await deleteDoc(articleRef);
        return undefined;
    } catch (error) {
        throw new Error(`Failed to delete article from Firestore: ${error}`);
    }
};
