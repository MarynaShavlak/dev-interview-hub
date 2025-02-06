import { ColorOption } from '../../../model/types/tableTypes';

export const getStringOptions = (
    options?: string | (string | ColorOption)[],
): string[] | null => {
    if (!options) return null;
    return Array.isArray(options)
        ? options?.filter(
              (option): option is string => typeof option === 'string',
          )
        : null;
};
