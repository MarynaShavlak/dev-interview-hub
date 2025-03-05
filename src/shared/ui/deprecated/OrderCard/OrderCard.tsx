import { memo } from 'react';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Card, CardTheme } from '../Card';
import { Text } from '../Text';

import cls from './OrderCard.module.scss';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { getDeprecatedTextSizeByIndex } from '@/shared/lib/text/getTextSizeByIndex/getTextSizeByIndex';

interface OrderCardProps {
    index: number;
    className?: string;
}

export const OrderCard = memo(({ index, className }: OrderCardProps) => {
    const additionalOrderClasses = getFlexClasses({
        hStack: true,
        align: 'center',
        justify: 'center',
    });

    return (
        <Card
            theme={CardTheme.OUTLINED}
            className={classNames(cls.orderWrap, {}, [
                ...additionalOrderClasses,
                className,
            ])}
        >
            <Text
                text={String(index)}
                size={getDeprecatedTextSizeByIndex(index)}
            />
        </Card>
    );
});
