import { EntityState } from '@reduxjs/toolkit';
import { getDocs } from 'firebase/firestore';
import { dataPoint } from '@/shared/lib/firestore/firestore';

import { articlesAdapter } from '../../model/slices/articleSlice';
import { BuilderType } from '../../model/types/apiTypes';
import { Article } from '../..';

export const getArticlesEndpoint = (build: BuilderType) => ({
    getArticles: build.query<EntityState<Article>, void>({
        providesTags: ['Articles'],
        async queryFn() {
            try {
                const collectionRef = dataPoint<Article>('articles');
                const snapshot = await getDocs(collectionRef);

                const articles = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                })) as Article[];

                return {
                    data: articlesAdapter.setAll(
                        articlesAdapter.getInitialState(),
                        articles,
                    ),
                };
            } catch (error) {
                return { error: error as unknown };
            }
        },
    }),
});
