import { useCallback } from 'react';
import { useTextInput } from '@/shared/lib/hooks/useTextInput/useTextInput';
import { useImageUploader } from '@/shared/lib/hooks/useImageUploader/useImageUploader';
import { deleteArticleImageThunk } from '@/entities/Article';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

interface UseImageBlockStateProps {
    initialTitle: string;
    initialAvatar: string;
}

export const useImageBlockState = ({
    initialTitle,
    initialAvatar,
}: UseImageBlockStateProps) => {
    const { value: title, handleChange: handleTitleChange } =
        useTextInput(initialTitle);
    const dispatch = useAppDispatch();
    console.log('initial avatar', initialAvatar);

    const deleteFromStorage = useCallback(async () => {
        if (initialAvatar) {
            await dispatch(deleteArticleImageThunk(initialAvatar)).unwrap();
        }
    }, [dispatch, initialAvatar]);

    const {
        preview,
        fileTypeError,
        handleImageChange,
        resetImage,
        selectedImage,
    } = useImageUploader({
        initialAvatar,
        deleteFromStorage,
    });
    const isEmptyContent = !preview || preview.length === 0;

    return {
        title,
        handleTitleChange,
        isEmptyContent,
        preview,
        fileTypeError,
        handleImageChange,
        resetImage,
        selectedImage,
        deleteFromStorage,
    };
};
