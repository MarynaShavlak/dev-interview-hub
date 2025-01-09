import { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormValidation } from '@/shared/lib/hooks/validationHooks/useFormValidation/useFormValidation';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import { useImageUploader } from '@/shared/lib/hooks/useImageUploader/useImageUploader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { getRouteArticleDetails } from '@/shared/const/router/router';
import { useArticleEditor } from '../useArticleEditor/useArticleEditor';
import { useArticleContentBlocks } from '../useArticleContentBlocks/useArticleContentBlocks';
import { uploadArticleImageThunk } from '../../../model/services/uploadArticleImageThunk/uploadImageThunk';
import { createArticleThunk } from '../../../model/services/createArticleThunk/createArticleThunk';
import { Article, useArticleDataById } from '@/entities/Article';

export const useArticleCreation = () => {
    const validConfig = useInputValidationConfig();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [saveError, setSaveError] = useState<string | null>(null);

    const { id } = useParams<{ id: string }>();
    const isEditMode = Boolean(id);
    const { data: editedArticle } = useArticleDataById(id || '');
    const initialAvatar = isEditMode ? editedArticle?.img : '';

    const {
        formData,
        uploadedArticleImage,
        onFileUpload,
        onResetArticle,
        onChangeHeroImage,
    } = useArticleEditor(editedArticle, isEditMode);

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
        createEmptyTextBlock,
        createEmptyCodeBlock,
        createEmptyImageBlock,
        addBlock,
        updateBlock,
        deleteBlock,
        deleteAllBlocks,
    } = useArticleContentBlocks(formData || ({} as Article));

    const { imagePreview, error, handleImageChange, resetImage, avatarSrc } =
        useImageUploader({
            // initialAvatar: '',
            initialAvatar: initialAvatar || '',
            onFileUpload,
        });
    // console.log('avatar', avatarSrc);

    const onCancelCreate = useCallback(() => {
        onResetArticle();
        deleteAllBlocks();
        resetImage();
    }, [deleteAllBlocks, onResetArticle, resetImage]);

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
            createEmptyTextBlock,
            createEmptyCodeBlock,
            createEmptyImageBlock,
            addBlock,
            updateBlock,
            deleteBlock,
            deleteAllBlocks,
        },
        isEditMode,
        editedArticle,
    };
};
