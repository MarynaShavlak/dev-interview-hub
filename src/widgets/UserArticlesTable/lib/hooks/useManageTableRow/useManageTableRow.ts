import { useCallback, useEffect, useState } from 'react';
import { useArticleNavigation } from '@/entities/Article';
import { UserArticlesTableInfo } from '../../../model/types/userArticlesTableInfo';
import { useToggleVisibility } from '@/shared/lib/hooks/useToggleVisibility/useToggleVisibility';
import { useArticlesByUserData } from '../useArticlesByUserData/useArticlesByUserData';

export const useManageTableRow = (
    onDeleteArticle: (articleId: string) => Promise<string | null>,
) => {
    const { articles, isLoading } = useArticlesByUserData();

    const [data, setData] = useState<UserArticlesTableInfo[]>([]);

    useEffect(() => {
        if (!isLoading && articles.length !== data.length) {
            setData(articles);
        }
    }, [articles, isLoading, data.length, setData]);

    const { navigateToArticle } = useArticleNavigation();
    const deleteArticleModal = useToggleVisibility();
    const [selectedArticle, setSelectedArticle] = useState<{
        id: string;
        title: string;
    } | null>(null);

    const deleteTableRow = useCallback(
        async (articleId: string) => {
            if (!articleId) {
                console.error('Article ID is required to delete the article.');
                return null;
            }

            try {
                const deletedArticleId = await onDeleteArticle(articleId);
                setData((prevData) =>
                    prevData.filter((row) => row.id !== articleId),
                );

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
            const article = data.find((item) => item.id === articleId);
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
                navigateToArticle(articleId);
            }
        },
        [navigateToArticle],
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
