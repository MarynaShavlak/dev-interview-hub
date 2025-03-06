import { HTMLAttributes, memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from './Card.module.scss';

export enum CardTheme {
    NORMAL = 'normal',
    OUTLINED = 'outlined',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
    theme?: CardTheme;
    max?: boolean;
    padding?: string;
}

/**
 * Deprecated, use new component from directory redesigned
 * @deprecated
 */
export const Card = memo((props: CardProps) => {
    const {
        className,
        children,
        theme = CardTheme.NORMAL,
        max,
        padding,
        ...otherProps
    } = props;
    const cardStyle = padding ? { padding } : {};
    return (
        <div
            className={classNames(
                cls.Card,

                {
                    [cls.max]: max,
                },
                [className, cls[theme]],
            )}
            style={cardStyle}
            {...otherProps}
        >
            {children}
        </div>
    );
});
