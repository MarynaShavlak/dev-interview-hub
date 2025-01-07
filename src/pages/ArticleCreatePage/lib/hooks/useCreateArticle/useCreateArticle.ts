import { useCallback } from 'react';
import { useCreateArticleForm } from '../../../model/selectors/getCreateArticleSelectors';
import { useCreateArticleActions } from '../../../model/slices/createArticleSlice';
import { ArticleBlock } from '@/entities/Article';

export const useCreateArticle = () => {
    const formData = useCreateArticleForm();

    const {
        updateCreateArticleForm,
        updateSubtitleText,
        updateSubtitleLink,
        updateCategory,
        updateBlocks,
        deleteBlock,
        deleteAllBlocks,
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

    const onDeleteAllBlocks = useCallback(() => {
        deleteAllBlocks();
    }, [deleteAllBlocks]);

    return {
        formData,
        onChangeTitle,
        onChangeSubtitleText,
        onChangeSubtitleLink,
        onChangeCategory,
        onChangeBlocks,
        onDeleteBlock,
        onChangeHeroImage,
        onFileUpload,
        onDeleteAllBlocks,
    };
};
