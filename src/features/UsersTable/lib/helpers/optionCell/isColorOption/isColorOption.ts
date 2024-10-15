import { ColorOption } from '../../../../model/types/types';

export const isColorOption = (
    option: ColorOption | string | undefined,
): option is ColorOption => {
    return typeof option !== 'string';
};
