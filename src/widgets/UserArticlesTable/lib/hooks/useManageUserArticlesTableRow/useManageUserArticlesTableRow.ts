import { useCallback, useEffect, useState } from 'react';
import { useEditArticleNavigation } from '@/entities/Article';
import { UserArticlesTableInfo } from '../../../model/types/userArticlesTableInfo';
import {
    useToggleVisibility,
    UseToggleVisibilityReturnType,
} from '@/shared/lib/hooks/useToggleVisibility/useToggleVisibility';
import { useArticlesByUserData } from '../useArticlesByUserData/useArticlesByUserData';

interface SelectedArticle {
    id: string;
    title: string;
}

interface UseManageUserArticlesTableRowReturnType {
    handleDeleteClick: (userId: string) => void;
    handleEditClick: (userId: string) => void;
    confirmDelete: () => Promise<void>;
    selectedArticle: SelectedArticle | null;
    isLoading: boolean;
    data: UserArticlesTableInfo[] | null;
    deleteArticleModal: UseToggleVisibilityReturnType;
    articleTitle: string;
}

export const useManageUserArticlesTableRow = (
    onDeleteArticle: (articleId: string) => Promise<string | null>,
): UseManageUserArticlesTableRowReturnType => {
    const { articles, isLoading } = useArticlesByUserData();
    const [data, setData] = useState<UserArticlesTableInfo[] | null>(null);

    useEffect(() => {
        if (!isLoading && articles.length !== data?.length) {
            setData(articles);
        }
    }, [articles, isLoading, data?.length, setData]);

    const deleteArticleModal = useToggleVisibility();
    const { navigateToEditArticle } = useEditArticleNavigation();
    const [selectedArticle, setSelectedArticle] =
        useState<SelectedArticle | null>(null);

    const deleteTableRow = useCallback(
        async (articleId: string) => {
            if (!articleId) {
                console.error('Article ID is required to delete the article.');
                return null;
            }

            try {
                const deletedArticleId = await onDeleteArticle(articleId);
                // setData((prevData) =>
                //     prevData.filter((row) => row.id !== articleId),
                // );

                return deletedArticleId;
            } catch (error: any) {
                console.error('Error deleting article:', error);

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
                navigateToEditArticle(articleId);
            }
        },
        [navigateToEditArticle],
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
