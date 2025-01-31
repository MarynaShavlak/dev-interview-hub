import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    useFormValidation,
    UseFormValidationReturnType,
} from '@/shared/lib/hooks/validationHooks/useFormValidation/useFormValidation';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import {
    useImageUploader,
    UseImageUploaderReturn,
} from '@/shared/lib/hooks/useImageUploader/useImageUploader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { useArticleFormState } from '../useArticleFormState/useArticleFormState';
import {
    useArticleBlocksDisplay,
    UseArticleBlocksDisplayReturnType,
} from '../useArticleBlocksDisplay/useArticleBlocksDisplay';
import {
    deleteArticleImageThunk,
    uploadArticleImageThunk,
    useArticleDataById,
} from '@/entities/Article';
import { createArticleThunk } from '../../../model/services/createArticleThunk/createArticleThunk';
import { searchClient } from '@/shared/config/firebase/searchClient';
import { updateArticleThunk } from '../../../model/services/updateArticleThunk/updateArticleThunk';
import { deleteArticleWithRelationsThunk } from '@/widgets/ArticleManagement';

interface Metadata {
    isEditArticlePage: boolean;
    blocks: UseArticleBlocksDisplayReturnType['blocks'];
    saveError: string | null;
    isLoading: boolean;
}

interface FormActions {
    onUpdate: () => Promise<string | null>;
    onSave: () => Promise<string | null>;
    onClear: () => void;
    onCancelChanges: () => void;
    onDelete: () => Promise<string | null>;
}

export interface UseArticleEditorReturn {
    metadata: Metadata;
    validation: Pick<
        UseFormValidationReturnType,
        | 'hasInputErrors'
        | 'titleErrors'
        | 'subtitleTextErrors'
        | 'subtitleLinkErrors'
    >;
    blockActions: UseArticleBlocksDisplayReturnType;
    formActions: FormActions;
    heroImage: Pick<
        UseImageUploaderReturn,
        | 'fileTypeError'
        | 'handleImageChange'
        | 'resetImage'
        | 'avatarSrc'
        | 'preview'
    >;
}

export const useArticleEditor = (): UseArticleEditorReturn => {
    const validConfig = useInputValidationConfig();
    const dispatch = useAppDispatch();
    const [saveError, setSaveError] = useState<string | null>(null);

    const { id } = useParams<{ id: string }>();
    const isEditArticlePage = Boolean(id);
    const { data: editedArticle, isLoading: isArticleLoading } =
        useArticleDataById(id || '');
    const initialAvatar = isEditArticlePage ? editedArticle?.img : '';

    const {
        formData,
        uploadedArticleImage,
        onFileUpload,
        onResetArticle,
        onChangeHeroImage,
    } = useArticleFormState(editedArticle, isEditArticlePage);

    const {
        hasInputErrors,
        titleErrors,
        subtitleTextErrors,
        subtitleLinkErrors,
    } = useFormValidation(
        {
            title: formData?.title || '',
            subtitleText: formData?.subtitle.text || '',
            subtitleLink: formData?.subtitle.link || '',
        },
        validConfig,
        'article',
    );
    const blockOperations = useArticleBlocksDisplay(
        isEditArticlePage,
        formData,
    );

    const deleteFromStorage = useCallback(async () => {
        if (initialAvatar) {
            await dispatch(deleteArticleImageThunk(initialAvatar)).unwrap();
        }
    }, [dispatch, initialAvatar]);

    const { preview, fileTypeError, handleImageChange, resetImage, avatarSrc } =
        useImageUploader({
            initialAvatar: initialAvatar || '',
            onFileUpload,
            deleteFromStorage,
        });

    const onClearArticle = useCallback(() => {
        onResetArticle();
        blockOperations.clearBlocks();
        resetImage();
    }, [blockOperations, onResetArticle, resetImage]);

    const onSaveArticle = useCallback(async () => {
        try {
            setSaveError(null);

            if (uploadedArticleImage) {
                const heroImageUrl = await dispatch(
                    uploadArticleImageThunk(uploadedArticleImage),
                ).unwrap();
                onChangeHeroImage(heroImageUrl);
            }

            const savedArticle = await dispatch(createArticleThunk()).unwrap();
            await searchClient.clearCache();
            if (savedArticle?.id) {
                onClearArticle();
                return savedArticle.id;
            }
            return null;
        } catch (error: any) {
            console.error('Error saving article:', error);
            setSaveError(error.message || 'An unexpected error occurred.');
            return null;
        }
    }, [uploadedArticleImage, dispatch, onClearArticle, onChangeHeroImage]);

    const onDeleteArticle = useCallback(async () => {
        if (!id || !formData) {
            console.error('Article ID is required to delete the article.');
            return null;
        }
        try {
            const deletedArticleId = await dispatch(
                deleteArticleWithRelationsThunk(formData.id),
            ).unwrap();
            await searchClient.clearCache();
            if (deletedArticleId) {
                onClearArticle();
                return deletedArticleId;
            }

            return null;
        } catch (error: any) {
            console.error('Error deleting article:', error);
            setSaveError(error.message || 'Failed to delete the article.');
            return null;
        }
    }, [dispatch, formData, id, onClearArticle]);

    const onUpdateArticle = useCallback(async () => {
        if (!id || !formData) {
            console.error(
                'Article ID and form data are required to update the article.',
            );
            setSaveError('Article data is incomplete.');
            return null;
        }

        try {
            setSaveError(null);

            if (uploadedArticleImage) {
                const heroImageUrl = await dispatch(
                    uploadArticleImageThunk(uploadedArticleImage),
                ).unwrap();
                onChangeHeroImage(heroImageUrl);
            } else if (!uploadedArticleImage && !preview) {
                onChangeHeroImage('');
            }

            const updatedArticle =
                await dispatch(updateArticleThunk()).unwrap();
            await searchClient.clearCache();

            if (updatedArticle?.id) {
                console.log(
                    `Article with ID "${updatedArticle.id}" has been updated.`,
                );
                return updatedArticle.id;
            }

            return null;
        } catch (error: any) {
            console.error('Error updating article:', error);
            setSaveError(
                error.message ||
                    'An error occurred while updating the article.',
            );
            return null;
        }
    }, [
        id,
        formData,
        uploadedArticleImage,
        preview,
        dispatch,
        onChangeHeroImage,
    ]);

    const onCancelArticleChanges = useCallback(() => {
        onClearArticle();
    }, [onClearArticle]);

    return {
        metadata: {
            isEditArticlePage,
            blocks: blockOperations.blocks,
            saveError,
            isLoading: isArticleLoading,
        },

        validation: {
            hasInputErrors,
            titleErrors,
            subtitleTextErrors,
            subtitleLinkErrors,
        },

        blockActions: {
            ...blockOperations,
        },
        formActions: {
            onSave: onSaveArticle,
            onClear: onClearArticle,
            onCancelChanges: onCancelArticleChanges,
            onDelete: onDeleteArticle,
            onUpdate: onUpdateArticle,
        },

        heroImage: {
            preview,
            avatarSrc,
            fileTypeError,
            handleImageChange,
            resetImage,
        },
    };
};
