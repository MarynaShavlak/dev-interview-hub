import { HStack } from '@/shared/ui/common/Stack';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Text } from '@/shared/ui/redesigned/Text';
import { Icon } from '@/shared/ui/redesigned/Icon';
import EyeIconDeprecated from '@/shared/assets/icons/eye-20-20.svg';
import EyeIconRedesigned from '@/shared/assets/icons/eye.svg';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

interface ViewsProps {
    views: number;
}

export const ArticleViews = ({ views }: ViewsProps) => (
    <ToggleFeaturesComponent
        feature="isAppRedesigned"
        on={
            <HStack gap="8">
                <Icon Svg={EyeIconRedesigned} />
                <Text text={String(views)} />
            </HStack>
        }
        off={
            <HStack gap="8">
                <TextDeprecated text={String(views)} />
                <IconDeprecated
                    Svg={EyeIconDeprecated}
                    width={20}
                    height={20}
                />
            </HStack>
        }
    />
);
