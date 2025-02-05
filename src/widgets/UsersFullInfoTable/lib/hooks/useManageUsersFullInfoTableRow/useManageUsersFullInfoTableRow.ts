import { useCallback, useEffect, useState } from 'react';
import { useToggleVisibility } from '@/shared/lib/hooks/useToggleVisibility/useToggleVisibility';
import { useUsersTableData } from '../useUsersTableData';
import { UsersTableInfo } from '../../../model/types/usersTableInfo';
import { useUserProfileNavigation } from '@/entities/User';

export const useManageUsersFullInfoTableRow = (
    onDeleteUser: (userId: string) => Promise<string | null>,
) => {
    const { users, isLoading } = useUsersTableData();
    const [data, setData] = useState<UsersTableInfo[]>([]);

    useEffect(() => {
        if (!isLoading && users.length !== data.length) {
            setData(users);
        }
    }, [users, isLoading, data.length, setData]);

    //
    // useEffect(() => {
    //     if (!isLoading && articles.length !== data.length) {
    //         setData(articles);
    //     }
    // }, [articles, isLoading, data.length, setData]);

    const { navigateToUserProfile } = useUserProfileNavigation();
    const deleteArticleModal = useToggleVisibility();
    const [selectedArticle, setSelectedArticle] = useState<{
        id: string;
        title: string;
    } | null>(null);

    // const deleteTableRow = useCallback(
    //     async (articleId: string) => {
    //         if (!articleId) {
    //             console.error('Article ID is required to delete the article.');
    //             return null;
    //         }
    //
    //         try {
    //             const deletedArticleId = await onDeleteArticle(articleId);
    //             setData((prevData) =>
    //                 prevData.filter((row) => row.id !== articleId),
    //             );
    //
    //             return deletedArticleId;
    //         } catch (error: any) {
    //             console.error('Error deleting article:', error);
    //
    //             return null;
    //         }
    //     },
    //     [onDeleteArticle],
    // );
    //
    // const confirmDelete = useCallback(async () => {
    //     if (selectedArticle) {
    //         await deleteTableRow(selectedArticle.id);
    //         deleteArticleModal.hide();
    //         setSelectedArticle(null);
    //     }
    // }, [selectedArticle, deleteTableRow, deleteArticleModal]);
    //
    // const handleDeleteClick = useCallback(
    //     (articleId: string) => {
    //         const article = data.find((item) => item.id === articleId);
    //         if (article) {
    //             setSelectedArticle({
    //                 id: articleId,
    //                 title: article?.title || '',
    //             });
    //         }
    //
    //         deleteArticleModal.show();
    //     },
    //     [data, deleteArticleModal],
    // );

    const handleEditClick = useCallback(
        (userId: string) => {
            if (userId) {
                navigateToUserProfile(userId);
            }
        },
        [navigateToUserProfile],
    );

    const articleTitle = selectedArticle?.title
        ? `"${selectedArticle.title}"`
        : '';

    return {
        // handleDeleteClick,
        handleEditClick,
        // confirmDelete,
        // selectedArticle,
        // isLoading,
        // data,
        // deleteArticleModal,
        // articleTitle,
    };
};
