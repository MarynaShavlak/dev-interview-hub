type LabelsType = Record<string, string>;

function generateCategories(
    labels: LabelsType,
): { key: string; value: string }[] {
    return Object.keys(labels).map((key) => ({ key, value: labels[key] }));
}

export { generateCategories };
