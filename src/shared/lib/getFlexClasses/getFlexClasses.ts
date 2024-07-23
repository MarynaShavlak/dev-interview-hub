import {
    mapAlignToClass,
    mapGapToClass,
    mapJustifyToClass,
} from '@/shared/const/flexClasses';
import cls from '@/shared/styles/flexStyles.module.scss';
import { FlexAlign, FlexGap, FlexJustify } from '@/shared/types/flexTypes';
/**
 * The `getFlexClasses` function generates an array of CSS class names based on the provided flexbox configuration options.
 * It is useful for dynamically applying CSS classes to flex container elements based on alignment, justification, and spacing requirements.
 *
 * @param vStack - Optional. A boolean indicating if vertical stacking should be applied. If `true`, the `vStack` class is included in the result.
 * @param hStack - Optional. A boolean indicating if horizontal stacking should be applied. If `true`, the `hStack` class is included in the result.
 * @param gap - Optional. A value of type `FlexGap` representing the spacing between flex items. If provided, the corresponding class from `mapGapToClass` is included.
 * @param justify - Optional. A value of type `FlexJustify` representing the alignment of flex items along the main axis. If provided, the corresponding class from `mapJustifyToClass` is included.
 * @param align - Optional. A value of type `FlexAlign` representing the alignment of flex items along the cross axis. If provided, the corresponding class from `mapAlignToClass` is included.
 *
 * @returns An array of CSS class names based on the provided options. The array includes classes for vertical or horizontal stacking, gap, justification, and alignment as applicable.
 *
 * */
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
