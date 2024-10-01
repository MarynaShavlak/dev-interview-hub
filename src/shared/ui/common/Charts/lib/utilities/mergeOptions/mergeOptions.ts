export const mergeOptions = (baseOptions: any, overrides: any) => {
    const merged = { ...baseOptions };

    Object.keys(overrides).forEach((key) => {
        if (
            typeof overrides[key] === 'object' &&
            !Array.isArray(overrides[key])
        ) {
            merged[key] = { ...baseOptions[key], ...overrides[key] };
        } else {
            merged[key] = overrides[key];
        }
    });

    return merged;
};
