import { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormValidation } from '@/shared/lib/hooks/validationHooks/useFormValidation/useFormValidation';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import { useImageUploader } from '@/shared/lib/hooks/useImageUploader/useImageUploader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { getRouteArticleDetails } from '@/shared/const/router/router';
import { useArticleFormState } from '../useArticleFormState/useArticleFormState';
import { useArticleBlocksDisplay } from '../useArticleBlocksDisplay/useArticleBlocksDisplay';
import {
    uploadArticleImageThunk,
    useArticleDataById,
} from '@/entities/Article';
import { createArticleThunk } from '../../../model/services/createArticleThunk/createArticleThunk';

export const useArticleEditor = () => {
    const validConfig = useInputValidationConfig();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [saveError, setSaveError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

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

    const { hasErrors, titleErrors, subtitleTextErrors, subtitleLinkErrors } =
        useFormValidation(
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

    const { imagePreview, error, handleImageChange, resetImage, avatarSrc } =
        useImageUploader({
            initialAvatar: initialAvatar || '',
            onFileUpload,
        });

    const onClearArticle = useCallback(() => {
        onResetArticle();
        blockOperations.clearBlocks();
        resetImage();
    }, [blockOperations, onResetArticle, resetImage]);

    const onSaveArticle = useCallback(async () => {
        try {
            setIsLoading(true);
            setSaveError(null);
            let heroImageUrl = '';
            if (uploadedArticleImage) {
                heroImageUrl = await dispatch(
                    uploadArticleImageThunk(uploadedArticleImage),
                ).unwrap();
                onChangeHeroImage(heroImageUrl);
            }

            const savedArticle = await dispatch(createArticleThunk()).unwrap();
            if (savedArticle?.id) {
                navigate(getRouteArticleDetails(savedArticle.id));
            }

            onClearArticle();
        } catch (error: any) {
            console.error('Error saving article:', error);
            setSaveError(error.message || 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [
        dispatch,
        navigate,
        onClearArticle,
        onChangeHeroImage,
        uploadedArticleImage,
    ]);

    const onCancelArticleChanges = useCallback(() => {
        const hasUnsavedChanges = true;

        if (hasUnsavedChanges) {
            const confirmed = window.confirm(
                'You have unsaved changes. Are you sure you want to cancel?',
            );
            if (confirmed) {
                onClearArticle();
                navigate(-1);
            }
        } else {
            navigate(-1);
        }
        console.log('Cancel article changes');
    }, [navigate, onClearArticle]);

    return {
        metadata: {
            isEditArticlePage,
            blocks: blockOperations.blocks,
            saveError,
            isLoading: isLoading || isArticleLoading,
        },

        validation: {
            hasInputErrors: hasErrors,
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
        },

        heroImage: {
            preview: imagePreview,
            src: avatarSrc,
            fileTypeError: error,
            handleChange: handleImageChange,
            reset: resetImage,
        },
    };
};
