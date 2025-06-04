import { memo } from 'react';
import DOMPurify from 'dompurify';
import { TestProps } from '@/shared/types/tests';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from './List.module.scss';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { toggleFeatures } from '@/shared/lib/features';

export type ListVariant = 'primary' | 'accent';
export type ListType = 'ordered' | 'unordered';

export interface ListProps extends TestProps {
    className?: string;
    items: string[];
    variant?: ListVariant;
    type?: ListType;
    align?: 'left' | 'center' | 'right';
    bold?: boolean;
}

export const List = memo((props: ListProps) => {
    const {
        className,
        items,
        variant = 'primary',

        type = 'unordered',
        align = 'left',
        bold = false,
        'data-testid': dataTestId = 'List',
    } = props;

    const orderedClass = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => cls.orderedRedesigned,
        off: () => cls.orderedDeprecated,
    });

    const unorderedClass = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => cls.unorderedRedesigned,
        off: () => cls.unorderedDeprecated,
    });

    const ListTag = type === 'ordered' ? 'ol' : 'ul';
    const itemClass = type === 'ordered' ? orderedClass : unorderedClass;

    const mainClasses = [className, cls[variant], cls[align]].filter(Boolean);

    const additionalClasses = getFlexClasses({
        vStack: true,
        gap: '8',
    });

    return (
        <ListTag
            className={classNames(cls.List, { [cls.bold]: bold }, [
                ...mainClasses,
                ...additionalClasses,
            ])}
            data-testid={dataTestId}
        >
            {items.map((item, index) => {
                const sanitizedItem = DOMPurify.sanitize(item);
                return (
                    <li
                        key={index}
                        className={itemClass}
                        data-testid={`${dataTestId}.Item.${index}`}
                        dangerouslySetInnerHTML={{ __html: sanitizedItem }}
                    />
                );
            })}
        </ListTag>
    );
});
