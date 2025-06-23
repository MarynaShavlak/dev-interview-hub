import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    useFormValidation,
    UseFormValidationReturnType,
} from '@/shared/lib/hooks/validationHooks/useFormValidation/useFormValidation';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import {
    useLiveCodeBlocksDisplay,
    UseLiveCodeBlocksDisplayReturnType,
} from '../useLiveCodeBlocksDisplay/useLiveCodeBlocksDisplay';

import { createLiveCodeTaskThunk } from '../../../model/services/createLiveCodeTaskThunk/createLiveCodeTaskThunk';
import { searchClient } from '@/shared/config/firebase/searchClient';
import { useLiveCodeData } from '../useLiveCodeData/useLiveCodeData';
import { useLiveCodeFormState } from '../useLiveCodeFormState/useLiveCodeFormState';
import { deleteLiveCodeThunk } from '@/entities/LiveCode';
import { updateLiveCodeTaskThunk } from '../../../model/services/updateLiveCodeTaskThunk/updateLiveCodeTaskThunk';

interface Metadata {
    isEditArticlePage: boolean;
    blocks: UseLiveCodeBlocksDisplayReturnType['blocks'];
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

export interface UseLiveCodeEditorReturn {
    metadata: Metadata;
    validation: Pick<
        UseFormValidationReturnType,
        'hasInputErrors' | 'titleErrors'
    >;
    blockActions: UseLiveCodeBlocksDisplayReturnType;
    formActions: FormActions;
}

export const useLiveCodeEditor = (): UseLiveCodeEditorReturn => {
    const validConfig = useInputValidationConfig();
    const dispatch = useAppDispatch();
    const [saveError, setSaveError] = useState<string | null>(null);

    const { id } = useParams<{ id: string }>();
    const { liveCodeData, isLoading } = useLiveCodeData(id);
    const isEditPage = Boolean(id);

    const { formData, onResetLiveCode } = useLiveCodeFormState(
        liveCodeData,
        isEditPage,
    );

    const { hasInputErrors, titleErrors } = useFormValidation(
        {
            title: formData?.title || '',
        },
        validConfig,
        'article',
    );
    const blockOperations = useLiveCodeBlocksDisplay(isEditPage, formData);

    const onClearArticle = useCallback(() => {
        onResetLiveCode();
        blockOperations.clearBlocks();
    }, [blockOperations, onResetLiveCode]);

    const onSaveArticle = useCallback(async () => {
        try {
            setSaveError(null);

            const savedArticle = await dispatch(
                createLiveCodeTaskThunk(),
            ).unwrap();
            await searchClient.clearCache();

            if (savedArticle?.id) {
                onClearArticle();
                return savedArticle.id;
            }
            return null;
        } catch (error: any) {
            console.error('Error saving live code task:', error);
            setSaveError(error.message || 'An unexpected error occurred.');
            return null;
        }
    }, [dispatch, onClearArticle]);

    const onDeleteArticle = useCallback(async () => {
        if (!id || !formData) {
            console.error(
                'Live Code Task ID is required to delete the live code task.',
            );
            return null;
        }
        try {
            const deletedArticleId = await dispatch(
                deleteLiveCodeThunk(formData.id),
            ).unwrap();
            await searchClient.clearCache();

            if (deletedArticleId) {
                onClearArticle();
                return deletedArticleId;
            }

            return null;
        } catch (error: any) {
            console.error('Error deleting live code task:', error);
            setSaveError(
                error.message || 'Failed to delete the live code task.',
            );
            return null;
        }
    }, [dispatch, formData, id, onClearArticle]);

    const onUpdateArticle = useCallback(async () => {
        if (!id || !formData) {
            console.error(
                'Live Code Task ID and form data are required to update the live code task.',
            );
            setSaveError('Live code task data is incomplete.');
            return null;
        }

        try {
            setSaveError(null);

            const updatedArticle = await dispatch(
                updateLiveCodeTaskThunk(),
            ).unwrap();
            await searchClient.clearCache();

            if (updatedArticle?.id) {
                console.log(
                    ` live code task with ID "${updatedArticle.id}" has been updated.`,
                );
                return updatedArticle.id;
            }

            return null;
        } catch (error: any) {
            console.error('Error updating  live code task:', error);
            setSaveError(
                error.message ||
                    'An error occurred while updating the  live code task.',
            );
            return null;
        }
    }, [id, formData, dispatch]);

    const onCancelArticleChanges = useCallback(() => {
        onClearArticle();
    }, [onClearArticle]);

    return {
        metadata: {
            isEditArticlePage: isEditPage,
            blocks: blockOperations.blocks,
            saveError,
            isLoading,
        },

        validation: {
            hasInputErrors,
            titleErrors,
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
    };
};
