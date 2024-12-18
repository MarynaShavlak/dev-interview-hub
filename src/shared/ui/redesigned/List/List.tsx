import { memo } from 'react';
import { TestProps } from '@/shared/types/tests';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from './List.module.scss';

export type ListVariant = 'primary' | 'accent' | 'error';
export type ListSize = 's' | 'm' | 'l';
export type ListType = 'ordered' | 'unordered';

interface ListProps extends TestProps {
    className?: string;
    items: string[];
    variant?: ListVariant;
    size?: ListSize;
    type?: ListType;
    align?: 'left' | 'center' | 'right';
    bold?: boolean;
}

const mapSizeToClass: Record<ListSize, string> = {
    s: cls.size_s,
    m: cls.size_m,
    l: cls.size_l,
};

export const List = memo((props: ListProps) => {
    const {
        className,
        items,
        variant = 'primary',
        size = 'm',
        type = 'unordered',
        align = 'left',
        bold = false,
        'data-testid': dataTestId = 'List',
    } = props;

    const ListTag = type === 'ordered' ? 'ol' : 'ul';
    const itemClass = type === 'ordered' ? cls.ordered : cls.unordered;
    const sizeClass = mapSizeToClass[size];

    const additionalClasses = [
        className,
        cls[variant],
        cls[align],
        sizeClass,
    ].filter(Boolean);

    return (
        <ListTag
            className={classNames(
                cls.List,
                { [cls.bold]: bold },
                additionalClasses,
            )}
            data-testid={dataTestId}
        >
            {items.map((item, index) => (
                <li
                    key={index}
                    className={itemClass}
                    data-testid={`${dataTestId}.Item.${index}`}
                >
                    {item}
                </li>
            ))}
        </ListTag>
    );
});
