import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { FileUploadZone } from '@/shared/ui/deprecated/FileUploadZone';
import { Text, TextSize, TextTheme } from '@/shared/ui/deprecated/Text';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { OrderCard } from '@/shared/ui/deprecated/OrderCard';
import { Box } from '@/shared/ui/common/Box';
import cls from '../AddHeroForm.module.scss';
import { AppImage } from '@/shared/ui/common/AppImage';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';

import { AddHeroFormProps } from '../AddHeroForm';
import DefaultImage from '@/shared/assets/icons/logoWithText.svg';
import { Icon } from '@/shared/ui/deprecated/Icon';

export const AddHeroFormDeprecated = memo((props: AddHeroFormProps) => {
    const { index, imagePreview, error, handleImageChange, resetImage } = props;
    const { t } = useTranslation('articleDetails');

    const previewWrapClass = imagePreview ? cls.previewWrap : '';

    return (
        <HStack gap="16" align="start" max>
            <OrderCard index={index} />
            <VStack gap="16" max>
                <Text title={t('Банер статті')} size={TextSize.M} />
                <VStack gap="4" align="center" max>
                    <Box className={cls.avatarWrapDeprecated}>
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
                                        <Icon
                                            Svg={DefaultImage}
                                            width="200px"
                                            height="200px"
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
                                height="420px"
                            />
                        </VStack>
                    </Box>

                    {error && <Text text={error} theme={TextTheme.ERROR} />}
                </VStack>
            </VStack>
        </HStack>
    );
});
