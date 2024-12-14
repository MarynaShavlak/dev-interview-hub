export const getRandomItems = <T>(array: T[], count: number): T[] => {
    if (count > array.length) {
        throw new Error('Count exceeds array size.');
    }

    const result: T[] = [];
    const usedIndices = new Set<number>();

    while (result.length < count) {
        const randomIndex = Math.floor(Math.random() * array.length);
        if (!usedIndices.has(randomIndex)) {
            result.push(array[randomIndex]);
            usedIndices.add(randomIndex);
        }
    }

    return result;
};
