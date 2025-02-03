export const extractOptionValueName = (value: any): string => {
    if (typeof value === 'string') {
        return value;
    }
    if (value && typeof value === 'object') {
        return value.name || '';
    }
    return '';
};
