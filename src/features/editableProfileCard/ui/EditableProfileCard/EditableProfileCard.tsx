import { memo } from 'react';
import { EditableProfileCardContainer } from '../EditableProfileCardContainer/EditableProfileCardContainer';
import { useProfile } from '../../lib/hooks/useProfile';
import { EditableProfileCardError } from '../EditableProfileCardError/EditableProfileCardError';
import { toggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { VStack } from '@/shared/ui/common/Stack';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { profileReducer } from '../../model/slice/profileSlice';
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader';
import cls from './EditableProfileCard.module.scss';

interface EditableProfileCardProps {
    className?: string;
    id?: string;
}

const reducers: ReducersList = {
    profile: profileReducer,
};

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
    const { className, id } = props;
    const { validateErrors } = useProfile();

    const dispatch = useAppDispatch();

    useInitialEffect(() => {
        if (id) {
            dispatch(fetchProfileData(id));
        }
    });

    const mainClass = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => cls.RedesignedProfileCard,
        off: () => cls.DeprecatedProfileCard,
    });

    return (
        <DynamicModuleLoader reducers={reducers}>
            <VStack
                gap="8"
                max
                className={classNames(mainClass, {}, [className])}
            >
                <EditableProfileCardHeader />
                {validateErrors?.length && (
                    <EditableProfileCardError validateErrors={validateErrors} />
                )}
                <EditableProfileCardContainer />
            </VStack>
        </DynamicModuleLoader>
    );
});
