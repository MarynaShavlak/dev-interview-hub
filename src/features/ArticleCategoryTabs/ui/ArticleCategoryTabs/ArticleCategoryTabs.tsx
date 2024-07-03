import { memo, useCallback } from 'react';
import { useCategoryTabs } from '../../lib/hooks/useCategoryTabs';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { ArticleCategory } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { TabItem, Tabs as TabsDeprecated } from '@/shared/ui/deprecated/Tabs';
import { Tabs } from '@/shared/ui/redesigned/Tabs';

interface ArticleCategoryTabsProps {
    className?: string;
    value: ArticleCategory;
    onChangeCategory: (type: ArticleCategory) => void;
}

export const ArticleCategoryTabs = memo((props: ArticleCategoryTabsProps) => {
    const { className, value, onChangeCategory } = props;
    const categoryTabs = useCategoryTabs();

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
