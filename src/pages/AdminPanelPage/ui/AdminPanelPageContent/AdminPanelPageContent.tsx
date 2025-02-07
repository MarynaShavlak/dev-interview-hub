import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { StatisticsCharts } from '@/widgets/StatisticsCharts';

import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Tabs } from '@/shared/ui/redesigned/Tabs';
import { UsersFullInfoTable } from '@/widgets/UsersFullInfoTable';
import cls from './AdminPanelPageContent.module.scss';
import { HStack } from '@/shared/ui/common/Stack';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { classNames } from '@/shared/lib/classes/classNames/classNames';

type AdminTabType = 'charts' | 'table';

export const AdminPanelPageContent = () => {
    const { t } = useTranslation('admin');
    const [activeTab, setActiveTab] = useState<AdminTabType>('charts');
    const adminTabs = useMemo(() => {
        return [
            { value: 'charts', label: t('Інфографіка') },
            { value: 'table', label: t('Таблиця даних про користувачів') },
        ];
    }, [t]);
    const mainWrapperClasses = getFlexClasses({ vStack: true, gap: '24' });

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={
                <main
                    data-testid="AdminPanelPage"
                    className={classNames('', {}, mainWrapperClasses)}
                >
                    <HStack justify="between" max className={cls.tabsWrap}>
                        <Tabs
                            tabs={adminTabs}
                            value={activeTab}
                            onTabClick={(tab) => {
                                setActiveTab(tab.value as AdminTabType);
                            }}
                            multiselect={false}
                        />
                    </HStack>

                    {activeTab === 'charts' ? (
                        <StatisticsCharts />
                    ) : (
                        <UsersFullInfoTable />
                    )}
                </main>
            }
            off={
                <Page data-testid="AdminPanelPage">
                    <StatisticsCharts />
                </Page>
            }
        />
    );
};
