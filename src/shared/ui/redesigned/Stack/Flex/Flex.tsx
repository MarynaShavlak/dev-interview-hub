import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import {
    mapAlignToClass,
    mapDirectionToClass,
    mapJustifyToClass,
    mapGapToClass,
} from '@/shared/const/flexClasses';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import {
    FlexAlign,
    FlexDirection,
    FlexJustify,
    FlexGap,
    FlexWrap,
} from '@/shared/types/flexTypes';
import cls from './Flex.module.scss';

type DivProps = DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
>;

export interface FlexProps extends DivProps {
    className?: string;
    children: ReactNode;
    justify?: FlexJustify;
    align?: FlexAlign;
    direction: FlexDirection;
    wrap?: FlexWrap;
    gap?: FlexGap;
    max?: boolean;
    fullHeight?: boolean;
}

export const Flex = (props: FlexProps) => {
    const {
        className,
        children,
        justify = 'start',
        align = 'center',
        direction = 'row',
        gap,
        wrap = 'nowrap',
        max,
        fullHeight,
    } = props;

    const additionalClasses = [
        className,
        mapJustifyToClass[justify],
        mapAlignToClass[align],
        mapDirectionToClass[direction],
        cls[wrap],
        gap && mapGapToClass[gap],
    ];

    const mods: Mods = {
        [cls.max]: max,
        [cls.fullHeight]: fullHeight,
    };

    return (
        <div className={classNames(cls.Flex, mods, additionalClasses)}>
            {children}
        </div>
    );
};
