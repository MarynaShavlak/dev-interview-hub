import { useTranslation } from 'react-i18next';
import React, { ChangeEvent, memo } from 'react';
import { Text } from '@/shared/ui/redesigned/Text';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { OrderCard } from '@/shared/ui/redesigned/OrderCard';
import { FileUploadZone } from '@/shared/ui/redesigned/FileUploadZone';
import { Box } from '@/shared/ui/common/Box';
import cls from './AddHeroForm.module.scss';
import { AppImage } from '@/shared/ui/common/AppImage';
import defaultImage from '@/shared/assets/images/default-img-list.png';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

interface AddHeroFormProps {
    index: number;
    imagePreview: string | null;
    error: string | null;
    handleImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
    resetImage: () => void;
}
export const AddHeroForm = memo((props: AddHeroFormProps) => {
    const { index, imagePreview, error, handleImageChange, resetImage } = props;
    const { t } = useTranslation('articleDetails');

    const previewWrapClass = imagePreview ? cls.previewWrap : '';

    return (
        <HStack gap="16" align="start" max>
            <OrderCard index={index} />
            <VStack gap="16" max>
                <Text text={t('Банер статті')} bold />
                <VStack gap="4" align="center" max>
                    <Box className={cls.avatarWrap}>
                        <VStack
                            gap="16"
                            align="center"
                            className={previewWrapClass}
                        >
                            {imagePreview && (
                                <AppImage
                                    fallback={
                                        <Skeleton
                                            width="100%"
                                            height={420}
                                            border="16px"
                                        />
                                    }
                                    errorFallback={
                                        <AppImage
                                            className={cls.img}
                                            src={defaultImage}
                                            alt={t(
                                                'Дефолтне зображення картинки статті',
                                            )}
                                        />
                                    }
                                    src={imagePreview}
                                    className={cls.img}
                                />
                            )}
                            <FileUploadZone
                                imagePreview={imagePreview}
                                handleImageChange={handleImageChange}
                                resetImage={resetImage}
                                className={cls.heroImageZone}
                            />
                        </VStack>
                    </Box>

                    {error && <Text text={error} variant="error" />}
                </VStack>
            </VStack>
        </HStack>
    );
});
