import { useCallback, useEffect } from 'react';

import { LiveCode, LiveCodeBlock } from '@/entities/LiveCode';
import { useCreateLiveCodeTaskActions } from '../../../model/slices/createLiveCodeSlice';
import {
    useHasLiveCodeChanges,
    useLiveCodeFormData,
} from '../../../model/selectors/getLiveCodeSelectors';

export const useLiveCodeFormState = (
    editedLiveCode?: LiveCode,
    isEditMode: boolean = false,
) => {
    const formData = useLiveCodeFormData();
    const hasChanges = useHasLiveCodeChanges();

    const {
        updateCategory,
        updateBlocks,
        deleteBlock,
        updateCreateLiveCodeTaskForm,
        setLiveCodeTaskData,
        resetLiveCodeTask,
        updateTitle,
        setEditMode,
    } = useCreateLiveCodeTaskActions();

    useEffect(() => {
        if (isEditMode && editedLiveCode) {
            setLiveCodeTaskData(editedLiveCode);
            setEditMode(true);
        }
    }, [editedLiveCode, isEditMode, setLiveCodeTaskData, setEditMode]);

    const onChangeTitle = useCallback(
        (value?: string) => {
            updateCreateLiveCodeTaskForm({ title: value || '' });
        },
        [updateCreateLiveCodeTaskForm],
    );

    const onChangeCategory = useCallback(
        (value?: string) => {
            updateCategory(value || '');
        },
        [updateCategory],
    );

    const onChangeBlocks = useCallback(
        (block: LiveCodeBlock) => {
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
    const onResetLiveCode = useCallback(() => {
        resetLiveCodeTask();
    }, [resetLiveCodeTask]);

    return {
        hasChanges,
        formData,
        onChangeTitle,
        onChangeCategory,
        onChangeBlocks,
        onDeleteBlock,
        onResetLiveCode,
    };
};
