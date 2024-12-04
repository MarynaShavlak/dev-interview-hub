import { memo, useCallback } from 'react';
import { FlexDirection } from '@/shared/types/flexTypes';
import { Flex } from '../../common/Stack/Flex/Flex';
import { Each } from '@/shared/lib/components/Each/Each';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Card, CardTheme } from '../Card/Card';
import cls from './Tabs.module.scss';

export interface TabItem {
    value: string;
    label: string;
}

interface TabsProps {
    className?: string;
    tabs: TabItem[];
    value: string;
    onTabClick: (tab: TabItem) => void;
    direction?: FlexDirection;
}
/**
 * Deprecated, use new component from directory redesigned
 * @deprecated
 */

export const Tabs = memo((props: TabsProps) => {
    const { className, tabs, onTabClick, value, direction = 'row' } = props;

    const clickHandle = useCallback(
        (tab: TabItem) => () => {
            onTabClick(tab);
        },
        [onTabClick],
    );

    return (
        <Flex
            direction={direction}
            gap="8"
            align="start"
            className={classNames(cls.Tabs, {}, [className])}
        >
            <Each
                of={tabs}
                render={(tab) => {
                    return (
                        <Card
                            theme={
                                tab.value === value
                                    ? CardTheme.NORMAL
                                    : CardTheme.OUTLINED
                            }
                            className={cls.tab}
                            key={tab.value}
                            onClick={clickHandle(tab)}
                        >
                            {tab.label}
                        </Card>
                    );
                }}
            />
        </Flex>
    );
});
