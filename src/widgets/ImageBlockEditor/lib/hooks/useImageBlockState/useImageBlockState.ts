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
        preview,
        fileTypeError,
        handleImageChange,
        resetImage,
        selectedImage,
    } = useImageUploader({
        initialAvatar,
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
    };
};
