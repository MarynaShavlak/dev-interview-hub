import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { Text } from '@/shared/ui/redesigned/Text';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { OrderCard } from '@/shared/ui/redesigned/OrderCard';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { AppImage } from '@/shared/ui/common/AppImage';
import cls from './AddHeroForm.module.scss';
import defaultImage from '@/shared/assets/images/default-img-list.png';
import { useImageUploader } from '@/shared/lib/hooks/useImageUploader/useImageUploader';
import { FileUploadZone } from '@/shared/ui/redesigned/FileUploadZone';

interface AddHeroFormProps {
    index: number;
}
export const AddHeroForm = memo((props: AddHeroFormProps) => {
    const { index } = props;
    const { t } = useTranslation('articleDetails');
    const errorMessage = t('Некоректний тип файлу');

    const {
        avatarSrc,
        imagePreview,
        error,
        handleImageChange,
        resetImage,
        selectedImage,
    } = useImageUploader({
        initialAvatar: '',
        errorMessage,
    });

    return (
        <HStack gap="16" align="start" max>
            <OrderCard index={index} />
            <VStack gap="16">
                <Text text={t('Банер статті')} bold />
                <AppImage
                    fallback={
                        <Skeleton width="100%" height={420} border="16px" />
                    }
                    errorFallback={
                        <AppImage
                            className={cls.img}
                            src={defaultImage}
                            alt={t('Дефолтне зображення картинки статті')}
                        />
                    }
                    src=""
                    className={cls.img}
                />
                <FileUploadZone
                    imagePreview={imagePreview}
                    handleImageChange={handleImageChange}
                    resetImage={resetImage}
                />
                {error && <Text text={error} variant="error" />}
            </VStack>
        </HStack>
    );
});
