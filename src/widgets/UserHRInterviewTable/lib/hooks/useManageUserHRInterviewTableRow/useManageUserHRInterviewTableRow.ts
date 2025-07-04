import { useCallback, useEffect, useState } from 'react';

import {
    useToggleVisibility,
    UseToggleVisibilityReturnType,
} from '@/shared/lib/hooks/useToggleVisibility/useToggleVisibility';
import { useHRInterviewQAsByUserData } from '../useHRInterviewQAsByUserData/useHRInterviewQAsByUserData';
import { areArticlesEqual } from '../../utilities/areArticlesEqual/areArticlesEqual';
import {
    HRInterviewQA,
    useEditHRInterviewQANavigation,
} from '@/entities/HRInterviewQA';
import { useArticleNavigation } from '@/entities/Article';

interface SelectedArticle {
    id: string;
    title: string;
}

interface UseManageUserHRInterviewTableRowReturnType {
    handleDeleteClick: (articleId: string) => void;

    handleEditClick: (articleIdId: string) => void;
    confirmDelete: () => Promise<void>;
    selectedArticle: SelectedArticle | null;
    isLoading: boolean;
    data: HRInterviewQA[] | null;
    deleteArticleModal: UseToggleVisibilityReturnType;
    articleTitle: string;
}

export const useManageUserHRInterviewTableRow = (
    onDeleteArticle: (articleId: string) => Promise<string | null>,
): UseManageUserHRInterviewTableRowReturnType => {
    const { data: interviewData, isLoading } = useHRInterviewQAsByUserData();
    const [data, setData] = useState<HRInterviewQA[] | null>(null);

    useEffect(() => {
        if (!isLoading && !areArticlesEqual(interviewData, data)) {
            setData(interviewData);
        }
    }, [interviewData, isLoading, data]);

    const deleteArticleModal = useToggleVisibility();
    const { navigateToEditHRInterviewQA } = useEditHRInterviewQANavigation();
    const { navigateToArticle } = useArticleNavigation();
    const [selectedArticle, setSelectedArticle] =
        useState<SelectedArticle | null>(null);

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
                    title: article?.title || '',
                });
            }

            deleteArticleModal.show();
        },
        [data, deleteArticleModal],
    );

    const handleEditClick = useCallback(
        (articleId: string) => {
            if (articleId) {
                navigateToEditHRInterviewQA(articleId);
            }
        },
        [navigateToEditHRInterviewQA],
    );

    const articleTitle = selectedArticle?.title
        ? `"${selectedArticle.title}"`
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
