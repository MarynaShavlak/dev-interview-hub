import { useState, useCallback } from 'react';
import { Vocabulary } from '../../../model/types/vocabulary';

interface UseVocabularyCardProps {
    vocabulary: Vocabulary;
    deleteVocabulary: (id: string) => void;
    updateVocabulary: (vocab: Vocabulary) => Promise<void>;
}

export const useVocabularyCard = (props: UseVocabularyCardProps) => {
    const { vocabulary, updateVocabulary, deleteVocabulary } = props;
    const { id } = vocabulary;
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = useCallback(() => {
        setIsEditing(true);
    }, []);

    const handleDeleteClick = useCallback(() => {
        deleteVocabulary(id);
    }, [deleteVocabulary, id]);

    const handleCancelEditing = useCallback(() => {
        setIsEditing(false);
    }, []);

    const handleSave = useCallback(
        async (updatedVocabulary: Vocabulary) => {
            await updateVocabulary(updatedVocabulary);
            setIsEditing(false);
        },
        [updateVocabulary],
    );

    return {
        isEditing,
        handleEdit,
        handleDeleteClick,
        handleCancelEditing,
        handleSave,
    };
};
