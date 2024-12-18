import { memo } from 'react';
import DOMPurify from 'dompurify';
import { TestProps } from '@/shared/types/tests';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from './List.module.scss';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';

export type ListVariant = 'primary' | 'accent' | 'error';
export type ListSize = 's' | 'm' | 'l';
export type ListType = 'ordered' | 'unordered';

interface ListProps extends TestProps {
    className?: string;
    items: (string | string[])[];

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
    const mainClasses = [className, cls[variant], cls[align], sizeClass].filter(
        Boolean,
    );

    const additionalClasses = getFlexClasses({
        vStack: true,
        gap: '8',
    });

    //     return (
    //         <ListTag
    //             className={classNames(cls.List, { [cls.bold]: bold }, [
    //                 ...mainClasses,
    //                 ...additionalClasses,
    //             ])}
    //             data-testid={dataTestId}
    //         >
    //             {items.map((item, index) => {
    //                 const sanitizedItem = DOMPurify.sanitize(item);
    //                 return (
    //                     <li
    //                         key={index}
    //                         className={itemClass}
    //                         data-testid={`${dataTestId}.Item.${index}`}
    //                         dangerouslySetInnerHTML={{ __html: sanitizedItem }}
    //                     />
    //                 );
    //             })}
    //         </ListTag>
    //     );
    // });
    const renderListItems = (listItems: (string | string[])[]) => {
        return listItems.map((item, index) => {
            if (Array.isArray(item)) {
                // Render a nested list if item is an array
                return (
                    <li
                        key={index}
                        className={itemClass}
                        data-testid={`${dataTestId}.NestedItem.${index}`}
                    >
                        <ListTag>
                            {renderListItems(item)} {/* Recursive rendering */}
                        </ListTag>
                    </li>
                );
            }
            // Sanitize and render a simple list item
            const sanitizedItem = DOMPurify.sanitize(item);
            return (
                <li
                    key={index}
                    className={itemClass}
                    data-testid={`${dataTestId}.Item.${index}`}
                    dangerouslySetInnerHTML={{ __html: sanitizedItem }}
                />
            );
        });
    };

    return (
        <ListTag
            className={classNames(cls.List, { [cls.bold]: bold }, [
                ...mainClasses,
                ...additionalClasses,
            ])}
            data-testid={dataTestId}
        >
            {renderListItems(items)}
        </ListTag>
    );
});
