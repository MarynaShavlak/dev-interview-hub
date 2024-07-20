import {
    FlexAlign,
    FlexDirection,
    FlexGap,
    FlexJustify,
} from '@/shared/types/flexTypes';
import cls from '@/shared/styles/flexStyles.module.scss';

export const mapJustifyToClass: Record<FlexJustify, string> = {
    start: cls.justifyStart,
    center: cls.justifyCenter,
    end: cls.justifyEnd,
    between: cls.justifyBetween,
};
export const mapAlignToClass: Record<FlexAlign, string> = {
    start: cls.alignStart,
    center: cls.alignCenter,
    end: cls.alignEnd,
};
export const mapDirectionToClass: Record<FlexDirection, string> = {
    row: cls.directionRow,
    column: cls.directionColumn,
};

export const mapGapToClass: Record<FlexGap, string> = {
    0: cls.gap0,
    4: cls.gap4,
    8: cls.gap8,
    16: cls.gap16,
    24: cls.gap24,
    32: cls.gap32,
};
