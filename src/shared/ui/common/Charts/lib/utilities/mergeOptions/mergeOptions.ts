import ApexCharts from 'apexcharts';

const deepMerge = <T extends object>(base: T, override: T): T => {
    const result: Partial<T> = { ...base };

    Object.keys(override).forEach((key) => {
        const typedKey = key as keyof T;

        const baseValue = base[typedKey];
        const overrideValue = override[typedKey];

        if (
            typeof overrideValue === 'object' &&
            overrideValue !== null &&
            !Array.isArray(overrideValue)
        ) {
            if (typeof baseValue === 'object' && baseValue !== null) {
                result[typedKey] = deepMerge(baseValue, overrideValue);
            } else {
                result[typedKey] = overrideValue;
            }
        } else {
            // For non-object values, simply override
            result[typedKey] = overrideValue;
        }
    });

    return result as T;
};

export const mergeOptions = (
    baseOptions: ApexCharts.ApexOptions,
    overrides: ApexCharts.ApexOptions,
): ApexCharts.ApexOptions => {
    const merged: ApexCharts.ApexOptions = { ...baseOptions };

    Object.keys(overrides).forEach((key) => {
        const typedKey = key as keyof ApexCharts.ApexOptions;

        const baseValue = baseOptions[typedKey];
        const overrideValue = overrides[typedKey];

        if (
            typeof overrideValue === 'object' &&
            overrideValue !== null &&
            !Array.isArray(overrideValue)
        ) {
            if (typeof baseValue === 'object' && baseValue !== null) {
                // @ts-ignore
                merged[typedKey] = deepMerge(baseValue, overrideValue);
            } else {
                // @ts-ignore
                merged[typedKey] = overrideValue;
            }
        } else {
            merged[typedKey] = overrideValue;
        }
    });

    return merged;
};
