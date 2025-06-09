import { useCallback, useEffect } from 'react';
import {
    useHasHRInterviewQAChanges,
    useHRInterviewQAFormData,
} from '../../../model/selectors/getCreateHRInterviewQASelectors';
import { useCreateHRInterviewQAActions } from '../../../model/slices/createHRInterviewQASlice';
import { HRInterviewQA, HRInterviewQABlock } from '@/entities/HRInterviewQA';

export const useHRInterviewQAFormState = (
    editedHRInterviewQA?: HRInterviewQA,
    isEditMode: boolean = false,
) => {
    const formData = useHRInterviewQAFormData();
    const hasChanges = useHasHRInterviewQAChanges();

    const {
        updateCreateHRInterviewQAForm,
        resetHRInterviewQA,
        updateCategory,
        setHRInterviewQAData,
        updateBlocks,
        deleteBlock,

        setEditMode,
    } = useCreateHRInterviewQAActions();

    useEffect(() => {
        if (isEditMode && editedHRInterviewQA) {
            setHRInterviewQAData(editedHRInterviewQA);
            setEditMode(true);
        }
    }, [editedHRInterviewQA, isEditMode, setHRInterviewQAData, setEditMode]);

    const onChangeTitle = useCallback(
        (value?: string) => {
            updateCreateHRInterviewQAForm({ title: value || '' });
        },
        [updateCreateHRInterviewQAForm],
    );

    const onChangeCategory = useCallback(
        (value?: string) => {
            updateCategory(value || '');
        },
        [updateCategory],
    );

    const onChangeBlocks = useCallback(
        (block: HRInterviewQABlock) => {
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
    const onResetHRInterviewQA = useCallback(() => {
        resetHRInterviewQA();
    }, [resetHRInterviewQA]);

    return {
        hasChanges,
        formData,
        onChangeTitle,
        onChangeCategory,
        onChangeBlocks,
        onDeleteBlock,
        onResetHRInterviewQA,
    };
};
