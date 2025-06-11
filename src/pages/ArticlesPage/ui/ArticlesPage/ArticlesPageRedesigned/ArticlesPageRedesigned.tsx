import React from 'react';

import { AddNewEntityButton } from '@/shared/ui/common/AddNewEntityButton';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articlesPageReducer } from '../../../model/slices/articlesPageSlice';

import { searchClient } from '@/shared/config/firebase/searchClient';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { ArticlesAlgoliaSearch } from '../../ArticlesAlgoliaSearch/ArticlesAlgoliaSearch';
import { ViewSelectorContainer } from '../../ViewSelectorContainer/ViewSelectorContainer';
import { VStack } from '@/shared/ui/common/Stack';
import { FiltersContainer } from '../../FiltersContainer/FiltersContainer';
import { ArticlesPageContent } from '../../ArticlesPageContent/ArticlesPageContent';
import { useArticlesPageInit } from '../../../lib/hooks/useArticlesPageInit/useArticlesPageInit';
import { ArticlePageGreeting } from '@/features/ArticlePageGreeting';

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

export const ArticlesPageRedesigned = () => {
    useArticlesPageInit();

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            {searchClient && (
                <ArticlesAlgoliaSearch>
                    <StickyContentLayout
                        left={
                            <VStack gap="24">
                                <ViewSelectorContainer />
                            </VStack>
                        }
                        right={
                            <VStack gap="24">
                                <FiltersContainer />
                                <AddNewEntityButton max entityType="article" />
                            </VStack>
                        }
                        content={<ArticlesPageContent />}
                    />
                </ArticlesAlgoliaSearch>
            )}
            <ArticlePageGreeting />
        </DynamicModuleLoader>
    );
};
