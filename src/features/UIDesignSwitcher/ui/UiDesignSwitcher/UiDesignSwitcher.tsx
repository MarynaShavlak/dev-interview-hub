import { useTranslation } from 'react-i18next';
import { memo, useState } from 'react';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';
import { useUserAuthData } from '@/entities/User';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { Text, Text as TextDeprecated } from '@/shared/ui/redesigned/Text';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { getFeatureFlag, ToggleFeaturesComponent } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HStack } from '@/shared/ui/common/Stack';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { updateFeatureFlagsThunk } from '../../model/services/updateFeatureFlagsThunk/updateFeatureFlagsThunk';
import { updateArticlesView } from '../../lib/utilities/updateArticlesView/updateArticlesView';

interface UiDesignSwitcherProps {
    className?: string;
}

export const UiDesignSwitcher = memo((props: UiDesignSwitcherProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const isAppRedesigned = getFeatureFlag('isAppRedesigned');
    console.log('isAppRedesigned', isAppRedesigned);
    const dispatch = useAppDispatch();
    const authData = useUserAuthData();
    const [isLoading, setIsLoading] = useState(false);
    const forceUpdate = useForceUpdate();

    const items = [
        {
            label: t('Новий'),
            value: 'new',
        },
        {
            label: t('Старий'),
            value: 'old',
        },
    ];

    const onChange = async (value: string) => {
        if (authData) {
            setIsLoading(true);
            console.log('change interface design');
            await dispatch(
                updateFeatureFlagsThunk({
                    userId: authData.id,
                    newFeatures: {
                        isAppRedesigned: value === 'new',
                    },
                }),
            ).unwrap();
            updateArticlesView(value);

            setIsLoading(false);
            forceUpdate();
        }
    };

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={
                <HStack gap="16">
                    <Text text={t('Варіант інтерфейсу')} />
                    {isLoading ? (
                        <Skeleton width={100} height={40} />
                    ) : (
                        <ListBox
                            onChange={onChange}
                            items={items}
                            value={isAppRedesigned ? 'new' : 'old'}
                            className={className}
                        />
                    )}
                </HStack>
            }
            off={
                <HStack gap="16">
                    <TextDeprecated text={t('Варіант інтерфейсу')} />
                    {isLoading ? (
                        <SkeletonDeprecated width={100} height={40} />
                    ) : (
                        <ListBoxDeprecated
                            onChange={onChange}
                            items={items}
                            value={isAppRedesigned ? 'new' : 'old'}
                            className={className}
                        />
                    )}
                </HStack>
            }
        />
    );
});
