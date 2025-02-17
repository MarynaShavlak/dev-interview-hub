import React, { memo } from 'react';
import { ViewSelectorContainer } from '../../ViewSelectorContainer/ViewSelectorContainer';
import cls from '../ArticleInfiniteList.module.scss';
import { FiltersContainer } from '../../FiltersContainer/FiltersContainer';

export const ArticlesInfiniteListHeader = memo(() => {
    return (
        <div className={cls.controlsWrap}>
            <FiltersContainer />
            <ViewSelectorContainer className={cls.viewSelector} />
        </div>
    );
});
