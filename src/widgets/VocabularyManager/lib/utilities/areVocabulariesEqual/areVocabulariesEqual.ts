import { Vocabulary } from '@/entities/Vocabulary';

export const areVocabulariesEqual = (
    arr1: Vocabulary[] | null,
    arr2: Vocabulary[] | null,
): boolean => {
    if (!arr1 || !arr2) return arr1 === arr2;
    if (arr1.length !== arr2.length) return false;

    return arr1.every((item, index) => {
        const other = arr2[index];
        const { id, createdAt, text, meaning, translation } = item;
        return (
            id === other.id &&
            text === other.text &&
            createdAt === other.createdAt &&
            meaning === other.meaning &&
            translation === other.translation
        );
    });
};
