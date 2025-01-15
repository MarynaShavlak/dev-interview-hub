import { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormValidation } from '@/shared/lib/hooks/validationHooks/useFormValidation/useFormValidation';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import { useImageUploader } from '@/shared/lib/hooks/useImageUploader/useImageUploader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { getRouteArticleDetails } from '@/shared/const/router/router';
import { useArticleEditorState } from '../useArticleEditorState/useArticleEditorState';
import { useArticleBlocksDisplay } from '../useArticleBlocksDisplay/useArticleBlocksDisplay';
import {
    uploadArticleImageThunk,
    useArticleDataById,
} from '@/entities/Article';
import { createArticleThunk } from '../../../model/services/createArticleThunk/createArticleThunk';

export const useArticleCreation = () => {
    const validConfig = useInputValidationConfig();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [saveError, setSaveError] = useState<string | null>(null);

    const { id } = useParams<{ id: string }>();
    const isEditArticlePage = Boolean(id);
    const { data: editedArticle } = useArticleDataById(id || '');
    const initialAvatar = isEditArticlePage ? editedArticle?.img : '';

    const {
        formData,
        uploadedArticleImage,
        onFileUpload,
        onResetArticle,
        onChangeHeroImage,
    } = useArticleEditorState(editedArticle, isEditArticlePage);

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
    const {
        blocks,
        insertTextBlock,
        insertCodeBlock,
        insertImageBlock,
        addBlock,
        updateBlock,
        removeBlock,
        clearBlocks,
    } = useArticleBlocksDisplay(isEditArticlePage, formData);

    const { imagePreview, error, handleImageChange, resetImage, avatarSrc } =
        useImageUploader({
            initialAvatar: initialAvatar || '',
            onFileUpload,
        });

    const onCancelCreate = useCallback(() => {
        onResetArticle();
        clearBlocks();
        resetImage();
    }, [clearBlocks, onResetArticle, resetImage]);

    const onSaveCreate = useCallback(async () => {
        try {
            setSaveError(null);
            if (uploadedArticleImage) {
                const url = await dispatch(
                    uploadArticleImageThunk(uploadedArticleImage),
                ).unwrap();
                onChangeHeroImage(url);
            } else {
                onChangeHeroImage('');
            }

            const savedArticle = await dispatch(createArticleThunk()).unwrap();
            if (savedArticle?.id) {
                navigate(getRouteArticleDetails(savedArticle.id));
            }

            onCancelCreate();
        } catch (error: any) {
            console.error('Error saving article:', error);
            setSaveError(error.message || 'An unexpected error occurred.');
        }
    }, [
        dispatch,
        navigate,
        onCancelCreate,
        onChangeHeroImage,
        uploadedArticleImage,
    ]);

    return {
        hasErrors,
        onCancelCreate,
        saveError,
        onSaveCreate,
        validationErrors: {
            titleErrors,
            subtitleTextErrors,
            subtitleLinkErrors,
        },
        handleHeroImageChange: handleImageChange,
        heroPreview: imagePreview,
        heroImage: avatarSrc,
        resetHeroImage: resetImage,
        heroFileTypeError: error,
        blocks,
        blockActions: {
            insertTextBlock,
            insertCodeBlock,
            insertImageBlock,
            addBlock,
            updateBlock,
            removeBlock,
            clearBlocks,
        },
        isEditArticlePage,
        editedArticle,
    };
};
