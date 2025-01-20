import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { useImageUploader } from '@/shared/lib/hooks/useImageUploader/useImageUploader';
import { VStack } from '@/shared/ui/common/Stack';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import cls from '../UserCard.module.scss';

import { Button } from '@/shared/ui/redesigned/Button';
import { FileUploadInput } from '@/shared/ui/redesigned/FileUploadInput/FileUploadInput';
import { Text } from '@/shared/ui/redesigned/Text';
import { Box } from '@/shared/ui/common/Box/Box';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { deleteArticleImageThunk } from '@/entities/Article';

interface ImageUploaderProps {
    avatar: string;
    readonly?: boolean;
    onFileUpload: (file: File | null) => void;
}

export const AvatarUploader = ({
    avatar,
    readonly,
    onFileUpload,
}: ImageUploaderProps) => {
    const { t } = useTranslation('profile');
    const avatarTextPlaceholder = t('Аватар користувача');
    const dispatch = useAppDispatch();
    const deleteFromStorage = useCallback(async () => {
        if (avatar) {
            await dispatch(deleteArticleImageThunk(avatar)).unwrap();
        }
    }, [dispatch, avatar]);

    const { avatarSrc, preview, fileTypeError, handleImageChange, resetImage } =
        useImageUploader({
            initialAvatar: avatar,
            onFileUpload,
            deleteFromStorage,
        });

    return (
        <VStack justify="center" align="center" max>
            {readonly && (
                <Avatar size={128} src={avatar} alt={avatarTextPlaceholder} />
            )}
            {!readonly && (
                <VStack gap="4" align="center">
                    <Box className={cls.avatarWrap}>
                        {preview && (
                            <Avatar
                                size={128}
                                src={preview}
                                alt={avatarTextPlaceholder}
                            />
                        )}

                        {!preview && (
                            <Avatar
                                size={128}
                                src={avatarSrc}
                                alt={avatarTextPlaceholder}
                            />
                        )}

                        <FileUploadInput onChange={handleImageChange} />
                    </Box>
                    <Button variant="cancel" onClick={resetImage} size="s">
                        {t('Видалити зображення')}
                    </Button>
                    {fileTypeError && (
                        <Text text={fileTypeError} variant="error" />
                    )}
                </VStack>
            )}
        </VStack>
    );
};
