import { useCallback, useEffect, useState } from 'react';

import {
    useToggleVisibility,
    UseToggleVisibilityReturnType,
} from '@/shared/lib/hooks/useToggleVisibility/useToggleVisibility';
import { useVocabulariesByUserData } from '../useVocabulariesByUserData/useVocabulariesByUserData';
import { areVocabulariesEqual } from '../../utilities/areVocabulariesEqual/areVocabulariesEqual';
import { Vocabulary } from '@/entities/Vocabulary';

interface SelectedVocabulary {
    id: string;
    text: string;
}

interface UseManageUserHRInterviewTableRowReturnType {
    handleDeleteClick: (articleId: string) => void;
    handleEditClick: (articleIdId: string) => void;
    confirmDelete: () => Promise<void>;
    selectedArticle: SelectedVocabulary | null;
    isLoading: boolean;
    data: Vocabulary[] | null;
    deleteArticleModal: UseToggleVisibilityReturnType;
    articleTitle: string;
}

export const useManageUserVocabularyTableRow = (
    onDeleteArticle: (articleId: string) => Promise<string | null>,
): UseManageUserHRInterviewTableRowReturnType => {
    const { data: interviewData, isLoading } = useVocabulariesByUserData();
    const [data, setData] = useState<Vocabulary[] | null>(null);

    useEffect(() => {
        if (!isLoading && !areVocabulariesEqual(interviewData, data)) {
            setData(interviewData);
        }
    }, [interviewData, isLoading, data]);

    const deleteArticleModal = useToggleVisibility();
    // const { navigateToEditVocabulary } = useEditVocabularyNavigation();
    // const { navigateToArticle } = useArticleNavigation();
    const [selectedArticle, setSelectedArticle] =
        useState<SelectedVocabulary | null>(null);

    const deleteTableRow = useCallback(
        async (articleId: string) => {
            if (!articleId) {
                return null;
            }

            try {
                const deletedArticleId = await onDeleteArticle(articleId);

                return deletedArticleId;
            } catch (error: any) {
                return null;
            }
        },
        [onDeleteArticle],
    );

    const confirmDelete = useCallback(async () => {
        if (selectedArticle) {
            await deleteTableRow(selectedArticle.id);
            deleteArticleModal.hide();
            setSelectedArticle(null);
        }
    }, [selectedArticle, deleteTableRow, deleteArticleModal]);

    const handleDeleteClick = useCallback(
        (articleId: string) => {
            const article = data?.find((item) => item.id === articleId);
            if (article) {
                setSelectedArticle({
                    id: articleId,
                    text: article?.text || '',
                });
            }

            deleteArticleModal.show();
        },
        [data, deleteArticleModal],
    );

    const handleEditClick = useCallback((articleId: string) => {
        console.log('articleId', articleId);
        // if (articleId) {
        //     navigateToEditVocabulary(articleId);
        // }
    }, []);

    const articleTitle = selectedArticle?.text
        ? `"${selectedArticle.text}"`
        : '';

    return {
        handleDeleteClick,
        handleEditClick,

        confirmDelete,
        selectedArticle,
        isLoading,
        data,
        deleteArticleModal,
        articleTitle,
    };
};
