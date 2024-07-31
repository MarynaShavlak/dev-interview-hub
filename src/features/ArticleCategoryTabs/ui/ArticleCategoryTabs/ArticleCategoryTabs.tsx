import { memo, useCallback, useMemo } from 'react';
import { useCategoryTabs } from '../../lib/hooks/useCategoryTabs';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { ArticleCategory } from '@/entities/Article';
import { Tabs } from '@/shared/ui/redesigned/Tabs';
import { TabItem, Tabs as TabsDeprecated } from '@/shared/ui/deprecated/Tabs';

interface ArticleCategoryTabsProps {
    className?: string;
    value: ArticleCategory;
    onChangeCategory: (category: ArticleCategory) => void;
}

export const ArticleCategoryTabs = memo((props: ArticleCategoryTabsProps) => {
    const { className, value, onChangeCategory } = props;
    const rawCategoryTabs = useCategoryTabs();
    const categoryTabs = useMemo(() => rawCategoryTabs, [rawCategoryTabs]);

    const onTabClick = useCallback(
        (tab: TabItem) => {
            onChangeCategory(tab.value as ArticleCategory);
        },
        [onChangeCategory],
    );

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={
                <Tabs
                    direction="column"
                    tabs={categoryTabs}
                    value={value}
                    onTabClick={onTabClick}
                    className={classNames('', {}, [className])}
                />
            }
            off={
                <TabsDeprecated
                    tabs={categoryTabs}
                    value={value}
                    onTabClick={onTabClick}
                    className={classNames('', {}, [className])}
                />
            }
        />
    );
});
