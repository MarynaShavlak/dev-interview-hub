import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import {
    mapAlignToClass,
    mapDirectionToClass,
    mapJustifyToClass,
    mapGapToClass,
} from '@/shared/const/flexClasses';
import { classNames, Mods } from '@/shared/lib/classes/classNames/classNames';
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
    children: ReactNode;
    direction: FlexDirection;
    wrap?: FlexWrap;
    justify?: FlexJustify;
    align?: FlexAlign;
    gap?: FlexGap;
    className?: string;
    max?: boolean;
    fullHeight?: boolean;
}

export const Flex = (props: FlexProps) => {
    const {
        className,
        children,
        justify = 'start',
        align = 'center',
        direction,
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
