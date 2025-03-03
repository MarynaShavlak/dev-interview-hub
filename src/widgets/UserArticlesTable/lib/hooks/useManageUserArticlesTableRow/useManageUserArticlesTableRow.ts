import { useCallback, useEffect, useState } from 'react';
import {
    useArticleNavigation,
    useEditArticleNavigation,
} from '@/entities/Article';
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
    handleDeleteClick: (articleId: string) => void;
    handleNavigateToArticle: (articleId: string) => void;
    handleEditClick: (articleIdId: string) => void;
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

    // useEffect(() => {
    //     if (!isLoading && articles?.length !== data?.length) {
    //         setData(articles);
    //     }
    // }, [articles, isLoading, data?.length, setData]);
    useEffect(() => {
        // Only update data if articles have changed and are not loading
        if (!isLoading && JSON.stringify(articles) !== JSON.stringify(data)) {
            setData(articles);
        }
    }, [articles, isLoading, data]);

    const deleteArticleModal = useToggleVisibility();
    const { navigateToEditArticle } = useEditArticleNavigation();
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
                navigateToEditArticle(articleId);
            }
        },
        [navigateToEditArticle],
    );

    const handleNavigateToArticle = useCallback(
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
        handleNavigateToArticle,
        confirmDelete,
        selectedArticle,
        isLoading,
        data,
        deleteArticleModal,
        articleTitle,
    };
};
