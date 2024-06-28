import { useTranslation } from 'react-i18next';
import { memo, useCallback, useMemo } from 'react';
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
    const { t } = useTranslation('articles');

    const typeTabs = useMemo<TabItem[]>(
        () => [
            {
                value: ArticleCategory.ALL,
                content: t('Вcі статті'),
            },
            {
                value: ArticleCategory.IT,
                content: t('IT'),
            },
            {
                value: ArticleCategory.ECONOMICS,
                content: t('Економіка'),
            },
            {
                value: ArticleCategory.SOCIOLOGY,
                content: t('Соціологія'),
            },
            {
                value: ArticleCategory.PUBLIC_ADMINISTRATION,
                content: t('Публічне адміністрування'),
            },
        ],
        [t],
    );

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
                    tabs={typeTabs}
                    value={value}
                    onTabClick={onTabClick}
                    className={classNames('', {}, [className])}
                />
            }
            off={
                <TabsDeprecated
                    tabs={typeTabs}
                    value={value}
                    onTabClick={onTabClick}
                    className={classNames('', {}, [className])}
                />
            }
        />
    );
});
