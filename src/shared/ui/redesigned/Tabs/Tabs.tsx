import { memo, ReactNode, useCallback } from 'react';
import { FlexDirection } from '@/shared/types/flexTypes';
import { Each } from '@/shared/lib/components/Each/Each';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '../Card/Card';
import cls from './Tabs.module.scss';
import { Flex } from '../Stack/Flex/Flex';

export interface TabItem {
    value: string;
    content: ReactNode;
}

interface TabsProps {
    className?: string;
    tabs: TabItem[];
    value: string;
    onTabClick: (tab: TabItem) => void;
    direction?: FlexDirection;
}

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
                    const isSelected = tab.value === value;
                    return (
                        <Card
                            variant={isSelected ? 'light' : 'normal'}
                            className={classNames(cls.tab, {})}
                            key={tab.value}
                            onClick={clickHandle(tab)}
                            border="round"
                        >
                            {tab.content}
                        </Card>
                    );
                }}
            />
        </Flex>
    );
});
