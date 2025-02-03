import { ColorOption } from '@/features/Table';

export const isColorOption = (
    option: ColorOption | string | undefined,
): option is ColorOption => {
    return typeof option !== 'string';
};
