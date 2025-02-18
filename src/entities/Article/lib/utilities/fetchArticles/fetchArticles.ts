import { DocumentData, getDocs, Query } from 'firebase/firestore';
import { Article } from '../../..';

export const fetchArticles = async (
    filteredQuery: Query<Article, DocumentData>,
) => {
    const snapshot = await getDocs(filteredQuery);
    return snapshot.docs.map((doc) => ({
        ...doc.data(),
        // id: doc.id,
    })) as Article[];
};
