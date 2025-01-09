import { useCallback, useEffect } from 'react';
import {
    useArticleFormData,
    useArticleUploadPreview,
} from '../../../model/selectors/getCreateArticleSelectors';
import { useCreateArticleActions } from '../../../model/slices/createArticleSlice';
import { ArticleBlock, useArticleDataById } from '@/entities/Article';

export const useArticleEditor = (id?: string, isEdit: boolean = false) => {
    const formData = useArticleFormData();
    const uploadedArticleImage = useArticleUploadPreview();
    const {
        updateCreateArticleForm,
        updateSubtitleText,
        updateSubtitleLink,
        updateCategory,
        updateBlocks,
        deleteBlock,
        resetArticle,
        setUploadedArticleImage,
        setArticleData,
        setEditMode,
    } = useCreateArticleActions();

    const { data: article, isLoading, error } = useArticleDataById(id || '');
    useEffect(() => {
        if (isEdit && article) {
            // Set article data when edit mode is enabled
            setArticleData(article);
            setEditMode(true);
        }
    }, [isEdit, article, setArticleData, setEditMode]);
    //

    const onFileUpload = useCallback(
        (file: File | null) => setUploadedArticleImage(file),
        [setUploadedArticleImage],
    );

    const onChangeTitle = useCallback(
        (value?: string) => {
            updateCreateArticleForm({ title: value || '' });
        },
        [updateCreateArticleForm],
    );

    const onChangeSubtitleText = useCallback(
        (value?: string) => {
            updateSubtitleText(value || '');
        },
        [updateSubtitleText],
    );

    const onChangeSubtitleLink = useCallback(
        (value?: string) => {
            updateSubtitleLink(value || '');
        },
        [updateSubtitleLink],
    );

    const onChangeHeroImage = useCallback(
        (value?: string) => {
            updateCreateArticleForm({ img: value || '' });
        },
        [updateCreateArticleForm],
    );

    const onChangeCategory = useCallback(
        (value?: string) => {
            updateCategory(value || '');
        },
        [updateCategory],
    );

    const onChangeBlocks = useCallback(
        (block: ArticleBlock) => {
            updateBlocks(block);
        },
        [updateBlocks],
    );

    const onDeleteBlock = useCallback(
        (id: string) => {
            deleteBlock(id);
        },
        [deleteBlock],
    );
    const onResetArticle = useCallback(() => {
        resetArticle();
    }, [resetArticle]);

    return {
        formData,
        uploadedArticleImage,
        onChangeTitle,
        onChangeSubtitleText,
        onChangeSubtitleLink,
        onChangeCategory,
        onChangeBlocks,
        onDeleteBlock,
        onChangeHeroImage,
        onFileUpload,
        onResetArticle,
    };
};
