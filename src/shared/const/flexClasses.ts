import {
    FlexAlign,
    FlexDirection,
    FlexJustify,
} from '@/shared/types/flexTypes';
import cls from '@/shared/ui/redesigned/Stack/Flex/Flex.module.scss';

export const justifyClasses: Record<FlexJustify, string> = {
    start: cls.justifyStart,
    center: cls.justifyCenter,
    end: cls.justifyEnd,
    between: cls.justifyBetween,
};
export const alignClasses: Record<FlexAlign, string> = {
    start: cls.alignStart,
    center: cls.alignCenter,
    end: cls.alignEnd,
};
export const directionClasses: Record<FlexDirection, string> = {
    row: cls.directionRow,
    column: cls.directionColumn,
};
