import { Article } from '../../..';
import { getDocRefByField } from '@/shared/lib/firestore/getDocRefByField/getDocRefByField';
import { fetchDocumentByRef } from '@/shared/lib/firestore/fetchDocumentByRef/fetchDocumentByRef';

export const fetchArticle = async (articleId: string) => {
    const articleDocRef = await getDocRefByField<Article>(
        'articles',
        'id',
        articleId,
    );

    const article = await fetchDocumentByRef<Article>(articleDocRef);
    return article;
};
