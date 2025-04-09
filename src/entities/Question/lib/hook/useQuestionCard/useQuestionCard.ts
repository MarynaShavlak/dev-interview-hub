import { useState, useCallback } from 'react';
import { Question } from '../../../model/types/question';

interface UseQuestionCardProps {
    question: Question;
    deleteQuestion: (id: string) => void;
    updateQuestion: (question: Question) => Promise<void>;
    createArticle: (question: Question) => Promise<void>;
}

export const useQuestionCard = (props: UseQuestionCardProps) => {
    const { question, deleteQuestion, updateQuestion, createArticle } = props;
    const { id, text } = question;
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = useCallback(() => {
        setIsEditing(true);
    }, []);

    const handleDeleteClick = useCallback(() => {
        deleteQuestion(id);
    }, [deleteQuestion, id]);

    const handleCancelEditing = useCallback(() => {
        setIsEditing(false);
    }, []);

    const handleSave = useCallback(
        async (updatedQuestion: Question) => {
            await updateQuestion(updatedQuestion);
            setIsEditing(false);
        },
        [updateQuestion],
    );

    const handleCreateArticle = useCallback(async () => {
        await createArticle(question);
    }, [createArticle, question]);

    return {
        isEditing,
        handleEdit,
        handleDeleteClick,
        handleCancelEditing,
        handleSave,
        handleCreateArticle,
    };
};
