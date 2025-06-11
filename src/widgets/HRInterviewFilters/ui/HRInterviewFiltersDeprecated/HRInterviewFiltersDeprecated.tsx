import { useTranslation } from 'react-i18next';

import { SearchBox } from 'react-instantsearch';

import { memo } from 'react';

import { Icon } from '@/shared/ui/deprecated/Icon';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from '../HRInterviewFilters.module.scss';
import { Card, CardTheme } from '@/shared/ui/deprecated/Card';
import { VStack } from '@/shared/ui/common/Stack';
import SearchIcon from '@/shared/assets/icons/search.svg';
import CloseIcon from '@/shared/assets/icons/close.svg';
import { HRInterviewCategoryTabs } from '@/features/HRInterviewCategoryTabs';
import { HRInterviewFiltersProps } from '../HRInterviewFilters';

const ResetIconComponent = memo(() => (
    <Icon
        Svg={CloseIcon}
        className={cls.ResetIconDeprecated}
        width={32}
        height={32}
    />
));

const SubmitIconComponent = memo(() => <Icon Svg={SearchIcon} />);

export const HRInterviewFiltersDeprecated = (
    props: HRInterviewFiltersProps,
) => {
    const { className } = props;
    const { t } = useTranslation();

    const searchBoxClasses = {
        root: cls.rootSearch,
        submit: cls.SubmitSearchBtn,
        reset: cls.ResetSearchBtn,
        form: cls.SubmitInputWrapperDeprecated,
        input: cls.SearchInputDeprecated,
    };

    return (
        <Card
            theme={CardTheme.OUTLINED}
            className={classNames(cls.HRFiltersDeprecated, {}, [className])}
            padding="24"
        >
            <VStack gap="32">
                <SearchBox
                    placeholder={t('Пошук')}
                    resetIconComponent={ResetIconComponent}
                    submitIconComponent={SubmitIconComponent}
                    classNames={searchBoxClasses}
                />

                <HRInterviewCategoryTabs />
            </VStack>
        </Card>
    );
};
