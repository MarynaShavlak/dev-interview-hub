import React from 'react';
import { Page } from '@/widgets/Page';
import { ArticleListSkeleton, ArticleView } from '@/entities/Article';

import cls from '../ArticleInfiniteList.module.scss';
import { FiltersContainer } from '../../FiltersContainer/FiltersContainer';
import { ViewSelectorContainer } from '../../ViewSelectorContainer/ViewSelectorContainer';

export const LoadingView = () => (
    <Page>
        <div className={cls.controlsSkeletonWrap}>
            <FiltersContainer />
            <ViewSelectorContainer className={cls.viewSelector} />
        </div>
        <ArticleListSkeleton view={ArticleView.GRID} />
    </Page>
);
