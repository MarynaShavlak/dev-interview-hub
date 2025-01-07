import { useCallback } from 'react';
import {
    useArticleFormData,
    useArticleUploadPreview,
} from '../../../model/selectors/getCreateArticleSelectors';
import { useCreateArticleActions } from '../../../model/slices/createArticleSlice';
import { ArticleBlock } from '@/entities/Article';

export const useArticleEditor = () => {
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
    } = useCreateArticleActions();
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
