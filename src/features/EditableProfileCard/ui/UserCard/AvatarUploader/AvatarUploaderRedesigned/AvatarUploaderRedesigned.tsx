import { useTranslation } from 'react-i18next';
import { isMobile } from 'react-device-detect';
import { VStack } from '@/shared/ui/common/Stack';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import cls from '../../UserCard.module.scss';

import { Button } from '@/shared/ui/redesigned/Button';
import { FileUploadInput } from '@/shared/ui/common/FileUploadInput/FileUploadInput';
import { Text } from '@/shared/ui/redesigned/Text';
import { Box } from '@/shared/ui/common/Box/Box';
import { AvatarUploaderProps } from '../AvatarUploader';
import { useAvatarUploader } from '../../../../lib/hooks/useAvatarUploader/useAvatarUploader';

export const AvatarUploaderRedesigned = ({
    avatar,
    readonly,
    onFileUpload,
}: AvatarUploaderProps) => {
    const { t } = useTranslation('profile');
    const avatarTextPlaceholder = t('Аватар користувача');
    const { avatarSrc, preview, fileTypeError, handleImageChange, resetImage } =
        useAvatarUploader(avatar, onFileUpload);

    return (
        <VStack justify="center" align="center" max>
            {readonly && (
                <Avatar
                    size={isMobile ? 100 : 128}
                    src={avatar}
                    alt={avatarTextPlaceholder}
                />
            )}
            {!readonly && (
                <VStack gap="4" align="center">
                    <Box className={cls.avatarWrap}>
                        {preview && (
                            <Avatar
                                size={isMobile ? 100 : 128}
                                src={preview}
                                alt={avatarTextPlaceholder}
                            />
                        )}

                        {!preview && (
                            <Avatar
                                size={isMobile ? 100 : 128}
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
