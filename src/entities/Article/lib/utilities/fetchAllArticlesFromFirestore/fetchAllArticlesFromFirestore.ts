import { getDocs } from 'firebase/firestore';
import { dataPoint } from '@/shared/lib/firestore/firestore';
import { Article } from '../../..';
import { articlesAdapter } from '../../../model/slices/articleSlice';

export const fetchAllArticlesFromFirestore = async () => {
    const collectionRef = dataPoint<Article>('articles');
    const snapshot = await getDocs(collectionRef);

    const articles = snapshot.docs.map((doc) => ({
        ...doc.data(),
        // id: doc.id,
    })) as Article[];

    return articlesAdapter.setAll(articlesAdapter.getInitialState(), articles);
};
