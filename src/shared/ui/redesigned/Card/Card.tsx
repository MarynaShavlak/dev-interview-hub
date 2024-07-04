import { HTMLAttributes, memo, ReactNode } from 'react';
import { alignClasses, justifyClasses } from '@/shared/const/flexClasses';
import { FlexAlign, FlexJustify } from '@/shared/types/flexTypes';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';

export type CardVariant = 'normal' | 'outlined' | 'light';
export type CardPadding = '0' | '8' | '16' | '24';
export type CardGap = '0' | '8' | '16' | '24' | '32';
export type CardBorder = 'classic' | 'round' | 'partial';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
    variant?: CardVariant;
    max?: boolean;
    fullHeight?: boolean;
    vStack?: boolean;
    hStack?: boolean;
    justify?: FlexJustify;
    align?: FlexAlign;
    padding?: CardPadding;
    gap?: CardGap;
    border?: CardBorder;
}

const mapPaddingToClass: Record<CardPadding, string> = {
    '0': 'padding_0',
    '8': 'padding_8',
    '16': 'padding_16',
    '24': 'padding_24',
};

const mapGapToClass: Record<CardGap, string> = {
    '0': 'gap_0',
    '8': 'gap_8',
    '16': 'gap_16',
    '24': 'gap_24',
    '32': 'gap_32',
};

export const Card = memo((props: CardProps) => {
    const {
        className,
        children,
        variant = 'normal',
        max,
        fullHeight,
        vStack,
        hStack,
        justify = 'start',
        align = 'center',
        padding = '8',
        gap = '0',
        border = 'classic',
        ...otherProps
    } = props;

    const paddingClass = mapPaddingToClass[padding];
    const gapClass = mapGapToClass[gap];
    return (
        <div
            className={classNames(
                cls.Card,
                {
                    [cls.max]: max,
                    [cls.vStack]: vStack,
                    [cls.hStack]: hStack,
                    [cls.fullHeight]: fullHeight,
                },
                [
                    className,
                    cls[variant],
                    cls[paddingClass],
                    cls[border],
                    cls[gapClass],
                    cls[gapClass],
                    justifyClasses[justify],
                    alignClasses[align],
                ],
            )}
            {...otherProps}
        >
            {children}
        </div>
    );
});
