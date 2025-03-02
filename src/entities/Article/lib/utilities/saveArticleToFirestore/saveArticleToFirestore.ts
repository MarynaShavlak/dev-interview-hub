import { getDoc } from 'firebase/firestore';
import { Article } from '../../..';
import { addDocToFirestore } from '@/shared/lib/firestore/addDocToFirestore/addDocToFirestore';
import { handleRequestErrorMessage } from '@/shared/lib/firestore/handleRequestErrorMessage/handleRequestErrorMessage';
import { ERROR_ARTICLE_MESSAGES } from '../../../model/consts/errorArticleMessages';

export type NewArticleDraft = Omit<Article, 'createdAt'>;

export const saveArticleToFirestore = async (newArticle: NewArticleDraft) => {
    const articleWithTimestamp = {
        ...newArticle,
        createdAt: new Date().toISOString(),
    };
    const docRef = await addDocToFirestore<Article>(
        'articles',
        articleWithTimestamp,
    );

    const createdDocSnapshot = await getDoc(docRef);
    if (!createdDocSnapshot.exists()) {
        handleRequestErrorMessage(
            ERROR_ARTICLE_MESSAGES.ARTICLE_RETRIEVAL_FAIL,
        );
    }

    return createdDocSnapshot.data() as Article;
};
