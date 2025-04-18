import { memo, useCallback } from 'react';
import { Each } from '@/shared/lib/components/Each/Each';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Card } from '../Card/Card';
import cls from './Tabs.module.scss';
import { Flex } from '../../common/Stack/Flex/Flex';
import { FlexDirection } from '@/shared/types/flexTypes';

export interface TabItem {
    value: string;
    label: string;
}

interface TabsProps {
    className?: string;
    tabs: TabItem[];
    value: string | string[];
    onTabClick: (tab: TabItem) => void;
    direction?: FlexDirection;
    multiselect?: boolean;
}

export const Tabs = memo((props: TabsProps) => {
    const {
        className,
        tabs,
        onTabClick,
        value,
        direction = 'row',
        multiselect = false,
    } = props;

    const handleMultiSelect = useCallback(
        (tab: TabItem) => {
            console.log('tab', tab);
            let newValue = [];
            if (Array.isArray(value)) {
                if (value.includes(tab.value)) {
                    newValue = value.filter((v) => v !== tab.value);
                } else {
                    newValue = [...value, tab.value];
                }
            } else {
                newValue = [tab.value];
            }
            console.log('newValue', newValue);
            return newValue.join(',');
        },
        [value],
    );

    const handleSingleSelect = useCallback(
        (tab: TabItem) => {
            return tab.value === value ? '' : tab.value;
        },
        [value],
    );

    const clickHandle = useCallback(
        (tab: TabItem) => () => {
            const newValue = multiselect
                ? handleMultiSelect(tab)
                : handleSingleSelect(tab);
            onTabClick({
                value: newValue,
                label: tab.label,
            });
        },
        [multiselect, handleMultiSelect, handleSingleSelect, onTabClick],
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
                    const isSelected = Array.isArray(value)
                        ? value.includes(tab.value)
                        : tab.value === value;

                    return (
                        <Card
                            variant={isSelected ? 'light' : 'normal'}
                            className={classNames(cls.tab, {})}
                            key={tab.value as string}
                            onClick={clickHandle(tab)}
                            border="round"
                        >
                            {tab.label}
                        </Card>
                    );
                }}
            />
        </Flex>
    );
});
