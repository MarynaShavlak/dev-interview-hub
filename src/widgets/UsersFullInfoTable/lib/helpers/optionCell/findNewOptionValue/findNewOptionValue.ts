import { ColorOption } from '@/features/Table';

export const findNewOptionValue = (
    options: (ColorOption | string)[],
    selectedValue: string | null,
) => {
    return options.find((option) => {
        return typeof option === 'string'
            ? option === selectedValue
            : option.name === selectedValue;
    });
};
