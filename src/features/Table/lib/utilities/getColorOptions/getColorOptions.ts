import { ColorOption } from '../../../model/types/tableTypes';

export const getColorOptions = (
    options?: string | (string | ColorOption)[],
): ColorOption[] | null => {
    if (!options) return null;
    return Array.isArray(options)
        ? options?.filter(
              (option): option is ColorOption => typeof option !== 'string',
          )
        : null;
};
