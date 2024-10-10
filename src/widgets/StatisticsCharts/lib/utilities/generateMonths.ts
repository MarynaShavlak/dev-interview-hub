export const generateMonths = (): string[] => {
    return Array.from({ length: 12 }, (_, i) =>
        (i + 1).toString().padStart(2, '0'),
    );
};
