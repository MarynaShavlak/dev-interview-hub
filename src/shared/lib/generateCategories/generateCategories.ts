type LabelsType = Record<string, string>;

export const generateCategories = (
    labels: LabelsType,
): { key: string; value: string }[] => {
    return Object.keys(labels).map((key) => ({ key, value: labels[key] }));
};
