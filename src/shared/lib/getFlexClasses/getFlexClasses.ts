import {
    mapAlignToClass,
    mapGapToClass,
    mapJustifyToClass,
} from '@/shared/const/flexClasses';
import cls from '@/shared/styles/flexStyles.module.scss';
import { FlexAlign, FlexGap, FlexJustify } from '@/shared/types/flexTypes';

export const getFlexClasses = ({
    vStack,
    hStack,
    gap,
    justify,
    align,
}: {
    vStack?: boolean;
    hStack?: boolean;
    gap?: FlexGap;
    justify?: FlexJustify;
    align?: FlexAlign;
}): string[] => {
    const classes = [];
    if (vStack) classes.push(cls.vStack);
    if (hStack) classes.push(cls.hStack);
    if (gap !== undefined) classes.push(mapGapToClass[gap]);
    if (justify !== undefined) classes.push(mapJustifyToClass[justify]);
    if (align !== undefined) classes.push(mapAlignToClass[align]);

    return classes;
};
