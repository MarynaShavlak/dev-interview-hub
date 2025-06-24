import { useTranslation } from 'react-i18next';

import { SearchBox } from 'react-instantsearch';

import { memo } from 'react';

import { Icon } from '@/shared/ui/redesigned/Icon';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from '../EntityFilters.module.scss';
import { Card } from '@/shared/ui/redesigned/Card';
import { VStack } from '@/shared/ui/common/Stack';
import SearchIcon from '@/shared/assets/icons/search.svg';
import CloseIcon from '@/shared/assets/icons/close.svg';
import { EntityFiltersProps } from '../EntityFilters';

const ResetIconComponent = memo(() => (
    <Icon Svg={CloseIcon} className={cls.ResetIcon} />
));

const SubmitIconComponent = memo(() => <Icon Svg={SearchIcon} />);

export const EntityFiltersRedesigned = (props: EntityFiltersProps) => {
    const { className, children } = props;
    const { t } = useTranslation();

    const searchBoxClasses = {
        submit: cls.SubmitSearchBtn,
        reset: cls.ResetSearchBtn,
        form: cls.SubmitInputWrapperRedesigned,
        input: cls.SearchInputRedesigned,
    };

    return (
        <Card
            className={classNames(cls.EntityFiltersRedesigned, {}, [className])}
            padding="24"
        >
            <VStack gap="32">
                <SearchBox
                    placeholder={t('Пошук')}
                    resetIconComponent={ResetIconComponent}
                    submitIconComponent={SubmitIconComponent}
                    classNames={searchBoxClasses}
                />

                {children}
            </VStack>
        </Card>
    );
};
