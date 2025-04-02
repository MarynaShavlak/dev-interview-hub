import React, { memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { MyArticlesTabsNavigationRedesigned } from './MyArticlesTabsNavigationRedesigned/MyArticlesTabsNavigationRedesigned';
import { MyArticlesTabsNavigationDeprecated } from './MyArticlesTabsNavigationDeprecated/MyArticlesTabsNavigationDeprecated';
import { MyArticlesTabType } from '../../model/types/myArticlesTabTypes';

export interface MyArticlesTabsNavigationProps {
    activeTab: MyArticlesTabType;
    onTabChange: (tab: MyArticlesTabType) => void;
}

export const MyArticlesTabsNavigation = memo(
    (props: MyArticlesTabsNavigationProps) => {
        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<MyArticlesTabsNavigationRedesigned {...props} />}
                off={<MyArticlesTabsNavigationDeprecated {...props} />}
            />
        );
    },
);
