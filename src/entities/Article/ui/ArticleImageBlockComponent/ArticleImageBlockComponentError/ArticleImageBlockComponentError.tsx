import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import cls from '../ArticleImageBlockComponent.module.scss';
import { VStack } from '@/shared/ui/common/Stack';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import {
    Text as TextDeprecated,
    TextAlign,
    TextTheme,
} from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';

interface ArticleImageBlockComponentErrorProps {
    className?: string;
}
export const ArticleImageBlockComponentError = memo(
    (props: ArticleImageBlockComponentErrorProps) => {
        const { className } = props;
        const { t } = useTranslation();
        const errorText = t('Не вдалося завантажити зображення');

        return (
            <VStack
                className={classNames(cls.ImgBlock, {}, [className])}
                align="center"
                gap="8"
            >
                <ToggleFeaturesComponent
                    feature="isAppRedesigned"
                    on={
                        <Text variant="error" text={errorText} align="center" />
                    }
                    off={
                        <TextDeprecated
                            theme={TextTheme.ERROR}
                            text={errorText}
                            align={TextAlign.CENTER}
                        />
                    }
                />
            </VStack>
        );
    },
);
