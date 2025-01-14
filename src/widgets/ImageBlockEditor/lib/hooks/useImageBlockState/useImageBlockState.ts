import { useTextInput } from '@/shared/lib/hooks/useTextInput/useTextInput';
import { useImageUploader } from '@/shared/lib/hooks/useImageUploader/useImageUploader';

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

    const {
        imagePreview,
        error: imageTypeError,
        handleImageChange,
        resetImage,
        selectedImage,
    } = useImageUploader({
        initialAvatar,
    });
    const isEmptyContent = !imagePreview || imagePreview.length === 0;

    return {
        title,
        handleTitleChange,
        isEmptyContent,
        imagePreview,
        imageTypeError,
        handleImageChange,
        resetImage,
        selectedImage,
    };
};
